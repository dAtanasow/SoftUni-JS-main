const { Router } = require('express');
const { getAll, getById } = require('../services/course');

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.render('home')
})

homeRouter.get('/catalog', async (req, res) => {
    const courses = await getAll();

    res.render('catalog', { courses })
})

homeRouter.get('/catalog/:id', async (req, res) => {
    const course = await getById(req.params.id);
    const user = req.user;
    if (!course) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == course.author.toString();
    const hasSigned = Boolean(course.signUpList.find(l => req.user?.email == l));
    const signs = course.signUpList.join('')
    res.render('details', { course, signs, user, isOwner, hasSigned });
})
module.exports = { homeRouter }