const { Schema, model } = require('mongoose')

const factionSchema = new Schema({
    name: { type: String },
    image: { type: String },
    operators: [{ type: Schema.Types.ObjectId, ref: 'Operator'}]
}, {timestamps : true });

module.exports = model('Faction', factionSchema)