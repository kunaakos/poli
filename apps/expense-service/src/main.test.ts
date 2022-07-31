import supertest from 'supertest'
import { app } from './main'

describe('/spendings', () => {
    test('It should response the GET method', (done) => {
        supertest(app)
            .get('/spendings')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })
})
