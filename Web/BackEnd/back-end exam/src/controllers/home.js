const { Router } = require('express');
const { getAll, getById } = require('../services/planet');

const homeRouter = Router();

homeRouter.get('/', (req,res) => {
    res.render('home')
})

homeRouter.get('/catalog', async (req, res) => {
    const planets = await getAll();

    res.render('catalog', { planets })
})

homeRouter.get('/catalog/:id', async (req, res) => {
    const planet = await getById(req.params.id);

    if(!planet) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == planet.author.toString();
    const hasLiked = Boolean(planet.likedList.find(l => req.user?._id == l.toString()));

    res.render('details', { planet, isOwner, hasLiked });
})
module.exports = { homeRouter }

module.exports = { homeRouter }