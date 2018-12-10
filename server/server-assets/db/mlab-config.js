var mongoose = require('mongoose')
var connectionString = 'mongodb://student1:student1@ds062339.mlab.com:62339/kanban-checkpoint'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})