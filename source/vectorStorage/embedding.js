import {
    将文本拆分为句子
} from '../utils/sentence.js';
import { 将向量单位化, 计算加权平均向量 } from './vector.js';
import * as transformers from '../../static/transformers@2.5.3.js';
import './utils/initConfig.js'
import { 使用openAI生成嵌入 } from '../throne/processors/language_processors/LLMAPIS/openAIembedding.js';
transformers.env.backends.onnx.wasm.wasmPaths = '/plugins/SiyuanAssistantCollection/static/';
transformers.env.allowRemoteModels = true;
transformers.env.localModelPath = '/public/onnxModels/';
let extractor
let 工具配置 = {
}

async function 配置处理器(配置) {
    工具配置 = 配置;
    if (配置.siyuan&&配置.siyuan.config) {
        globalThis.siyuan.config = 配置.siyuan.config
    }
    if (extractor) {
        extractor.dispose? extractor.dispose():null;
    }
    let 默认文本向量化模型 = 工具配置.默认文本向量化模型.$value || 工具配置.默认文本向量化模型;
    try {
        if(默认文本向量化模型 !=="openAI"){
            extractor = await transformers.pipeline('feature-extraction', 默认文本向量化模型, 工具配置.默认文本向量化配置);
        }else{
            extractor = 使用openAI生成嵌入
        }
        return { msg: 'success' };
    } catch (error) {
        console.error(`配置处理失败:`, error);
        return { msg: '错误', detail: error.message };
    }
}

export async function 修改配置(配置) {
    
    return await 配置处理器(配置);
}

export async function 初始化配置(配置) {
    if (extractor) {
        return { msg: 'success' };
    }
    return await 配置处理器(配置);
}
export async function 销毁管线() {
    if (extractor) {
        extractor.dispose()
    }
    return { msg: 'sucess' }
}
export async function 提取向量(text, 最大句子长度) {
    if (!extractor) {
        return { msg: '错误', detail: 'extractor没有初始化' };
    }
    let 句子组 = 将文本拆分为句子(text, 最大句子长度);
    let 句子长度比例组 = 句子组.map(句子 => 句子.length / text.length);
    try {
        let 句子向量组 = [];
        for (let 句子 of 句子组) {
            if (句子) {
                let output = await extractor(句子, { pooling: 'mean', normalize: true });
                句子向量组.push(Array.from(output.data));
            }
        }

        if (句子向量组.length > 0) {
            return 计算加权平均向量(句子向量组, 句子长度比例组);
        } else {
            return [];
        }
    } catch (e) {
        console.error(e);
        return { msg: '错误', detail: e.message };
    }
}
export async function 矢量化块(block, 最大句子长度) {
    let { id, content } = block;
    let vector;

    try {
        vector = await 提取向量(content, 最大句子长度);
        let 矢量属性对象 = { id, vector, meta: block, box: block.box };
        return 矢量属性对象;
    } catch (e) {
        console.warn('嵌入出错,自动尝试更小长度', id, content, content.length, e);
        if (最大句子长度 > 129) {
            return await 矢量化块(block, 最大句子长度 / 2);
        }
    }
}
export async function 重建全部索引(数据输入) {
    let { 块数据数组, 配置 } = 数据输入
    const data = []
    for await (let block of 块数据数组) {
		console.warn('重建全部索引: block: ', block, '配置: ', 配置)
        data.push(await 矢量化块(block, 配置.最大句子长度 || 496))
    }
    return data
}

