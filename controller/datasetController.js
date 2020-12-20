const Dataset = require('../model/dataSetModel');

// View Dataset
exports.view = function (req, res) {
    console.log(req.params.owner_id);

    Dataset.find({owner_id: req.params.owner_id}, function (err, dataset) {
        if (err){
            console.log(err);
            res.send(err);
        }else{
            res.json({
                message: 'Dataset Details',
                data: dataset
            });
        }
    });
};

exports.add = function (req, res) {
    console.log(req.body);

    var dataset = new Dataset();
    dataset.owner_id = req.body.owner_id;
    dataset.name = req.body.name? req.body.name: dataset.name;
    dataset.type = req.body.type;
    dataset.filePath = req.body.filePath;

    //Save and check error
    dataset.save(function (err) {
        console.log(err);
        if (err){
            res.json(err);
        } else {
            res.json({
                message: "New Dataset Added!",
                data: dataset
            });
        }
    });
};

// Update Dataset
exports.update = function (req, res) {
    Dataset.findById(req.params.bio_id, function (err, dataset) {
        if (err)
            res.send(err);
        dataset.name = req.body.name ? req.body.name : dataset.name;
        dataset.type = req.body.type;
        dataset.filePath = req.body.filePath;

        //save and check errors
        dataset.save(function (err) {
            if (err){
                res.json(err);
            }else{
                res.json({
                    message: "Bio Updated Successfully",
                    data: dataset
                });
            }
        });
    });
};

// Delete Bio
exports.delete = function (req, res) {
    Dataset.deleteOne({
        _id: req.params.bio_id
    }, function (err, contact) {
        if (err){
            res.send(err);
        }else{
            res.json({
                status: "success",
                message: 'Bio Deleted'
            });
        }
    });
};