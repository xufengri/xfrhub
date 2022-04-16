const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
const useRoutes = require('../router/index')

const errorHandle = require('./error-handle')

const app = new Koa();

app.use(bodyParser());
useRoutes(app);


app.on('error', errorHandle)

module.exports = app