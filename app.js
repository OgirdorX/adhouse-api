const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();


mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
mongoose.connect('mongodb://localhost:27017/adHouse', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/v1', routes);

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);


const server = app.listen(3001, () => {
    console.log('Listening on port: ' + 3001);
});
