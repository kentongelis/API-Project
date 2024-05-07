const { Schema, model } = require('mongoose');

const utilitySchema = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    operators: [{ type: Schema.Types.ObjectId, ref: 'Operator'}],
    side: { type: String },
    purpose: { type: String }
}, {timestamps : true });

module.exports = model('Utility', utilitySchema )