const { Schema, model } = require('mongoose');

const operatorSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    gadget: { type: String },
    primaryWeapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon'}],
    secondaryWeapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon'}],
    utility: [{ type: Schema.Types.ObjectId, ref: 'Utility'}],
    side: { type: String },
    faction: { type: Schema.Types.ObjectId, ref: 'Faction'}
}, {timestamps : true });

module.exports = model('Operator', operatorSchema)