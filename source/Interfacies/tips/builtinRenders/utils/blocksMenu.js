export let buildBlocksMenu=(block,getBlockHandler,editorContext)=>{
    return [
        {
            icon:"",
            label:`打开:${block.content.substring(0,16)}`,
            click:()=>{
                if(window.require){
                    window.open(`siyuan://blocks/${block.id}`)
                }
            }
        },
        {
            icon:"",
            label:`删除:${block.content.substring(0,16)}`,
            click:()=>{
                if(window.require){
                    window.open(`siyuan://blocks/${block.id}`)
                }
                getBlockHandler(block.id).remove()                
            }
        },
        {
            icon:"",
            label:`固定到边栏:${block.content.substring(0,16)}`,
            click:()=>{
                if(window.require){
                    window.open(`siyuan://blocks/${block.id}`)
                }
                           
            }
        },
        {
            icon:"#iconMove",
            label:`移动当前块到:${block.content.substring(0,16)}`,
            click:()=>{
                let blockHandler=getBlockHandler(editorContext.blockID)
                blockHandler.moveTo(block.root)
            }
        }
    ]
}