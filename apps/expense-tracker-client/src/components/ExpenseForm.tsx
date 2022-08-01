import { ChangeEventHandler, FormEventHandler } from 'react'

import { IncompleteExpense } from '../types'

import { Form, Input, Select } from '@pol/ui'

type ExpenseFormProps = {
    onExpenseUpdate: (expense: IncompleteExpense) => void
    expense: IncompleteExpense
    onSave: () => void
}

export const ExpenseForm = ({ onExpenseUpdate, expense, onSave }: ExpenseFormProps) => {
    const changeHandler =
        (key: string, type: 'number' | 'string'): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
        ({ currentTarget: { value } }) => {
            onExpenseUpdate({
                ...expense,
                [key]: type === 'number' ? parseFloat(value) : value,
            })
        }
    const submitHandler: FormEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        onSave()
    }

    return (
        <Form>
            <Input
                type="text"
                placeholder="description"
                name="description"
                value={expense.description}
                onChange={changeHandler('description', 'string')}
            />
            <Input
                type="number"
                placeholder="amount"
                name="amount"
                value={expense.amount}
                onChange={changeHandler('amount', 'number')}
            />
            <Select name="currency" value={expense.currency} onChange={changeHandler('currency', 'string')}>
                <option value="HUF">HUF</option>
                <option value="USD">USD</option>
            </Select>
            <Input type="submit" value="Save" onClick={submitHandler} />
        </Form>
    )
}
