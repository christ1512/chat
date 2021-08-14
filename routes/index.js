const express = require("express");
const router = express.Router();
const cors = require("cors");

router.get("/", cors(),(req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;