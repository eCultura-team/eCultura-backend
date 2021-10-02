const admin = require("firebase-admin");

const auth = admin.auth();

module.exports = {
  verifyToken(req, res) {
    const token = req.headers["authorization"].slice(7);
    const {uid} = req.body;

    auth.verifyIdToken(token).then((decodedToken) => {
      if (decodedToken.uid !== uid) {
        res.send({message: "Unauthorized", status: 401});
      }
      res.send({message: "Authorized", status: 200});
    }).catch((error) => {
      res.send({error, status: 401});
    });
  },
};
