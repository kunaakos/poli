import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { Expense, expenseSchema } from '@pol/types'
import { Store } from '../util/expenseStore'

import { respondWithClientError, respondWithData, respondWithServerError } from '../util/expressResponders'

type MakeAddExpenseMiddlewareParams = {
    expenseStore: Store<Expense>
}

export const makeAddExpenseMiddleware =
    ({ expenseStore }: MakeAddExpenseMiddlewareParams) =>
    (request: Request, response: Response) => {
        let validationResult = expenseSchema.safeParse({ ...request.body, id: uuid() })
        if (!validationResult.success) {
            respondWithClientError({ response, error: new Error('Invalid expense.') })
            return
        }
        const { data: newExpense } = validationResult
        try {
            expenseStore.addOne(newExpense)
        } catch (error) {
            respondWithServerError({ response, error: new Error('Could not save response.') })
            return
        }
        respondWithData({ response, data: null })
    }
