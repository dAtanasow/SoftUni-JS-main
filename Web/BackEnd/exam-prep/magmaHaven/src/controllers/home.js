const { Router } = require('express');
const { getAll, getById } = require('../services/volcano');

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.render('home')
})

homeRouter.get('/catalog', async (req, res) => {
    const volcanoes = await getAll();

    res.render('catalog', { volcanoes })
})

homeRouter.get('/catalog/:id', async (req, res) => {
    const volcano = await getById(req.params.id);

    if(!volcano) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == volcano.author.toString();
    const hasVoted = Boolean(volcano.voteList.find(l => req.user?._id == l.toString()));

    res.render('details', { volcano, isOwner, hasVoted });
})
module.exports = { homeRouter }