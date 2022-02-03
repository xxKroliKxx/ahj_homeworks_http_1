const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const Mount = require('koa-mount');
const BodyParser = require('koa-bodyparser');

const appV1 = new Koa();
const v1Router = new Router();

const tickets = ticketList()

appV1.use(BodyParser());

v1Router.get('/tickets', (ctx, next) => {
    ctx.body = tickets;
});

v1Router.get('/tickets/:id', (ctx, next) => {
    const id = Number(ctx.params.id)
    const e = tickets.find(e => e.id === id)
    if (e === undefined) {
        ctx.status = 404;
        return
    }
    ctx.body = e;
});

v1Router.post('/tickets', (ctx, next) => {
    tickets.push(ctx.request.body)
    ctx.status = 200;
});

appV1.use(v1Router.routes())

const app = new Koa();

app.use(async function (ctx, next) {
    await next();
    ctx.set('Access-Allow-Control', `*`);
    ctx.set('Access-Control-Allow-Methods', `POST, GET, OPTIONS`);
});

app.use(Mount('/v1', appV1));


const server = http.createServer(app.callback()).listen(8000);

function ticketList() {
    return [
        {
            id: 1,
            name: "Задание 1",
            description: "Большое и очень важное описание первого задания",
            status: 0,
            created: "2021-01-01"
        },
        {
            id: 2,
            name: "Задание 2",
            description: "Большое и очень важное описание второго задания",
            status: 0,
            created: "2021-01-02"
        },
        {
            id: 3,
            name: "Задание 3",
            description: "Большое и очень важное описание третьего задания",
            status: 1,
            created: "2021-01-03"
        },
        {
            id: 4,
            name: "Задание 4",
            description: "Большое и очень важное описание четвертого задания",
            status: 0,
            created: "2021-01-03"
        },
    ]

}