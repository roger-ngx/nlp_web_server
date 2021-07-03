const Dataset = require('../model/dataSetModel');

// View Dataset
exports.view = function (req, res) {
    const { userId, projectId } = req.body;
    console.log(req.body);

    Dataset.find({owner_id: userId, project_id: projectId}, function (err, dataset) {
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
    const {owner_id, project_id, name, type, filePath} = req.body;

    var dataset = new Dataset();
    dataset.owner_id = owner_id;
    dataset.project_id = project_id;
    dataset.name = name || dataset.name;
    dataset.type = type;
    dataset.filePath = filePath;

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