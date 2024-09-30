const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  archiveRole,
  unarchiveRole,
  deleteAllRoles,
} = require("../controller/role.controller");

router.get("/roles", getRoles);
router.post("/roles", createRole);
router.delete("/roles/deleteAllRoles", deleteAllRoles);
router.put("/roles/:id", updateRole);
router.put("/roles/:id/archive", archiveRole);
router.put("/roles/:id/unarchive", unarchiveRole);

module.exports = router;
