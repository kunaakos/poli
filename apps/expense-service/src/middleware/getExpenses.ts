import { Request, Response } from 'express'

import { Expense } from '@pol/types'
import { Store } from '../util/expenseStore'

import { respondWithData, respondWithServerError } from '../util/expressResponders'

type MakeGetExpensesMiddlewareParams = {
    expenseStore: Store<Expense>
}

export const makeGetExpensesMiddleware =
    ({ expenseStore }: MakeGetExpensesMiddlewareParams) =>
    (request: Request, response: Response) => {
        try {
            const expenses: Expense[] = expenseStore.getAll()
            respondWithData({ response, data: expenses })
        } catch {
            respondWithServerError({ response, error: new Error('Could not get expenses.') })
        }
    }
