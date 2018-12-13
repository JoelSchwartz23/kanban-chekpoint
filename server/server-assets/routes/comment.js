let router = require('express').Router()
let Comments = require('../models/comment')




//create a new comment
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.error(err)
      next()
    })
})

//update comment if user is author
router.put('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.author.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      comment.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
//delete comment if user is author
router.delete('/:commentId', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      if (!comment.author.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      comment.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})
module.exports = router