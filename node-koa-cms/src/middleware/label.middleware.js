const labelService = require("../service/label.service")
const verifyLabelExists = async(ctx, next) =>{
    //1.取出要添加的标签
    const { labels } = ctx.request.body;
    
    //2.判断每个标签在label表中是否存在
    const newLabels = [];
    for(let name of labels){
        const labelResult = await labelService.isExistLabel(name);
        const label ={ name };
        if(!labelResult){
            //创建标签
            const result = await labelService.create(name);
            label.id = result.insertId;
        }else{
            label.id = labelResult.id;
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    await next()
}

module.exports = {
    verifyLabelExists
}