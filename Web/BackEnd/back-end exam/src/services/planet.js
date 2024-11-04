const { Planet } = require('../models/Planet');

async function getAll() {
    return Planet.find().lean();
}

async function getById(id) {
    return Planet.findById(id).lean();
}

async function searchPlanets(name, solarSystem) {

    const query = {};

    if (name && name.trim()) {
        query.name = new RegExp(name.trim(), 'i');
    }

    if (solarSystem && solarSystem.trim()) {
        query.solarSystem = new RegExp(solarSystem.trim(), 'i')

    }
    return Planet.find(query).lean();
}

async function create(data, authorId) {
    const record = new Planet({
        name: data.name,
        age: data.age,
        solarSystem: data.solarSystem,
        type: data.type,
        moons: data.moons,
        size: data.size,
        rings: data.rings,
        description: data.description,
        image: data.image,
        author: authorId
    });

    await record.save();
    return record;
}

async function update(id, data, userId) {
    const record = await Planet.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }
    record.name = data.name;
    record.age = data.age;
    record.solarSystem = data.solarSystem;
    record.type = data.type;
    record.moons = data.moons;
    record.size = data.size;
    record.rings = data.rings;
    record.description = data.description;
    record.image = data.image;


    await record.save();
    return record;
}

async function like(planetId, userId) {
    const record = await Planet.findById(planetId);

    if (!record) {
        throw new ReferenceError('Record not found' + planetId);
    }

    if (record.author.toString() == userId) {
        throw new Error('Access denied')
    }
    if (record.likedList.find(l => l.toString() == userId)) {
        return;
    }
    record.likedList.push(userId);

    await record.save();
    return record;
}


async function deleteById(id, userId) {
    const record = await Planet.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Planet.findByIdAndDelete(id);
}

module.exports = { getAll, getById, update, create, searchPlanets, like, deleteById }