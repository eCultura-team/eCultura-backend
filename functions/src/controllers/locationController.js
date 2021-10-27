/* eslint-disable max-len */
const admin = require("firebase-admin");

const firestore = admin.firestore();

module.exports = {
  createLocation(req, res) {
    const {description, lat, long, name, phone, photo, type, website, address} = req.body;
    const docId = Math.floor(Math.random() * (9999 - 1) + 1);

    const docRef = firestore.collection("locations").doc(docId.toString());

    docRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        res.send({"message": "Document already exists."});
      } else {
        docRef.set({
          idLocation: docId,
          description,
          lat,
          long,
          name,
          phone,
          photo: admin.firestore.FieldValue.arrayUnion(photo),
          type,
          website,
          address,
        }).then(res.send({"message": "Location successfully created!", "status": 201})).catch((error) => res.send({"message": "Error creating location!"}));
      }
    }).catch((error) => {
      res.send(error);
    });
  },

  updateLocation(req, res) {
    const {description, lat, long, name, phone, photo, type, website} = req.body;
    const docRef = firestore.collection("locations").doc(name);

    docRef.update({
      description,
      lat,
      long,
      name,
      phone,
      photo: admin.firestore.FieldValue.arrayUnion(photo),
      type,
      website,
    }).then(res.send({"message": "Location successfully updated!", "status": 201})).catch((error) => res.send(error));
  },

  getLocations(req, res) {
    firestore.collection("locations").get().then((location) => {
      const locations = [];

      location.forEach((doc) => {
        locations.push(doc.data());
      });

      res.send({"locations": [...locations], "status": 200});
    }).catch((error) => res.send({error}));
  },
};

