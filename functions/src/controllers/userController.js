const admin = require("firebase-admin");

const auth = admin.auth();

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
};

