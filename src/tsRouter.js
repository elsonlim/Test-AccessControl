const express = require("express");
const { checkResourcePermission } = require("./permissionMiddleware");

const router = express.Router();

const action = {
  readOwn: "readOwn",
  readAny: "readAny",
  updateOwn: "updateOwn",
  updateAny: "updateAny",
  deleteOwn: "deleteOwn",
  deleteAny: "deleteAny",
  createOwn: "createOwn",
  createAny: "createAny",
};

router.post(
  "/",
  checkResourcePermission(action.createOwn, "ts", ["self"]),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  "/",
  checkResourcePermission(action.readOwn, "ts", ["self"]),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.delete(
  "/",
  checkResourcePermission(action.deleteOwn, "ts", ["self"]),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post(
  "/verify",
  checkResourcePermission(action.createOwn, "verify-ts", ["self"]),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post(
  "/approve",
  checkResourcePermission(action.createOwn, "approve-ts", [
    "!self",
    "productLevel",
  ]),
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
