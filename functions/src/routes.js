/* eslint-disable new-cap */
const express = require("express");
const routes = express.Router();

const userController = require("./controllers/userController");
const locationController = require("./controllers/locationController");
const authorization = require("./models/authorization");


routes.get("/hello", (req, res, next) => {
  res.send("Hello, world!");
});

routes.post("/createUser", userController.createUser);

routes.post("/verifyToken", authorization.verifyToken);

routes.post("/createLocation", locationController.createLocation);

routes.post("/getUserFavorites", userController.getUserFavorites);

routes.post("/addUserFavorites", userController.addUserFavorite);

routes.post("/removeUserFavorites", userController.removeUserFavorite);

routes.get("/getLocations", locationController.getLocations);

module.exports = routes;
