const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
} = require("../controller/roles.controller");

router.get("/roles", getRoles);
router.post("/role", createRole);
router.put("/role/:id", updateRole);

module.exports = router;
