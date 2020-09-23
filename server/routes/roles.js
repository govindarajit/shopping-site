const express = require('express');
const RolesController = require('../controllers/RolesController');
const router = express.Router();

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getById);
router.post('/', RolesController.add);
router.put('/:id', RolesController.update);
router.delete('/:id', RolesController.delete);

module.exports = router;