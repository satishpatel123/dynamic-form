const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connect = async () => {
    await mongoose.connect(MONGO_URI)
}

module.exports = {
    connect
}