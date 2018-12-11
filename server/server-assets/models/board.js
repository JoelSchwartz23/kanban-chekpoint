let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Board'
let Lists = require('./list')
let Tasks = require('./task')
let Comments = require('./comment')


let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  author: { type: ObjectId, ref: 'User', required: true }
})

schema.pre('remove', function (next) {
  // @ts-ignore
  Promise.all([
    Lists.deleteMany({ board: this._id }),
    Tasks.deleteMany({ board: this._id }),
    Comments.deleteMany({ board: this._id })
  ])

    .then(() => next())
    .catch(err => next(err))
})
module.exports = mongoose.model(schemaName, schema)