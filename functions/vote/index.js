const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const CustomDate = require('../util/CustomDate');

const checkVoteInProgress = (startTime, endTime) => {
  const curTimeYYYYMMDDHHMM = CustomDate.getCurrentTimeYYYYMMDDHHMM();
  return new Date(startTime) - new Date(curTimeYYYYMMDDHHMM) <= 0 && new Date(endTime) - new Date(curTimeYYYYMMDDHHMM) >= 0;
}

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
      const inProgress = checkVoteInProgress(result.startTime, result.endTime);

      data.push({
        id: doc.id,
        ...result,
        isViewerWrite: result.writer.uid === req.user.uid,
        inProgress
      })
    });

    for (const vote of data) {
      const promiseVoteItems = vote.voteItems.map((voteItemId) => db.collection('voteItems').doc(voteItemId).get())
      const voteItemDocs = await Promise.all(promiseVoteItems);
      const isViwerVotes = voteItemDocs.map((voteItemDoc) => voteItemDoc.data().votedUser.some((userId) => userId === req.user.uid ));
      vote.isViewerVote = isViwerVotes.some((isViwerVote) => isViwerVote);
    }
    res.send(data);
  });

  app.get('/:voteId', async (req, res) => {
    const doc = await db.collection('votes').doc(req.params.voteId).get();
    if (!doc.exists) {
      res.send([]);
    } else {
      const data = doc.data();
      const inProgress = checkVoteInProgress(data.startTime, data.endTime);
      const result = {
        id: doc.id,
        ...data,
        isViewerWrite: data.writer.uid === req.user.uid,
        inProgress
      };

      const promiseVoteItems = data.voteItems.map((voteItemId) => db.collection('voteItems').doc(voteItemId).get());
      const voteItemDocs = await Promise.all(promiseVoteItems);
      const isViwerVotes = voteItemDocs.map((voteItemDoc) => voteItemDoc.data().votedUser.some((userId) => userId === req.user.uid));
      result.isViewerVote = isViwerVotes.some((isViwerVote) => isViwerVote);
      res.send(result);
    }
  });

  app.put('/:voteId', async (req, res) => {
    const {
      title,
      startTime,
      endTime,
      voteItems
    } = req.body.data;

    for (const voteItem of voteItems) {
      if (voteItem.id) {
        await db.collection('voteItems').doc(voteItem.id).update({ value: voteItem.value })
      } else {
        const { id: newVoteItemId } = await db.collection('voteItems').add({
          value: voteItem.value,
          votedUser: []
        });
        voteItem.id = newVoteItemId;
      }
    }

    await db.collection('votes').doc(req.params.voteId).update({
      title,
      startTime,
      endTime,
      voteItems: voteItems.map(({ id }) => id),
    });

    res.send(req.params.voteId);
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

  app.delete('/:voteId', async (req, res) => {
    const doc = await db.collection('votes').doc(req.params.voteId).get();
    const result = doc.data();
    const promiseDeleteItem = result.voteItems.map((voteId) => db.collection('voteItems').doc(voteId).delete());
    await Promise.all(promiseDeleteItem);

    await db.collection('votes').doc(req.params.voteId).delete();
    res.send(req.params.voteId);
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

  app.put('/cast/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    await db.collection('voteItems').doc(itemId).update({
      votedUser: admin.firestore.FieldValue.arrayUnion(req.user.uid)
    });

    res.send(itemId);
  });

  return app;
};