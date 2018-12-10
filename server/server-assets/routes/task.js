let router = require('express').Router()
let Tasks = require('../models/task')

//get all tasks in a list
router.get('/:listId', (req, res, next) => {
  Tasks.find({ List: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
//create a new task
router.post('/:listId', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
  Tasks.findByIdAndDelete(req.params.id)
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