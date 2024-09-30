const express = require('express');
const router = express.Router();
const {
	getPositions,
	createPosition,
	getPositionsByRoleId,
	deleteAllPositions,
	updatePosition,
	archivePosition,
	unarchivePosition
} = require('../controller/position.controller');

router.get('/positions', getPositions);
router.post('/positions', createPosition);
router.get('/positions/roles/:id', getPositionsByRoleId);
router.delete('/positions/deleteAllPositions', deleteAllPositions);
router.put('/positions/:id', updatePosition);
router.put('/positions/:id/archive', archivePosition);
router.put('/positions/:id/unarchive', unarchivePosition);

module.exports = router;
