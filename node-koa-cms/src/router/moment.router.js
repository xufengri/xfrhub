const Router = require('koa-router')

const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo
} = require("../controller/moment.controller")

const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth.middleware")

const{
    verifyLabelExists
} = require("../middleware/label.middleware.js")

const momentRouter = new Router({prefix:'/moment'})

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

//添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);


//获取照片
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter;
