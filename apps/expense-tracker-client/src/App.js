import React, { useState } from 'react'
import Form from './components/Form'
import FiltersAndOrderings from './components/FiltersAndOrderings'
import { ExpenseList } from './components/ExpenseList'
import Layout from './components/Layout'

export default function App() {
    const [expenses, setExpenses] = useState([])

    return (
        <>
            <Layout>
                <Form />
                <FiltersAndOrderings />
                <ExpenseList expenses={expenses} setExpenses={setExpenses} />
            </Layout>
        </>
    )
}
