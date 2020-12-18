const mongoose = require('mongoose');
const config = require('./config');
const db = config.url;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected.');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;