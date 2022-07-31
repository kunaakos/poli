import supertest from 'supertest'
import { omit } from 'lodash'

import { Expense, expenseSchema, OkApiResponse, ClientErrorApiResponse, ServerErrorApiResponse } from '@pol/types'

import { makeExpenseStore, Store } from './util/expenseStore'
import { makeExpenseServiceApp } from './expenseServiceApp'

/**
 * It would be a bit time consuming to write exhaustive tests.
 * I covered a variety of scenarios that should demonstrate how testable
 * the app is thanks to the style and patterns used.
 * Note that the store, responders and middleware implementations are
 * independently testable, and not much needs to be mocked.
 */

const MOCK_EXPENSE: Expense = {
    id: '542899cc-f3ac-49a2-aeef-a4f78b16b06d',
    description: 'Groceries',
    amount: 42,
    spent_at: '2021-01-01T12:00:00.000Z',
    currency: 'USD',
}

const CONTENT_TYPE_HEADER = 'content-type'
const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'

const OK_API_RESPONSE_TYPE: OkApiResponse<null>['type'] = 'OkApiResponse'
const CLIENT_ERROR_API_RESPONSE_TYPE: ClientErrorApiResponse['type'] = 'ClientErrorApiResponse'
const SERVER_ERROR_API_RESPONSE_TYPE: ServerErrorApiResponse['type'] = 'ServerErrorApiResponse'

const FUNCTION_THAT_THROWS = () => {
    throw new Error('I made ice cream 💩')
}
const EXPENSE_STORE_THAT_THROWS: Store<Expense> = {
    getAll: FUNCTION_THAT_THROWS,
    addOne: FUNCTION_THAT_THROWS,
}

describe('GET /api/expenses', () => {
    test('should return a valid list of expenses', async () => {
        const app = makeExpenseServiceApp({ expenseStore: makeExpenseStore([MOCK_EXPENSE]) })

        const getExpensesResponse = await supertest(app).get('/api/expenses')

        expect(getExpensesResponse.statusCode).toBe(200)
        expect(getExpensesResponse.headers[CONTENT_TYPE_HEADER]).toBe(JSON_CONTENT_TYPE)
        expect(() => getExpensesResponse.body.data.map(expenseSchema.parse)).not.toThrow()
    })
})

describe('POST /api/expenses', () => {
    test('should accept a valid new expense and reply with an `OkApiResponse<null>`', async () => {
        const expenseStore = makeExpenseStore([])
        const app = makeExpenseServiceApp({ expenseStore })

        const newExpense = omit(MOCK_EXPENSE, 'id') // NOTE: ids are created server-side
        const getExpensesResponse = await supertest(app).post('/api/expenses').send(newExpense)

        expect(getExpensesResponse.statusCode).toBe(200)
        expect(getExpensesResponse.headers[CONTENT_TYPE_HEADER]).toBe(JSON_CONTENT_TYPE)

        // NOTE: I didn't write schemas and validators for response types,
        // but wouldn't they be useful here!
        expect(getExpensesResponse.body.type).toBe(OK_API_RESPONSE_TYPE)
        expect(getExpensesResponse.body.data).toBe(null)
    })

    test('should reply with the correct `ClientErrorApiResponse` and a 400 status code when the submitted expense is invalid', async () => {
        const expenseStore = makeExpenseStore([])
        const app = makeExpenseServiceApp({ expenseStore })

        const newExpense = omit(MOCK_EXPENSE, 'id', 'description')
        const getExpensesResponse = await supertest(app).post('/api/expenses').send(newExpense)

        expect(getExpensesResponse.statusCode).toBe(400)
        expect(getExpensesResponse.headers[CONTENT_TYPE_HEADER]).toBe(JSON_CONTENT_TYPE)
        expect(getExpensesResponse.body.type).toBe(CLIENT_ERROR_API_RESPONSE_TYPE)
        expect(getExpensesResponse.body.message).toBe('Invalid expense.')
    })

    test('should reply with the correct `ServerErrorApiResponse` and a 500 status code when the store poops itself', async () => {
        const app = makeExpenseServiceApp({ expenseStore: EXPENSE_STORE_THAT_THROWS })

        const newExpense = omit(MOCK_EXPENSE, 'id')
        const getExpensesResponse = await supertest(app).post('/api/expenses').send(newExpense)

        expect(getExpensesResponse.statusCode).toBe(500)
        expect(getExpensesResponse.headers[CONTENT_TYPE_HEADER]).toBe(JSON_CONTENT_TYPE)
        expect(getExpensesResponse.body.type).toBe(SERVER_ERROR_API_RESPONSE_TYPE)
        expect(getExpensesResponse.body.message).toBe('Could not save response.')
    })
})
