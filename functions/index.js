/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const fireConfig = require("./src/services/fire");

const PORT = 9000;
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(fireConfig),
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", require("./src/routes"));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

exports.app = functions.region("southamerica-east1").https.onRequest(app);
