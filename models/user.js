const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const Users = new mongoose.model('users', UserSchema);

module.exports = { Users };