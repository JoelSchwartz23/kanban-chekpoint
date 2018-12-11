let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  board: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

module.exports = mongoose.model(schemaName, schema)