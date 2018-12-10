let router = require('express').Router()
let Comments = require('../models/comment')


//get all comments for one task
router.get("/:taskId", (req, res, next) => {
  Comments.find({ task: req.params.taskId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error(err)
      next()
    })
})

//create a new comment
router.post('/:boardId', (req, res, next) => {
  req.body.author = req.session.uid
  Comments.create(req.body)
    .then(newList => {
      res.send(newList)
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
router.delete('/:id', (req, res, next) => {
  Comments.findByIdAndDelete(req.params.id)
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