import express from 'express'
import "dotenv/config"

const app = express()
const port = process.env.PORT

let movies = [
    {
        id: 1,
        title: 'Forest Gump',
        genre: 'Comédie'
    },
    {
        id: 2,
        title: 'Forest Gumpii',
        genre: 'Action'
    },
    {
        id: 3,
        title: 'Forest Gumpoo',
        genre: 'Drame'
    }
]

app.get('/', (request, response) => {
    response.send('Walcome ta my APi')
})

app.get('/movie/:id', (request, response) => {
    const idToSearchFor = request.params.id
    if(movies[idToSearchFor-1]){
        response.status(200).json(movies[idToSearchFor-1])
    }else{
        response.status(404).send("Movie not found")
    }
})

app.post('/movie/:id', (request, response) => {
    const idToSearchFor = request.params.id
    if(movies[idToSearchFor-1]){
        response.status(409).send("This ID already exist")
    }else{
        movies.push({id: idToSearchFor,title: 'Example',genre: 'Drame'})
        response.status(201).json(movies)
    }
})

app.listen(port, () => console.log('Server is running on port ' + port))