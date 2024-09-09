const express = require("express");
const router = express.Router();
const {
  getPositions,
  createPosition,
  getPositionsByRoleId,
  deleteAllPositions,
  updatePosition,
  archivePosition,
  unarchivePosition,
} = require("../controller/positions.controller");

router.get("/positions", getPositions);
router.post("/position", createPosition);
router.get("/positionsByRoleId/:id", getPositionsByRoleId);
router.delete("/deleteAllPositions", deleteAllPositions);
router.put("/position/:id", updatePosition);
router.put("/position/:id/archive", archivePosition);
router.put("/position/:id/unarchive", unarchivePosition);

module.exports = router;
