var mongoose = require('mongoose');
//schema
var experimentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    input_model: {
        type: String,
        required: true
    },
    dataset: {
        type: String,
        required: true
    },
    batch_size: {
        type: Number,
        default: 8
    },
    epochs: {
        type: Number,
        default: 20
    },
    learning_rate: {
        type: Number,
        default: 20
    },
    max_seq_length: {
        type: Number,
        default: 20
    },
    no_gpus: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Experiment = module.exports = mongoose.model('experiment', experimentSchema);

module.exports.get = function (callback, limit) {
    Experiment.find(callback).limit(limit); 
}