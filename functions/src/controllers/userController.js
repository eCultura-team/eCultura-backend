/* eslint-disable max-len */
const admin = require("firebase-admin");

const auth = admin.auth();
const firestore = admin.firestore();
const authorization = require("../models/authorization");

module.exports = {
  createUser(req, res) {
    const {email, password} = req.body;
    auth.createUser({email, password})
        .then((userCredential) => {
          res.send({userCredential, "status": 201});
        })
        .catch((error) => {
          res.send(error);
        });
  },
  async getUserFavorites(req, res) {
    const {uid} = req.body;
    const token = req.headers["authorization"];
    const authorized = await authorization.verifyToken(uid, token);

    const favorites = [];

    if (authorized) {
      const favoritesRef = firestore.collection("favorites");
      favoritesRef.where("uid", "==", uid).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              favorites.push(doc.data());
              res.send({favorites: favorites});
            });
          })
          .catch((error) => {
            res.send({message: "Error getting documents:", error});
          });
    } else {
      res.send({status: 401, message: "Unauthorized user"});
    }
  },
  async addUserFavorite(req, res) {
    const {uid, idLocation} = req.body;
    const token = req.headers["authorization"];
    const authorized = await authorization.verifyToken(uid, token);

    if (authorized) {
      const docRef = firestore.collection("favorites").doc(uid);

      docRef.update({
        idLocation: admin.firestore.FieldValue.arrayUnion(idLocation),
      }).then(res.send({"message": "Favorite successfully added!", "status": 201})).catch((error) => res.send(error));
    } else {
      res.send({status: 401, message: "Unauthorized user"});
    }
  },
  async removeUserFavorite(req, res) {
    const {uid, idLocation} = req.body;
    const token = req.headers["authorization"];
    const authorized = await authorization.verifyToken(uid, token);

    if (authorized) {
      const docRef = firestore.collection("favorites").doc(uid);

      docRef.update({
        idLocation: admin.firestore.FieldValue.arrayRemove(idLocation),
      }).then(res.send({"message": "Favorite successfully removed!", "status": 201})).catch((error) => res.send(error));
    } else {
      res.send({status: 401, message: "Unauthorized user"});
    }
  },
};

