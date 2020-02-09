const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

module.exports = (db) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(async (req, _, next) => {
    const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization);
    if (decodedToken) {
      req.user = decodedToken;
      next();
    }
  });

  app.get('/all', async (req, res) => {
    const snapshot = await db.collection('votes').get();
    const data = [];

    snapshot.forEach((doc) => {
      const result = doc.data();
      data.push({
        id: doc.id,
        ...result,
        isViwerWrite: result.writer.uid === req.user.uid
      })
    });

    for (const vote of data) {
      const promiseVoteItems = vote.voteItems.map((voteItemId) => db.collection('voteItems').doc(voteItemId).get())
      const voteItemDocs = await Promise.all(promiseVoteItems);
      const isViwerVotes = voteItemDocs.map((voteItemDoc) => voteItemDoc.data().votedUser.some((userId) => userId === req.user.uid ));
      vote.isViwerVote = isViwerVotes.some((isViwerVote) => isViwerVote);
    }
    res.send(data);
  });

  app.get('/:voteId', async (req, res) => {
    const doc = await db.collection('votes').doc(req.params.voteId).get();
    if (!doc.exists) {
      res.send([]);
    } else {
      const data = doc.data();
      const result = {
        id: doc.id,
        ...data,
        isViwerWrite: data.writer.uid === req.user.uid
      };

      const promiseVoteItems = data.voteItems.map((voteItemId) => db.collection('voteItems').doc(voteItemId).get());
      const voteItemDocs = await Promise.all(promiseVoteItems);
      const isViwerVotes = voteItemDocs.map((voteItemDoc) => voteItemDoc.data().votedUser.some((userId) => userId === req.user.uid));
      result.isViwerVote = isViwerVotes.some((isViwerVote) => isViwerVote);
      res.send(result);
    }
  });

  app.get('/items/:id', async (req, res) => {
    const doc = await db.collection('voteItems').doc(req.params.id).get();
    if (!doc.exists) {
      res.send([]);
    } else {
      const data = {
        id: doc.id,
        ...doc.data()
      };
      res.send(data);
    }
  });

  app.post('/', async (req, res) => {
    const {
      title,
      startTime,
      endTime,
      voteItems
    } = req.body.data;

    const voteRef = await Promise.all(voteItems.map(({ value }) => db.collection('voteItems').add({
      value,
      votedUser: []
    })));

    const votesRef = await db.collection('votes').add({
      title,
      startTime,
      endTime,
      voteItems: voteRef.map(({ id }) => id),
      writer: {
        email: req.user.email,
        uid: req.user.uid
      }
    });

    res.send(votesRef.id);
  });

  return app;
};