const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const ejs = require('ejs');
const business = require('./business');
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

// create
router.post('/question', async (ctx, next) => {
    const reqBody = ctx.request.body;
    const name = reqBody.name;
    const length = reqBody.length;          // 名字和角色
    const A = reqBody.A || '';
    const B = reqBody.B || '';
    const C = reqBody.C || '';
    const D = reqBody.D || '';
    const E = reqBody.E || '';
    const F = reqBody.F || '';
    const answer = reqBody.answer || '';
    const result = await business.createQuestion({name, length, A, B, C, D, E, F, answer});
    ctx.response.body = result;
});

// delete
router.delete('/question', async (ctx, next) => {
    const id = ctx.request.body.id;
    const result = await business.deleteQuestion({ id });
    ctx.response.body = result;
});

// query
router.get('/question/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    console.log(id)
    const result = await business.queryQuestion({ id: id });
    console.log(JSON.stringify(result))
    let html = '';
    if(result.ret === 0) {
	html = `
	<div style="width: 100vw; height: 100vh; text-align: center;">
	<h2>
		${result.item[0].name}
	<h2>	
 	</div>
        `;
    } else {

    }
    ctx.response.body = ejs.render(html, {});
});

router.get('/question', async (ctx, next) => {
    const result = await business.queryQuestion({ id: '' });
    ctx.response.body = result;
});

// update
router.put('/question', async (ctx, next) => {
    const reqBody = ctx.request.body;
    const id = reqBody.id;
    const name = reqBody.name;
    const length = reqBody.length;          // 名字和角色
    const A = reqBody.A || '';
    const B = reqBody.B || '';
    const C = reqBody.C || '';
    const D = reqBody.D || '';
    const E = reqBody.E || '';
    const F = reqBody.F || '';
    const answer = reqBody.answer || '';
    const result = await business.updateQuestion({ id, name, length, A, B, C, D, E, F, answer });
    ctx.response.body = result;
});

// add router middleware:
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');

