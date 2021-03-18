const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const connectDB = require('./config/db');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require(('./routes/api/auth')));
app.use('/api/profile', require(('./routes/api/profile')));

connectDB();

app.set('port', (process.env.PORT || 5000));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(app.get('port'), () => {
    console.log(`Server is running on http://localhost:${app.get('port')}`);
});