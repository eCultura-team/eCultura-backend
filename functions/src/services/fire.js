/* eslint-disable max-len */
require("dotenv/config");

const fireConfig = {
  "type": process.env.FIREBASE_APP_API_TYPE,
  "project_id": process.env.FIREBASE_APP_API_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_APP_API_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_APP_API_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_APP_API_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_APP_API_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_APP_API_AUTH_URI,
  "token_uri": process.env.FIREBASE_APP_API_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_APP_API_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_APP_API_CLIENT_X509_CERT_URL,
};

module.exports = fireConfig;
