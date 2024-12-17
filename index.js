import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.send('Walcome ta my APi')
})

app.listen(3002, () => console.log('Server is running on port 3002'))