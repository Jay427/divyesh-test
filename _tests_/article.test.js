const knex = require('../src/include/sqlConnection');
const app = require('../src/index');
const supertest = require('supertest');
const request = supertest(app);

describe('article api', () => {

    beforeAll(async () => {

        await knex.migrate.latest();

    });

    beforeEach(async () => {

        await knex.raw('TRUNCATE TABLE article');
        await knex.raw('TRUNCATE TABLE article_comment_details');
        await knex.raw('TRUNCATE TABLE comment');

    });

    afterAll(async () => {

        await knex.migrate.rollback().then(() => knex.destroy());

    });

    test('article create api', async () => {

        const res = await request.post('/api/v1/article/create').send({
            "nickname": "Jay test",
            "title": "Github Article test",
            "content": "Work in progress test"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

    });

    test('article content api', async () => {

        const articleCreateRes = await request.post('/api/v1/article/create').send({
            "nickname": "Jay test",
            "title": "Github Article test",
            "content": "Work in progress test"
        });

        expect(articleCreateRes.statusCode).toBe(200);
        expect(articleCreateRes.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

        const article = await knex.raw('SELECT * FROM `article`');

        const res = await request.get(`/api/v1/article/${article[0][0]['id']}/content`).send({});

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {
                article: expect.any(Object),
            }
        });

    });

    test('article list api', async () => {

        const articleCreateRes = await request.post('/api/v1/article/create').send({
            "nickname": "Jay test",
            "title": "Github Article test",
            "content": "Work in progress test"
        });

        expect(articleCreateRes.statusCode).toBe(200);
        expect(articleCreateRes.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

        const res = await request.get('/api/v1/article/list').send({});

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual(expect.objectContaining({
            error: false,
            message: 'API Success.',
            data: {
                articles: expect.any(Array),
            }
        }));

    });

    test('article comment api', async () => {

        const articleCreateRes = await request.post('/api/v1/article/create').send({
            "nickname": "Jay test",
            "title": "Github Article test",
            "content": "Work in progress test"
        });

        expect(articleCreateRes.statusCode).toBe(200);
        expect(articleCreateRes.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

        const article = await knex.raw('SELECT * FROM `article`');

        const res = await request.post(`/api/v1/article/${article[0][0]['id']}/comment`).send({
            "nickname": "Jack test",
            "content": "Let do this test"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

    });

    test('article comment list api', async () => {

        const articleCreateRes = await request.post('/api/v1/article/create').send({
            "nickname": "Jay test",
            "title": "Github Article test",
            "content": "Work in progress test"
        });

        expect(articleCreateRes.statusCode).toBe(200);
        expect(articleCreateRes.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

        const article = await knex.raw('SELECT * FROM `article`');

        const articleCommentRes = await request.post(`/api/v1/article/${article[0][0]['id']}/comment`).send({
            "nickname": "Jack test",
            "content": "Let do this test"
        });

        expect(articleCommentRes.statusCode).toBe(200);
        expect(articleCommentRes.body).toStrictEqual({
            error: false,
            message: 'API Success.',
            data: {}
        });

        const res = await request.get(`/api/v1/article/${article[0][0]['id']}/comment/list`).send({});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
            error: false,
            message: 'API Success.',
            data: {
                articleComments: expect.any(Array),
            }
        }));

    });

});