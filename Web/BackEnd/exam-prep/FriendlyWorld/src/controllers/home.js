const { Router } = require('express');
const { getAll, getById } = require('../services/animal');

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const animals = await getAll();
    res.render('home', { animals });
});

homeRouter.get('/dashboard', async (req, res) => {
    const animals = await getAll();
    res.render('dashboard', { animals });
});

homeRouter.get('/dashboard/:id', async (req, res) => {
    const animal = await getById(req.params.id);

    if (!animal) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == animal.author?.toString();
    const hasDonated = Boolean(animal.donationList?.find(l => req.user?._id == l.toString()));

    res.render('details', { animal, isOwner, hasDonated })
});


// homeRouter.get('*', (req, res) => {
//     res.render('404')
// })

module.exports = { homeRouter }