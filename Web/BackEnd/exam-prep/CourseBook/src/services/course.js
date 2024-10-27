const { Course } = require('../models/Course');

async function getAll() {
    return Course.find().lean();
}

async function getById(id) {
    return Course.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Course({
        title: data.title,
        type: data.type,
        certificate: data.certificate,
        image: data.image,
        description: data.description,
        price: data.price,
        author: authorId
    });

    await record.save();
    return record;
}

async function update(id, data, userId) {
    const record = await Course.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }
    record.title = data.title;
    record.type = data.type;
    record.certificate = data.certificate;
    record.image = data.image;
    record.description = data.description;
    record.price = data.price;

    await record.save();
    return record;
}


async function sign(courseId, user) {
    const record = await Course.findById(courseId);

    if (!record) {
        throw new ReferenceError('Record not found' + courseId);
    }

    if (record.author.toString() == user._id) {
        throw new Error('Access denied')
    }
    if (record.signUpList.find(l => l == user.email)) {
        return;
    }
    record.signUpList.push(user.email);

    await record.save();
    return record;
}

async function deleteById(id, userId) {
    const record = await Course.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Course.findByIdAndDelete(id);
}

module.exports = { getAll, getById, update, create, sign, deleteById }