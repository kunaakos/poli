import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { DefaultLayout, Loader } from '@pol/ui'
import { ApiResponse, Expense } from '@pol/types'
import { IncompleteExpense } from './types'

import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { getExpenses, postExpense } from './services/expense'

const ErrorMessage = styled.h1`
    text-align: center;
    margin: 4rem auto;
    font-size: 20px;
    background-color: #fb7c7d;
    color: var(--color-white);
    padding: 10px 15px;
    border-radius: 8px;
    max-width: 80%;
`

const DEFAULT_EXPENSE: IncompleteExpense = {
    description: '',
    amount: 0,
    currency: 'USD',
}

/**
 * Close your eyes and imagine we're using https://resthooks.io/
 * Or even better, some proper state management solution ranging
 * from a hook implemented using `useReducer` and `use-reducer-async`
 * to `redux`.
 */

export const App = () => {
    const [state, setState] = useState<'loading' | 'ok' | 'errored'>('loading')
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [nextExpense, setNextExpense] = useState<IncompleteExpense>(DEFAULT_EXPENSE)

    const showErrorMessage: boolean = state === 'errored'
    const showEmptyListPlaceholder: boolean = state === 'ok' && !expenses.length
    const showExpenseList: boolean = state === 'ok' && !!expenses.length
    const showLoader: boolean = state === 'loading'

    const refetchExpenses = useCallback(() => {
        ;(async () => {
            try {
                const { responseValue, statusCode } = await getExpenses()
                if (statusCode === 200 && responseValue.type === 'OkApiResponse') {
                    setExpenses(responseValue.data)
                    setState('ok')
                } else {
                    setState('errored')
                }
            } catch (error) {
                setState('errored')
            }
        })()
    }, [setExpenses, setState])

    useEffect(() => {
        refetchExpenses()
    }, [])

    const saveHandler = () => {
        ;(async () => {
            setState('loading')
            try {
                const { responseValue, statusCode } = await postExpense({
                    ...nextExpense,
                    spent_at: new Date().toISOString(),
                })
                if (statusCode === 200 && responseValue.type === 'OkApiResponse') {
                    refetchExpenses()
                    setNextExpense(DEFAULT_EXPENSE)
                } else {
                    setState('errored')
                }
            } catch (error) {
                setState('errored')
            }
        })()
    }

    return (
        <DefaultLayout>
            <ExpenseForm expense={nextExpense} onExpenseUpdate={setNextExpense} onSave={saveHandler} />
            {showLoader && <Loader />}
            {showErrorMessage && <ErrorMessage>The server is probably down. Please try again later.</ErrorMessage>}
            {showEmptyListPlaceholder && (
                <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
                    Yay!{' '}
                    <span role="img" aria-label="jsx-a11y/accessible-emoji">
                        🎉
                    </span>{' '}
                    No expenses!
                </h1>
            )}
            {showExpenseList && <ExpenseList expenses={expenses} />}
        </DefaultLayout>
    )
}
