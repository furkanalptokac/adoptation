const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
console.log(process.env)

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const postRoutes = require('./routes/api/posts');
const userRoutes = require('./routes/api/users');

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(postRoutes);
app.use(userRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});