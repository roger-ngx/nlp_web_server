var socket = require('../ws/server');
const WebSocket = require('ws');

var mongoose = require('mongoose');
//schema
var bioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// Export Bio Model
var Bio = module.exports = mongoose.model('bio', bioSchema);

Bio.watch().on('change', data => socket.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data.fullDocument));
    }
  }));

module.exports.get = function (callback, limit) {
   Bio.find(callback).limit(limit); 
}