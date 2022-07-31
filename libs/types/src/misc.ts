import { z } from 'zod'

// NOTE: template literal types could be used https://javascript.plainenglish.io/type-safe-date-strings-66b6dc58658a
const iso8601DateStringRegex =
    /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
export const iso8601DateStringSchema = z.string().regex(iso8601DateStringRegex)
export type Iso8601DateString = string

export const currencyAcronymSchema = z.enum(['USD', 'HUF'])
export type CurrencyAcronym = z.infer<typeof currencyAcronymSchema>
