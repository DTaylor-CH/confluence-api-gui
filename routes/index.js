const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index");

router.get("/healthcheck", indexController.HealthCheck);
router.get("/", indexController.Index);
router.post("/submit", indexController.Submit);

module.exports = router;
