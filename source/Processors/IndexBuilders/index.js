import { sac } from "../../asyncModules.js";
import { 清理块索引 } from "./utils/cleaner.js";
let { internalFetch, Router } = sac.路由管理器
let 获取块数据集名称 = async () => {
    let 旧块数据集名 = 'blockVectors' + '/' + (await internalFetch('/config/query', {
        method: 'POST',
        body: { query: ['向量工具设置', '默认文本向量化模型'] }
    })).body.data
    return 旧块数据集名
}
let 初始化块数据集 = async () => {
    let collectionsRes = await internalFetch('/database/collections/build', {
        method: 'POST',
        body: {
            collection_name: await 获取块数据集名称(),
            main_key: 'id',
            file_path_key: 'box',
        }
    })
    console.log(collectionsRes)
}

let 索引器路由 = new Router()
索引器路由.post('/index/blocks', async (ctx, next) => {
    await 初始化块数据集()
    await 清理块索引(await 获取块数据集名称())
})

export { 索引器路由 as router }