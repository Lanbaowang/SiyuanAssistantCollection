import { 下载基础模型 } from "./models.js";
import { 解压依赖 } from './dependencies.js'
import { fs, kernelApi, path } from "./runtime.js";
import { sac } from "./runtime.js";
export { 下载基础模型 as 下载基础模型 }
export { 解压依赖 as 解压依赖 }
import { getReposInfoByTopic, installPackageZip } from "./adapters/GitHub.js";
import { installPackageZip as installPackageZipNpm } from "./adapters/NPM.js";
import { getPackageInfoByKeyword } from "./adapters/NPM.js";
import { getReposFromURL } from "./adapters/fileList.js";
import { siyuanPackageDefines } from './packageType/siyuanPackageTypes/index.js'
import { thirdPartyPackageDefines } from "./packageType/thirdPartyPackages/index.js";
// 将路径替换操作抽取为单独的函数
function replacePath(path, packageName) {
    let _path = path.replace('@sac', sac.selfPath)
    return packageName ? _path + `/${packageName}/` : _path
}
// 将读取 JSON 文件的操作抽取为单独的函数
async function readJsonFile(path) {
    if (await fs.exists(path)) {
        const data = await fs.readFile(path);
        if (data) {
            return JSON.parse(data);
        } else {
            return {}
        }
    } else return {}
}
export const type = (packageDefine = {}) => {
    return {
        packageDefine,
        async list() {
            const dir = replacePath(packageDefine.location);
            const items = await fs.readDir(dir);
            if (items && items[0]) {
                return items.filter(item => packageDefine.allowSingle || item.isDir).map(_package => _package.name);
            } else {
                return []
            }
        },
        async getStatus() {
            // Implement getStatus method
        },
        async writeStatus(packageName, status) {
            // Implement writeStatus method
            //首先读取包类型安装目录下的json文件,这个json文件与包类型同名,例如包类型如果是plugin.那么配置文件就是plugins.json
            //然后找到包名对应的项目,将status写入,并写回文件
        },
        async file(packageName) {
            const dir = replacePath(packageDefine.location, packageName);
            return await fs.readDir(dir);
        },
        async getConfig(packageName) {
            const path = replacePath(packageDefine.location, packageName) + packageDefine.config;
            return readJsonFile(path);
        },
        async getMeta(packageName) {
            const path = replacePath(packageDefine.location, packageName) + packageDefine.meta;
            return readJsonFile(path);
        },
        resolve(packageName, _path) {
            const dir = replacePath(packageDefine.location, packageName);
            return path.resolve(dir, _path);
        },
        async load(packageName, fileName) {
            return await packageDefine.load(packageName, fileName);
        },
        async listFromGithub() {
            return await getReposInfoByTopic(packageDefine.topic, packageDefine.meta)

        },
        async listFromNpm() {
            return await getPackageInfoByKeyword(packageDefine.topic)
        },
        async addPackageSourceFromUrl(url, type) {
            return await getReposFromURL(url, packageDefine.topic, type)
        },
        async listFromAllRemoteSource() {
            const cacheFilePath = `/temp/noobCache/bazzar/${packageDefine.topic}/cache.json`;
            try {
                // 尝试从缓存文件中读取数据
                const cacheData = await fs.readFile(cacheFilePath);

                return JSON.parse(cacheData).repos.filter(item => {
                    return item
                });
            } catch (error) {
                // 如果读取缓存文件失败，那么获取远程数据
                const githubPackages = await this.listFromGithub();
                const npmPackages = await this.listFromNpm();
                let repos;

                if (!packageDefine.listRemote) {
                    repos = [...githubPackages, ...npmPackages];
                } else {
                    let data = { repos: [...githubPackages, ...npmPackages] }
                    console.log(data)
                    let result = await packageDefine.listRemote(data)
                    console.log(result)
                    repos = result.repos;
                }
                // 将获取到的数据写入缓存文件
                await fs.writeFile(cacheFilePath, JSON.stringify({ repos }));
                return repos;
            }
        },
        async packageZip(packageName) {
            const dataPath = replacePath(packageDefine.location, packageName);
            await fs.mkdir(`/temp/noobTemp/bazzarPackage/`);
            await kernelApi.zip({
                path: dataPath,
                zipPath: `/temp/noobTemp/bazzarPackage/${packageName}.zip`
            });
            const data = await fs.readFile(`/temp/noobTemp/bazzarPackage/${packageName}.zip`);
            return Buffer.from(data);
        },
        async checkInstall(packageInfo) {
            const { packageSource, packageRepo, packageName } = packageInfo;
            const dataPath = replacePath(packageDefine.location, packageName);
            let exists = await fs.exists(dataPath)
            return exists ? true : false
        },
        async install(packageInfo) {
            const { name, url,source } = packageInfo;
            let installPath = replacePath(packageDefine.location, name)
            if(packageDefine.installer){
                await packageDefine.installer.install(packageInfo)
            }
            if (source === 'github') {
                await installPackageZip(installPath, name, url, packageInfo)
            }
            if (source === 'npm') {
                await installPackageZipNpm(installPath, name, url, packageInfo)
            }
        },
        async uninstall(packageInfo) {
            const { packageSource, packageRepo, packageName } = packageInfo;

            const installPath = replacePath(packageDefine.location, packageName);
            await fs.removeFile(installPath);
        }
    };
};

export const usePackage = async (packageDefines) => {
    for (const packageDefine of packageDefines) {
        let packageHandler = type(packageDefine);
        await sac.statusMonitor.set('packages', packageDefine.topic, packageHandler);
    }
};
await usePackage(siyuanPackageDefines)
await usePackage(thirdPartyPackageDefines)
export const listPackageDefines =  () => {
    let handlers=  sac.statusMonitor.get('packages').$raw
    let data={}
     Object.keys(handlers).forEach(
        topic=>{
             data[topic]= handlers[topic].packageDefine
        }
    )
    return data
}

sac.eventBus.on(
    'registPackageType', (e) => {
        const { packageDefines, provider } = e.detail
        if (packageDefines && provider) {
            usePackage(packageDefines)
        }
    }
)