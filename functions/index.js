const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vote = require('./vote');
const key = require('./key.json')

admin.initializeApp({
  credential: admin.credential.cert(key)
});

const db = admin.firestore();

exports.vote = functions.https.onRequest(vote(db));

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, emailVerified, disabled } = user;
  return await db.collection('users').doc(uid).set({
    uid,
    email,
    emailVerified,
    disabled
  });
});
