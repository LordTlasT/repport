function category(req, res, next) {
    const { name } = req.body;
    if (!/^[a-z0-9]+$/i.test(name) || !name) {
        return res.status(400).json({ error: 'Invalid category name. Only alphanumeric characters are allowed.' });
    }
    if (name.length > 16) {
        return res.status(400).json({ error: 'Invalid category name. Maximum length is 16 characters.' });
    }
    next();
}

function id(req, res, next) {
    const { id } = req.params;
    if (!/^[0-9]+$/i.test(id) || !id) {
        return res.status(400).json({ error: 'Invalid id. Only numeric characters are allowed.' });
    }
    next();
}

function report(req, res, next) {
    const { title, description } = req.body;
    const alphanumericWithPunctuations = /^[a-z0-9 .,!?]+$/i;
    if (!/^[a-z0-9]+$/i.test(title) || !title) {
        return res.status(400).json({ error: 'Invalid title. Only alphanumeric characters and punctuations are allowed.' });
    }
    if (title.length > 50) {
        return res.status(400).json({ error: 'Invalid title. Maximum length is 50 characters.' });
    }
    if (!alphanumericWithPunctuations.test(description)) {
        return res.status(400).json({ error: 'Invalid description. Only alphanumeric characters and punctuations are allowed.' });
    }
    next();
}

module.exports = {
    category, id, report
};
