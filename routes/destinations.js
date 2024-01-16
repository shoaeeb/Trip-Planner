const express = require("express");
const router = express.Router();
const {
  getAllDestination,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinations.js");

router.route("/").get(getAllDestination).post(createDestination);
router
  .route("/:id")
  .get(getDestination)
  .patch(updateDestination)
  .delete(deleteDestination);
module.exports = router;
