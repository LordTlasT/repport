// helper functions

// treu if s is numeric
function num(s) {
    return /^[0-9]+$/i.test(s);
}

// true if s is alphanumeric
function alnum(s) {
    return /^[a-z0-9]+$/i.test(s);
}

// treu if s is alphanumeric with punctuations
function alnumPuncNull(s) {
    return /^[a-z0-9 .,!?]*$/i.test(s);
}


function category(req, res, next) {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ error: 'Invalid category name. Name is required.' });

    if (!alnum(name))
        return res.status(400).json({ error: 'Invalid category name. Only alphanumeric characters are allowed.' });

    if (name.length > 16)
        return res.status(400).json({ error: 'Invalid category name. Maximum length is 16 characters.' });

    next();
}

function id(req, res, next) {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: 'Invalid id. Id is required.' });

    if (!num(id))
        return res.status(400).json({ error: 'Invalid id. Only numeric characters are allowed.' });
 
    next();
}

function report(req, res, next) {
    const { title, description, category_id } = req.body;
    console.log(title, description, category_id)
    if (!title)
        return res.status(400).json({ error: 'Invalid title. Title is required.' });

    if (!category_id)
        return res.status(400).json({ error: 'Invalid category_id. category_id is required.' });

    if (!alnum(title))
        return res.status(400).json({ error: 'Invalid title. Only alphanumeric characters and punctuations are allowed.' });

    if (title.length > 50)
        return res.status(400).json({ error: 'Invalid title. Maximum length is 50 characters.' });

    if (!alnumPuncNull(description))
        return res.status(400).json({ error: 'Invalid description. Only alphanumeric characters and punctuations are allowed.' });

    if (!num(category_id))
        return res.status(400).json({ error: 'Invalid category id. Only numeric characters are allowed.' });

    next();
}

module.exports = {
    category, id, report
};
