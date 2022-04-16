const errorType = require('../constants/error-types')

const errorHandle = (error, ctx) =>{
    let status, message;
    switch(error.message){
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400; //Bad Request
            message = "用户名或者密码不能为空~";
            break;
        case errorType.USER_ALREADY_EXIST:
            status = 409; //conflict
            message = "用户已存在";
            break;
        case errorType.USER_DOES_NOT_EXIST:
            status = 400; //Bad Request
            message = "用户不存在";
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status = 400; //Bad Request
            message = "密码不正确~";
            break;
        case errorType.UNAUTHORIZATION:
            status = 401; //参数错误
            message = "未授权token~";
            break;
        case errorType.UNPERMISSION:
            status = 401; //参数错误
            message = "您不具备操作的权限~";
            break;
        default:
            status = 404; //Not Fount
            message = "Not FOUND";
        
    }
    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandle