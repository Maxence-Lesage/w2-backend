import { Router } from "express";

const movieRouter = Router();

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

movieRouter.get('/movie/:id', (request, response) => {
    const idToSearchFor = request.params.id
    if(movies[idToSearchFor-1]){
        response.status(200).json(movies[idToSearchFor-1])
    }else{
        response.status(404).send("Movie not found")
    }
})

movieRouter.post('/movie/:id', (request, response) => {
    const idToSearchFor = request.params.id
    if(movies[idToSearchFor-1]){
        response.status(409).send("This ID already exist")
    }else{
        movies.push({id: idToSearchFor,title: 'Example',genre: 'Drame'})
        response.status(201).json(movies)
    }
})

movieRouter.delete('/movie/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const movieByID = movies.find(movie => movie.id === id)
    const index = movies.indexOf(movieByID);
    movies.splice(index);
    return response.status(200).json({message: "The ressource has been deleted"})
})

export default movieRouter