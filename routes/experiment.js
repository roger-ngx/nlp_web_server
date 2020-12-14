let router = require('express').Router();

var experimentController = require('../controller/experimentController');

router.route('/')
    // .get(experimentController.index)
    .post(experimentController.add);

router.route('/:experiment_id')
    .get(experimentController.view)
    .patch(experimentController.update)
    .put(experimentController.update)
    .delete(experimentController.delete);

module.exports = router;