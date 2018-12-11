let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  task: { type: ObjectId, ref: 'Task', required: true },
  board: { type: ObjectId, ref: 'Board', required: true }
})

module.exports = mongoose.model(schemaName, schema)