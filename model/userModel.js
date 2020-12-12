const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String
    },
    profilePicURL: {
        type: String
    },
    token: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit); 
}