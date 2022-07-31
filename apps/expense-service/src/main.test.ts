import supertest from 'supertest'
import { app } from './main'

import { expenseSchema } from '@pol/types'

describe('/api/expenses', () => {
    test('should respond to GET requests with a valid list of expenses', async () => {
        const getExpensesResponse = await supertest(app).get('/api/expenses')
        expect(getExpensesResponse.statusCode).toBe(200)
        expect(() => getExpensesResponse.body.map(expenseSchema.parse)).not.toThrow()
    })
})
