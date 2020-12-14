const Experiment = require('../model/experimentModel');

// View Dataset
exports.view = function (req, res) {
    console.log(req.params.owner_id);

    Experiment.find({owner_id: req.params.owner_id}, function (err, experiment) {
        if (err){
            console.log(err);
            res.send(err);
        }
        res.json({
            message: 'Dataset Details',
            data: experiment
        });
    });
};

exports.add = function (req, res) {
    console.log(req.body);

    var experiment = new Experiment();
    experiment.name = req.body.name ? req.body.name : experiment.name;
    experiment.input_model = req.body.input_model;
    experiment.dataset = req.body.dataset;
    experiment.batch_size = +req.body.batch_size;
    experiment.epochs = +req.body.epochs;
    experiment.learning_rate = +req.body.learning_rate;
    experiment.max_req_length = +req.body.max_req_length;
    experiment.no_gpus = +req.body.no_gpus;

    //Save and check error
    experiment.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Dataset Added!",
            data: experiment
        });
    });
};

// Update Dataset
exports.update = function (req, res) {
    Experiment.findById(req.params.bio_id, function (err, experiment) {
        if (err)
            res.send(err);
        experiment.name = req.body.name ? req.body.name : experiment.name;
        experiment.input_model = req.body.input_model;
        experiment.dataset = req.body.dataset;
        experiment.batch_size = req.body.batch_size;
        experiment.epochs = req.body.epochs;
        experiment.learning_rate = req.body.learning_rate;
        experiment.max_req_length = req.body.max_req_length;
        experiment.no_gpus = req.body.no_gpus;

        //save and check errors
        experiment.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: "Bio Updated Successfully",
                data: experiment
            });
        });
    });
};

// Delete Bio
exports.delete = function (req, res) {
    Experiment.deleteOne({
        _id: req.params.bio_id
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Bio Deleted'
        });
    });
};