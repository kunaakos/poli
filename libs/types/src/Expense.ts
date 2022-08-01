import { z } from 'zod'
import { CurrencyCode, currencyCodeSchema, Iso8601DateString, iso8601DateStringSchema } from './misc'

export type Expense = {
    id: string
    description: string
    amount: number
    spent_at: Iso8601DateString
    currency: CurrencyCode
}

export const expenseSchema = z.object({
    id: z.string().uuid(), // NOTE: doesn't check uuid version
    description: z.string(),
    amount: z.number(),
    spent_at: iso8601DateStringSchema,
    currency: currencyCodeSchema,
})
