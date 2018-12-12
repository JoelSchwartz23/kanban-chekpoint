let router = require('express').Router()
let Lists = require('../models/list')
let Tasks = require('../models/task')



//post a new list
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//delete a list
router.delete('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.author.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})

//get all tasks in a list
router.get('/:listId/tasks', (req, res, next) => {
  Tasks.find({ list: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})










module.exports = router