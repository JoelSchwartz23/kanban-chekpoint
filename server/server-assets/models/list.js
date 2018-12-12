let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let Tasks = require('./task')
let Comments = require('./comment')

let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  board: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

schema.pre('remove', function (next) {
  //@ts-ignore
  Promise.all([
    Tasks.deleteMany({ list: this._id }),
    Comments.deleteMany({ list: this._id })
  ])
})

module.exports = mongoose.model(schemaName, schema)