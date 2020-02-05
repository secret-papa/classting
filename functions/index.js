const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const claims = { level: 2 };
  await admin.auth().setCustomUserClaims(user.uid, claims);
});
