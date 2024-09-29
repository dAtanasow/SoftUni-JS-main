const { getMovie, attachCastToMovie } = require('../services/movie');
const { getAllCast } = require('../services/cast')

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovie(id);

        if (!movie) {
            res.render('404');
            return;
        };

        const castInMovie = movie.cast.map(id => id.toString());
        const allCast = await getAllCast();
        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const castId = req.body.cast;

        if (!movieId || !castId) {
            res.status(400).end();
            return;
        }

        if (castId == 'none') {
            const allCast = await getAllCast();
            const movie = await getMovie(movieId);
            res.render('cast-attach', { movie, allCast, error: true });
            return;
        }
        try {
            await attachCastToMovie(movieId, castId);
        } catch (err) {
            res.status(400).end();
            return;
        }
        res.redirect('/details/' + movieId);
    }
}