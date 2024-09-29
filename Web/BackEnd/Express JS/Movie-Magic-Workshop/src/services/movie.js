const { Movie } = require('../models/Movie');

async function getAllMovies() {
    const movies = await Movie.find().lean();
    return movies;
}

async function getMovie(id) {
    const movie = await Movie.findById(id).lean().populate('cast');
    return movie;
}

async function createMovie(data, authorId) {

    const movie = new Movie({
        title: data.title,
        genre: data.genre,
        director: data.director,
        year: Number(data.year),
        rating: Number(data.rating),
        description: data.description,
        imageURL: data.imageURL,
        author: authorId
    });

    await movie.save();
    return movie;
}

async function updateMovie(movieId, data, userId) {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error(`Movie ${movieId} not found`);
    }

    if (movie.author.toString() != userId) {
        throw new Error('Access denied')
    }

    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = Number(data.year);
    movie.rating = Number(data.rating);
    movie.description = data.description;
    movie.imageURL = data.imageURL;

    await movie.save();
    return movie;
}

async function attachCastToMovie(movieId, castId, userId) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not found`);
    }

    if (movie.author.toString() != userId) {
        throw new Error('Access denied');
    }
    movie.cast.push(castId);
    await movie.save();
    return movie;
}

module.exports = {
    getAllMovies,
    getMovie,
    createMovie,
    attachCastToMovie,
    updateMovie
}