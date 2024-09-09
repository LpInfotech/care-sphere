const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  archiveRole,
  unarchiveRole,
  deleteAllRoles,
} = require("../controller/roles.controller");

router.get("/roles", getRoles);
router.post("/role", createRole);
router.delete("/deleteAllRoles", deleteAllRoles);
router.put("/role/:id", updateRole);
router.put("/role/:id/archive", archiveRole);
router.put("/role/:id/unarchive", unarchiveRole);

module.exports = router;
