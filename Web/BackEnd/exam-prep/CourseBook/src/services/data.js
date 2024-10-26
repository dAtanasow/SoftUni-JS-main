const { Data } = require('../models/Data');

async function getAll() {
    return Data.find().lean();
}

async function getById(id) {
    return Data.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Data({
        prop: data.prop,
        author: authorId
    });

    await record.save();
    return record;
}

async function update(id, data, userId) {
    const record = await Data.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }
    record.prop = data.prop;

    await record.save();
    return record;
}

async function deleteById(id, userId) {
    const record = await Data.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Data.findByIdAndDelete(id);
}

module.exports = { getAll, getById, update, deleteById }