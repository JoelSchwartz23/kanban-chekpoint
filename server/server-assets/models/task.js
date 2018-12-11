let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'
let Comments = require('./comment')
let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  board: { type: ObjectId, ref: 'Board', required: true },
  content: { type: String, required: true },
  list: { type: ObjectId, ref: 'List', required: true }
})

schema.pre('remove', function (next) {
  let taskId = this._id
  // @ts-ignore
  Promise.all([
    Comments.deleteMany({ task: taskId })
  ])
})

module.exports = mongoose.model(schemaName, schema)