const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Joi = require('joi');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/api/users');
const postRoutes = require('./routes/api/posts');

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(postRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});