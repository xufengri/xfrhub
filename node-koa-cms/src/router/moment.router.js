const Router = require('koa-router')

const momentRouter = new Router({prefix:'/moment'})


const {
    create,
    detail,
    list,
    update,
    remove
} = require("../controller/moment.controller")

const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth.middleware")

//发表动态
momentRouter.post('/', verifyAuth, create)
//获取单个动态
momentRouter.get('/:momentId', detail);
//获取所有动态
momentRouter.get('/', list);
//更新动态
momentRouter.patch('/:momentId', verifyAuth,  verifyPermission, update);
//删除内容
momentRouter.delete('/:momentId', verifyAuth,  verifyPermission, remove);


module.exports = momentRouter;
