const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.staus(500).json({error: "The posts information could not be retrieved."}))
});

module.exports = router;
