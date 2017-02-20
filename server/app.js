const Koa = require('koa');
const Router = require('koa-router');
const adapt = require('koa-adapter');
const handlebars = require('koa-handlebars');
const body = require('koa-body');
const error = require('./lib/error');

// lib

require('./lib/config');
require('./lib/mongoose');

// server

const app = new Koa();
const router = new Router();

// middleware

app.use(body({
  multipart: true,
}));

app.use(handlebars({
  cache: process.env.NODE_ENV !== "development",
  root: `${__dirname}`,
  layoutsDir: '/views/layouts',
  defaultLayout: 'default',
  viewsDir: '/views',
  partialsDir: `${__dirname}/views/partials`,
}));

// models

require('./models/faceSwap');

// routes

const createController = require('./controllers/create');
const viewController = require('./controllers/view');

router.get('/', createController.get);
router.post('/', createController.post);
router.get('/faceswap/:id', viewController.get);

app.use(router.routes());
app.use(error);

// let's go!

app.listen(3000, () => console.log('server started 3000'));
