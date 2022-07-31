import { cloneDeep } from 'lodash'

import { Expense } from '@pol/types'

/**
 * I've implemented a mock store to help with testing, and keep code clean.
 * In a real world app, I'd go with a similar pattern using knex.js, or use
 * an ORM like sequelize.
 * Regardless of what's being used, the goal is to provide a consistent
 * interface that alows for a functional style and can be mocked easily
 * in tests.
 */

export type Store<T> = {
    addOne: (item: T) => void
    getAll: () => T[]
}

export const makeExpenseStore = (initialItems: Expense[] = []): Store<Expense> => {
    let expenses: Expense[] = initialItems

    const addOne = (expense: Expense): void => {
        expenses = [...expenses, cloneDeep(expense)]
    }

    const getAll = (): Expense[] => cloneDeep(expenses)

    return {
        addOne,
        getAll,
    }
}
