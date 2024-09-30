const express = require("express");
const {
  login,
  createPassword,
  getUsers,
  forgotPassword,
  resetPassword,
} = require("../controller/auth.controller");
const {
  getVerification,
  deleteAllVerifications,
} = require("../controller/verification.controller");

const router = express.Router();

router.post("/users/login", login);
router.put("/users/createPassword/:token", createPassword);
router.post("/users/forgotPassword", forgotPassword);
router.put("/users/resetPassword/:token", resetPassword);
router.get("/users", getUsers);
router.get("/users/verification/:token", getVerification);
router.delete("/users/deleteAllVerifications", deleteAllVerifications);

module.exports = router;
