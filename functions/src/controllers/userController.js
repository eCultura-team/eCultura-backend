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

    let favorites;

    if (authorized) {
      const favoritesRef = firestore.collection("favorites");
      favoritesRef.where("uid", "==", uid).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              favorites = [...doc.data().idLocation];
              res.send(doc.data());
            });
            if (favorites === null) {
              res.send({message: "No document found."});
            }
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

      docRef.get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              docRef.update({
                idLocation: admin.firestore.FieldValue.arrayUnion(idLocation),
              }).then(res.send({"message": "Favorite successfully added!", "status": 201})).catch((error) => res.send(error));
            } else {
              docRef.set({
                idLocation: admin.firestore.FieldValue.arrayUnion(idLocation),
                uid: uid,
              }).then(res.send({"message": "Favorites successfully created!", "status": 201})).catch((error) => res.send(error));
            }
          });
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
  async getUserData(req, res) {
    const token = req.headers["authorization"]?.slice(7);

    auth.verifyIdToken(token).then((decodedToken) => {
      res.send({"uid": decodedToken.uid, "email": decodedToken.email, "status": 200});
    }).catch((error) => {
      res.send(error);
    });
  },
};

