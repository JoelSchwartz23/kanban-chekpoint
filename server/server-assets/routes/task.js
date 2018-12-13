let router = require('express').Router()
let Tasks = require('../models/task')
let Comments = require('../models/comment')

//get all comments for one task
router.get("/:taskId/comments", (req, res, next) => {
  Comments.find({ task: req.params.taskId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error(err)
      next()
    })
})







//Edit a task
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.author.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.update(req.body, (err) => {
        if (err) {
          res.status(400).send(err)
        }
        res.send({ message: "successfully updated" })
      })
    })
    .catch(err => {
      console.error(err)
    })
})



//create a new task
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//delete a task
router.delete('/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      if (!task.author.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.remove(err => {
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