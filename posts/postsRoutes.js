const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.staus(500).json({error: "The posts information could not be retrieved."}))
});

router.post('/', (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post)
      .then(({id}) => db.findById(id)
            .then(postArr => postArr.length
                  ? res.status(201).json(postArr[0])
                  : (void 0).throwError())
            .catch(err => res.status(500).json({
              error: "The post was created, but could not be retrieved.",
              id: id
            })))
      .catch(err => res.status(500).json({
        error: "There was an error while saving the post to the database."
      }))
  } else {
    res.status(400).json({error: "Please provide title and contents for the post."})
  }
});

module.exports = router;
