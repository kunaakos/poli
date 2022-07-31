import { z } from 'zod'
import { CurrencyAcronym, currencyAcronymSchema, Iso8601DateString, iso8601DateStringSchema } from './misc'

export type Expense = {
    description: string
    amount: number
    spent_at: Iso8601DateString
    currency: CurrencyAcronym
}

export const expenseSchema = z.object({
    description: z.string(),
    amount: z.number(),
    spent_at: iso8601DateStringSchema,
    currency: currencyAcronymSchema,
})
