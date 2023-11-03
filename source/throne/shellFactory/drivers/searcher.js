import { embeddingText } from "../../../utils/textProcessor.js"
import { plugin } from "../../index.js"
import { searchBlock } from "./blockSearcher.js"
import { logger } from "../../../logger/index.js"
import { searchBaidu } from "./webSearcher.js"
import { jieba } from '../../../utils/tokenizer.js'
import { 组合函数 } from "../../../baseStructors/functionTools.js"
export async function searchRef(message) {
    try {
        let refs = ""
        try {
            if (plugin.configurer.get('自动搜索设置', '搜索结果中包含块搜索结果').$value) {
                let { vectors } = message
                let model = plugin.configurer.get('向量工具设置', '默认文本向量化模型').$value
                let vector = vectors[model]
                if (!vector) {
                    vector = await embeddingText(message.content || (message.meta && message.meta.content))
                    vectors[model] = vector
                }
                refs += await searchBlock(message, vector)
            }
        } catch (e) {
            logger.aishellerror(refs)

        }
        logger.aishelllog(refs)
        try {

            if (plugin.configurer.get('自动搜索设置', '搜索结果中包含网络搜索结果').$value) {
                let text = message.content || (message.meta && message.meta.content)
                let search = plugin.搜索管理器.get('webseacher', 'baidu')
                let fArray = []
                fArray.push(async () => { return await search(text) })
                //            let result1 = await searchBaidu(text);
                //            webSearcherResults.push(result1);
                let tokens = jieba.tokenize(text, "search")
                for (let token of tokens) {
                    if (token.word.length > 2) {
                        //  let result = await searchBaidu(token.word);
                        fArray.push(async () => { return await search(token.word) })
                        // webSearcherResults.push(result);
                    }
                }
                refs += ('\n' + (await 组合函数(fArray)()).join('\n'))
                //refs += '\n' + webSearcherResults.join('\n')
            }
        } catch (e) {
            logger.aishellerror(refs)

        }
        logger.aishelllog(refs)
        return refs
    } catch (error) {
        console.error(`searchRef失败:`, error);
        return ''
    }
}
