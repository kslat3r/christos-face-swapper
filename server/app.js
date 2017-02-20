const Koa = require('koa');
const Router = require('koa-router');
const adapt = require('koa-adapter');
const handlebars = require('koa-handlebars');
const body = require('koa-body');
const error = require('./lib/error');

// lib

require('./lib/config');

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


// routes

const createController = require('./controllers/create');

router.get('/', createController.get);
router.post('/', createController.post);

app.use(router.routes());
app.use(error);

// let's go!

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started ${port}`));
