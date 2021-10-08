const admin = require("firebase-admin");

const auth = admin.auth();

module.exports = {
  async verifyToken(uid, token) {
    const cleanToken = token?.slice(7);

    return auth.verifyIdToken(cleanToken).then((decodedToken) => {
      if (decodedToken.uid !== uid) {
        return false;
      }
      return true;
    }).catch((error) => {
      return false;
    });
  },
};
