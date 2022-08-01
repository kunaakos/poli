import React, { ChangeEventHandler, FormEvent, HTMLInputTypeAttribute, SyntheticEvent, useState } from 'react'

import { Form, Input, Select } from '@pol/ui'
import { Expense } from '@pol/types'

export const ExpenseForm = () => {
    const [state, setState] = useState<Pick<Expense, 'description' | 'amount' | 'currency'>>({
        description: '',
        amount: 0,
        currency: 'USD',
    })

    const handleChange =
        (key: string): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
        ({ currentTarget: { value } }) => {
            setState({
                ...state,
                [key]: value,
            })
        }

    return (
        <Form>
            <Input
                type="text"
                placeholder="description"
                name="description"
                value={state.description}
                onChange={handleChange('description')}
            />
            <Input
                type="number"
                placeholder="amount"
                name="amount"
                value={state.amount}
                onChange={handleChange('amount')}
            />
            <Select name="currency" value={state.currency} onChange={handleChange('currency')}>
                <option value="HUF">HUF</option>
                <option value="USD">USD</option>
            </Select>
            <Input type="submit" value="Save" />
        </Form>
    )
}
