import express from 'express'
import cors from 'cors'

const EXPENSE_SERVICE_PORT = process.env.EXPENSE_SERVICE_PORT || 3333

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/spendings', (req, res) => {
    res.send([
        {
            description: 'Mango',
            amount: 1200,
            spent_at: new Date().toISOString(),
            currency: 'USD',
        },
    ])
})

const server = app.listen(EXPENSE_SERVICE_PORT, () => {
    console.log(`Listening on ${EXPENSE_SERVICE_PORT}`)
})

server.on('error', console.error)
