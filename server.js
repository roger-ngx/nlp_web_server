var socket = require('./ws/server');

const cors = require('cors');
const express = require('express');
const app = express();
const port = 8051;
const { authenticateToken } = require('./middleware/jwt');

app.use(cors());

app.listen(port, () => {
    console.log(`app listening at localhost:${port}`);
})

const bodyParser = require('body-parser');

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//this shoud be configured before define routes
app.use('/api', require('./routes/index'));

// app.use(authenticateToken);

app.use('/api/bio', require('./routes/bio'));
app.use('/api/file', require('./routes/files'));
app.use('/api/experiment', require('./routes/experiment'));
app.use('/api/project', require('./routes/project'));

//MONGODB

const mongoose = require('mongoose');

const dbPath = 'mongodb+srv://roger:Abc123%40%23%24@cluster0.x69ea.mongodb.net/NLP?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log('error: ' + error);
});