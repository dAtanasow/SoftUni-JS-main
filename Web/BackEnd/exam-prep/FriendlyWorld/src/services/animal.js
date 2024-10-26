const { Animal } = require('../models/Animal');

async function getAll() {
    return Animal.find().lean();
}

async function getById(id) {
    return Animal.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Animal({
        name: data.name,
        years: data.years,
        kind: data.kind,
        image: data.image,
        need: data.need,
        location: data.location,
        description: data.description,
        author: authorId
    });

    await record.save();
    return record;
}

async function update(id, data, userId) {
    const record = await Animal.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }
    record.name = data.name;
    record.years = data.years;
    record.kind = data.kind;
    record.image = data.image;
    record.need = data.need;
    record.location = data.location;
    record.description = data.description;

    await record.save();
    return record;
}

async function donate(animalId, userId) {
    const record = await Animal.findById(animalId);

    if (!record) {
        throw new ReferenceError('Record not found' + animalId);
    }

    if (record.author.toString() == userId) {
        throw new Error('Access denied')
    }
    if (record.donationList.find(l => l.toString() == userId)) {
        return;
    }
    record.donationList.push(userId);

    await record.save();
    return record;
}

async function deleteById(id, userId) {
    const record = await Animal.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Animal.findByIdAndDelete(id);
}

module.exports = { getAll, getById, update, deleteById, create, donate }