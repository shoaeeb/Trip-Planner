const getAllDestination = (req, res) => {
  res.send("Get All Destinations");
};
const getDestination = (req, res) => {
  res.send("Single Destinations");
};

const createDestination = (req, res) => {
  res.send("Create Destination");
};

const updateDestination = (req, res) => {
  res.send("Update Destination");
};

const deleteDestination = (req, res) => {
  res.send("Delete Destination");
};
module.exports = {
  getAllDestination,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
