const Project = require('../model/projectModal');

exports.view = (req, res) => {
    const { owner_id } = req.params;

    Project.find({owner_id}, (err, projects) => {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Projects Successfully!",
            data: projects     
        });
    });
};

//For creating new bio
exports.add = function (req, res) {
    const { name, type, ownerId } = req.body;

    var project = new Project();
    project.name = name;
    project.type = type;
    project.owner_id = ownerId;

    project.save(function (err) {
        if (err)
            res.json(err);

    res.json({
            message: "New Project Added!",
            data: project
        });
    });
};