const momentService = require("../service/moment.service")

class MomentController{
    //发布评论
    async create(ctx, next){
        //1.获取数据(user_id, content)
        const userId = ctx.user.id
        const content = ctx.request.body.content
        console.log(userId, content);

        //2.将数据存到数据库
        const result = await momentService.create(userId, content);

        ctx.body = result

    }

    //获取一条评论(数据库中id查到的第一条数据)
    async detail(ctx, next){
        //1.获取数据(commentId)
        const momentId = ctx.params.momentId;

        //2.根据id去查询这条数据
        const result = await momentService.getMomentById(momentId)
        ctx.body = result

    }

    //获取数据库中id相同的所有数据
    async list(ctx, next){
        //1.获取数据(offset, size)
        const {offset, size} = ctx.query;

        //2.查询列表
        const result = await momentService.getMomentByList(offset, size);
        ctx.body = result;
    }

    //修改动态
    async update(ctx, next){
        //1.获取参数
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;

        //2.修改内容
        const result = await momentService.update(content, momentId);
        ctx.body = result;

    }

    //删除内容
    async remove(ctx, next){
        const { momentId } = ctx.params;

        //2.修改内容
        const result = await momentService.remove(momentId);
        ctx.body = result;
    }

}


module.exports = new MomentController()