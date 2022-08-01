import { useState } from 'react'

import { DefaultLayout } from '@pol/ui'
import { Expense } from '@pol/types'

import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'

export const App = () => {
    const [expenses, setExpenses] = useState<Expense[]>([])

    return (
        <DefaultLayout>
            <ExpenseForm />
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </DefaultLayout>
    )
}
