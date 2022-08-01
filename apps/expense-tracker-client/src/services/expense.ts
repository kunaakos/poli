import { ApiResponse, Expense } from '@pol/types'
import { IncompleteExpense } from '../types'

export const getExpenses = async (): Promise<{ responseValue: ApiResponse<Expense[]>; statusCode: number }> => {
    const response = await fetch(`http://localhost:3333/api/expenses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return {
        responseValue: await response.json(), // NOTE: should validate!
        statusCode: response.status,
    }
}

export const postExpense = async (
    expense: Omit<Expense, 'id'>,
): Promise<{ responseValue: ApiResponse<null>; statusCode: number }> => {
    const response = await fetch(`http://localhost:3333/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
    })
    return {
        responseValue: await response.json(), // NOTE: should validate!
        statusCode: response.status,
    }
}
