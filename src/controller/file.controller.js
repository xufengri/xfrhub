const fileService = require("../service/file.service");
const UserService = require("../service/user.service")
// const { AVATAR_PATH } = require("../constants/file-path")
const { APP_HOST,APP_PORT } = require("../app/config");

class FileController{
    //获取头像
    async saveAvatarInfo(ctx, next){
        //1.获取图片相关的信息
        const { filename, mimetype, size} = ctx.req.file;
        const { id } = ctx.user;
        //2.将图像数据保存到数据当中
        const result  = await fileService.createAvatar(filename, mimetype, size, id)

        //将图像信息保存到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        await UserService.updateAvatarUrlById(avatarUrl, id)

        //3.返回结果
        ctx.body = "上传成功"
    }

    //获取图片，最多九张
    async savePictureInfo(ctx, next){
        //1.获取图像信息
        const files = ctx.req.files;
        const { id } = ctx.user;
        const { momentId } = ctx.query;

        //2.将所有的文件信息保存到数据库中
        for(let file of files){
            const { filename, mimetype, size } = file;
            await fileService.createFile(filename, mimetype, size, id, momentId)
        }

        ctx.body = "上传成功"
    }
}

module.exports = new FileController();