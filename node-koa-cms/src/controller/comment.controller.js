const commentSerivce = require('../service/comment.service.js')

class commentController {
    //发表评论
    async create(ctx, next){
        const {momentId, content} = ctx.request.body;
        const { id } = ctx.user;

        const result = await commentSerivce.create(momentId, content, id);
        ctx.body = result;
    }

    //回复评论
    async reply(ctx, next){
        const { momentId, content} = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } = ctx.user;
        const result = await commentSerivce.reply(momentId, content, id, commentId);
        ctx.body = result;
    }

    //修改评论
    async update(ctx, next){
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await commentSerivce.update(commentId, content);
        ctx.body = result
    }

    //删除评论
    async remove(ctx, next){
        const { commentId } = ctx.params;
        const result = await commentSerivce.remove(commentId);
        ctx.body = result
    }

}

module.exports = new commentController();

