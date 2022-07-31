import express, { Express } from 'express'
import cors from 'cors'

import { Expense } from '@pol/types'

import { Store } from './util/expenseStore'
import { makeAddExpenseMiddleware } from './middleware/addExpense'
import { makeGetExpensesMiddleware } from './middleware/getExpenses'
import { fourOhFourMiddleware } from './middleware/fourOhFour'
import { unexpectedErrorHandlerMiddleware } from './middleware/unexpectedErrorHandler'

type MakeExpenseServiceAppParams = {
    expenseStore: Store<Expense>
}

export const makeExpenseServiceApp = ({ expenseStore }: MakeExpenseServiceAppParams): Express => {
    const app = express()

    app.use(cors()) // NOTE: more granular setup is needed for prod!
    app.use(express.json())

    app.get('/api/expenses', makeGetExpensesMiddleware({ expenseStore }))
    app.post('/api/expenses', makeAddExpenseMiddleware({ expenseStore }))

    app.use(fourOhFourMiddleware)
    app.use(unexpectedErrorHandlerMiddleware)

    return app
}
