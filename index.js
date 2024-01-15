const express = require('express');
const reportRouter = require('./routes/reportRoute');
const categoryRouter = require('./routes/categoryRoute');

const app = express();

app.use(express.json());
app.use('/report', reportRouter);
app.use('/category', categoryRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});