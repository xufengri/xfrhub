const fs = require('fs')
const UserService = require("../service/user.service")
const { AVATAR_PATH } = require("../constants/file-path.js")

class UserController{
    async create(ctx, next) {
        //获取用户传递的参数
        const user = ctx.request.body;

        //查询数据
        const result = await UserService.create(user);

        //返回数据
        ctx.body = result;

    }
    async avatarInfo(ctx, body){
        //提供用户id
        const { userId } = ctx.params;
        const avatarInfo = await FileService.getAvatarByUserId(userId)

        //提供图像信息(ctx.response 不加就是默认下载)
        ctx.response.set('content-type', avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    }

}


module.exports = new UserController();