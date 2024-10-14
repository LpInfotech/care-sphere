const express = require('express');
const router = express.Router();
const {
	createDivision,
	getDivisions,
	updateDivision,
	archiveDivision,
	unarchiveDivision,
	deleteAllDivisions
} = require('../controller/division.controller');

router.post('/divisions', createDivision);
router.get('/divisions', getDivisions);
router.put('/divisions/:id', updateDivision);
router.put('/divisions/:id/archive', archiveDivision);
router.put('/divisions/:id/unarchive', unarchiveDivision);
router.delete('/divisions/deleteAllDivisions', deleteAllDivisions);

module.exports = router;
