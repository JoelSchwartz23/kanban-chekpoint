let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  list: { type: ObjectId, ref: 'List', required: true }
})

module.exports = mongoose.model(schemaName, schema)