import { FiDollarSign } from 'react-icons/fi'
import { DateTime } from 'luxon'

import { Expense } from '@pol/types'

import styled from 'styled-components'

export const ExpenseListItem = styled.article`
    border-radius: 8px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 1.5rem;
    background-color: var(--color-white);
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    h1 {
        text-align: 'center';
        margin-top: '4rem';
    }

    h3,
    p {
        margin: 0;
    }

    h3 {
        line-height: 1.4;
    }

    p {
        color: #adadad;
    }
    @media (max-width: 756px) {
        flex-direction: column;
        padding: 1rem;
    }
`

export const IconWrapper = styled.div`
    padding: 8px;
    line-height: 0;
    background-color: #d1e7fb;
    border-radius: 12px;
    margin-right: 1.5rem;

    svg {
        width: 28px;
        height: 28px;
    }

    @media (max-width: 756px) {
        margin: 0;

        svg {
            width: 24px;
            height: 24px;
        }
    }
`

export const TextWrapper = styled.div`
    @media (max-width: 756px) {
        text-align: center;
        margin: 0.5rem 0;
    }
`

export const AmountWrapper = styled.div`
    margin-left: auto;
    margin-right: 1rem;

    @media (max-width: 756px) {
        margin: 0.5rem 0;
    }
`

export const Amount = styled.h3``

type ExpenseListProps = {
    expenses: Expense[]
}

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
    return (
        <>
            {expenses.length > 0 &&
                expenses.map((expense) => (
                    <ExpenseListItem key={expense.id}>
                        <IconWrapper>
                            <FiDollarSign color="var(--color-blue)" />
                        </IconWrapper>
                        <TextWrapper>
                            <h3>{expense.description}</h3>
                            <p>{DateTime.fromISO(expense.spent_at).toFormat('t - MMMM dd, yyyy')}</p>
                        </TextWrapper>
                        <AmountWrapper>
                            <Amount>
                                {new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: expense.currency,
                                }).format(expense.amount)}
                            </Amount>
                        </AmountWrapper>
                    </ExpenseListItem>
                ))}
        </>
    )
}
