/* eslint-disable max-len */
const admin = require("firebase-admin");

const firestore = admin.firestore();

module.exports = {
  createLocation(req, res) {
    const {description, idLocation, lat, long, name, phone, photo, type, website} = req.body;
    const docRef = firestore.collection("locations").doc(name);

    docRef.set({
      description,
      idLocation,
      lat,
      long,
      name,
      phone,
      photo,
      type,
      website,
    }).then(res.send({"message": "Location successfully created!", "status": 201})).catch((error) => res.send(error));
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

