const { Schema, model } = require('mongoose'); 

const weaponSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    operators: [{ type: Schema.Types.ObjectId, ref: 'Weapon'}],
    sights: { type: String },
    damage: { type: Number },
    rof: {type: Number}
}, {timestamps: true});

module.exports = model('Weapon', weaponSchema)