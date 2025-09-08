const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/', UserController.all.bind(UserController));
router.get('/:id', UserController.one.bind(UserController));
router.post('/', UserController.create.bind(UserController));
router.put('/:id', UserController.update.bind(UserController));
router.delete('/:id', UserController.remove.bind(UserController));

module.exports = router;
