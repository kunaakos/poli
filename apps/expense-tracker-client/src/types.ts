import { Expense } from '@pol/types'

/**
 * Types used app-wide but not company-wide.
 */

export type IncompleteExpense = Pick<Expense, 'description' | 'amount' | 'currency'>
