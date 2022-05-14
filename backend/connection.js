require('dotenv').config();

const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Succeed!"))
    .catch((err) => console.log(err));

module.exports = connection;