const express = require('express');
const routes = require('./routes/route');

const app = express();

app.use(routes)
app.use(express.json());

app.listen(3333, () => {
    console.log('Servidor online')
})