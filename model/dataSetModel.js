var mongoose = require('mongoose');
//schema
var dataSetSchema = mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// Export Dataset Model
var Dataset = module.exports = mongoose.model('dataset', dataSetSchema);

module.exports.get = function (callback, limit) {
    Dataset.find(callback).limit(limit);
};