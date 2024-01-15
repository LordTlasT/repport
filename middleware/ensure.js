const config = require('../config.json');
const token = config.token;

function admin(req, res, next) {
    const requestToken = req.headers['authorization'];
    console.log(requestToken);
    console.log(token);

    if (!requestToken)
        return res.status(400).json({ error: 'Token is required.' });

    if (requestToken !== `Bearer ${token}`)
        return res.status(403).json({ error: 'Invalid token.' });

    next();
}

module.exports = {admin};