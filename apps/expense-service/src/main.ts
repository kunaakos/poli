import { makeExpenseStore } from './util/expenseStore'
import { makeExpenseServiceApp } from './expenseServiceApp'

const EXPENSE_SERVICE_PORT = process.env.EXPENSE_SERVICE_PORT || 3333

export const app = makeExpenseServiceApp({ expenseStore: makeExpenseStore([]) })

const server = app.listen(EXPENSE_SERVICE_PORT, () => {
    console.log(`Listening on ${EXPENSE_SERVICE_PORT}`)
})

server.on('error', console.error)
