const express = require('express');
const app = express();
const FormRouter = require('./routes/FormRoutes');
const cors = require('cors');
const path = require('path');


app.use(cors())

app.use(express.json());

app.use('/api', FormRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log('App listening on port: '+ PORT);
});