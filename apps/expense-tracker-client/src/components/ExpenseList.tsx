import React, { useState, useEffect } from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { DateTime } from 'luxon'

import { Expense } from '@pol/types'

import Loader from './Loader'
import { ErrorMessage, Spending, IconWrapper, TextWrapper, Amount, AmountWrapper } from '../styles/ComponentStyles'

type ExpenseListProps = {
    expenses: Expense[]
    setExpenses: (expenses: Expense[]) => void
}

export const ExpenseList = ({ expenses, setExpenses }: ExpenseListProps) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3333/api/expenses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(async (res) => {
                const body = await res.json()
                return {
                    status: res.status,
                    body,
                }
            })
            .then((response) => {
                if (response.status === 200 && response.body.type === 'OkApiResponse') {
                    setExpenses(response.body.data)
                }
            })
            .catch((err) => {
                console.error(err)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <Loader />

    return (
        <>
            {error && <ErrorMessage>The server is probably down. Please try again later.</ErrorMessage>}
            {!expenses.length && !error && (
                <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
                    Yay!{' '}
                    <span role="img" aria-label="jsx-a11y/accessible-emoji">
                        🎉
                    </span>{' '}
                    No spendings!
                </h1>
            )}
            {expenses.length > 0 &&
                expenses.map((expense) => (
                    <Spending key={expense.id}>
                        <IconWrapper>
                            <FiDollarSign color="var(--color-blue)" />
                        </IconWrapper>
                        <TextWrapper>
                            <h3>{expense.description}</h3>
                            <p>{DateTime.fromISO(expense.spent_at).toFormat('t - MMMM dd, yyyy')}</p>
                        </TextWrapper>
                        <AmountWrapper>
                            <Amount>
                                {expense.amount} {expense.currency}
                            </Amount>
                        </AmountWrapper>
                    </Spending>
                ))}
        </>
    )
}
