const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;

const routes = require('./routes');
const dbConfig = require('./config/config');

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connection successful.');
}).catch(err => {
    console.log('db connection failed', err);
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});