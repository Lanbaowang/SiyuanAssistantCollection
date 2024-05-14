import OpenAichatApi from './LLMAPIS/openAIChat.js'
import { MAGI } from './MAGI.js'
import { plugin } from '../../../asyncModules.js'
let options =JSON.parse(JSON.stringify(plugin.configurer.get('模型设置','OPENAI').$value))
options.apiModel = options.apiModel ? options.apiModel.$value : "gpt-3.5-turbo";
options.temperature = options.temperature ? options.temperature.$value : "0.7";

export class LanguageProcessor {
    constructor(persona) {
        let merged = { ...globalThis.siyuan.config.ai.openAI };
        for (let key in options) {
          if (options[key]) {
            merged[key] = options[key];
          }
        }
        this.merged=merged
        this.magi = new MAGI(OpenAichatApi, 
            merged
        , persona)
    }
    async completeChat(chat) {
        try {
            let reply = await this.magi.echo.reply(chat)
            return reply[0].action
        } catch (error) {
            console.error(`Error in completeChat: ${error}`);
            return undefined;
        }
    }
    async voteFor(functions, descriptions, inputs, goal, multi){
        return await this.magi.echo.voteFor(functions, descriptions, inputs, goal, multi)
    }
    async summarizeChat(chat) {
        try {
            return await this.magi.echo.summarize(chat)
        } catch (error) {
            console.error(`Error in summryChat: ${error}`);
            return undefined;
        }
    }
    async summarizeText(content){
       try{ 
       let prompt =`summarize this content,within 100 token,in same language as it:${content}`
        return (await (new OpenAichatApi(this.merged)).postAsUser(prompt)).choices[0].message.content
       }catch(e){
        return ""
       }
    }
}
