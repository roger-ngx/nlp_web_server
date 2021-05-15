const router = require('express').Router();
const projectControler = require('../controller/projectController');

router.get('/', (req, res) => {
    res.json({
        name: 'project api',
        content: 'api works'
    });
});

router.route('/').post(projectControler.add);
router.route('/:owner_id').get(projectControler.view);

module.exports = router;
