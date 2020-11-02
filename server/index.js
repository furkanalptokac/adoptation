const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 5000;
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const dbConfig = require('./config/config');

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRoutes);
app.use(userRoutes);
app.use(postRoutes);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('db connection successful.');
}).catch(err => {
    console.log('db connection failed', err);
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});