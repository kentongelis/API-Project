const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operator');
const Weapon = require('../models/weapon');
const Utility = require('../models/utility');
const Faction = require('../models/faction');


const showOperators = async(req, res) => {
    try {
        const operators = await Operator.find();
        return res.status(200).json(operators);
    } catch(err) {
        console.log(err);
    };
};

exports.showOperators = showOperators;

const showOperatorByName = async(req, res) => {
    try {
        const operator =  await Operator.findOne({name: req.params.name});
        
        if (!operator) {
            return res.status(400).json({message: "This operator does not exist"});
        } else {
            return res.status(200).json(operator);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showOperatorByName = showOperatorByName;

const showOperatorById = async(req, res) => {
    try {
        const operator = await Operator.findById(req.params.id)

        if (!operator) {
            return res.status(400).json({message: "This operator does not exist"});
        } else {
            return res.status(200).json(operator);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showOperatorById = showOperatorById;

const createOperator = async(req, res) => {
    try {
        const {name, image, gadget, primaryWeapons, secondaryWeapons, utility, side, org, faction} = req.body;
        const operator = new Operator();
        operator.name = name;
        operator.image = image;
        operator.gadget = gadget;
        if (primaryWeapons, secondaryWeapons, utility) {
            for (let i = 0; i < primaryWeapons.length; i++) {
                let weapon = await Weapon.findById(primaryWeapons[i]);
                operator.primaryWeapons.push(weapon);
            }
            for (let i = 0; i < secondaryWeapons.length; i++) {
                let weapon = await Weapon.findById(secondaryWeapons[i]);
                operator.secondaryWeapons.push(weapon);
            }
            for (let i = 0; i < utility.length; i++) {
                let util = await Utility.findById(utility[i]);
                operator.utility.push(util);
            }
        }
        operator.side = side;
        operator.org = org;
        if (faction) {
            operator.faction = await Faction.findById(faction);
        }

        await operator.save()
            .catch((err) => {
                console.log(err.message);
            });

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err);
    }
}

exports.createOperator = createOperator;

const updateOperatorNoClass = async(req, res) => {
    try {
        const {name, image, gadget, side, org, faction} = req.body;
        const fields = {name, image, gadget, side, org, faction};

        const operator = await Operator.findByIdAndUpdate(req.params.id, fields, { new: true });

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err);
    };
};

exports.updateOperatorNoClass = updateOperatorNoClass;

const deleteAndUpdateOperatorPrimaryWeapon = async(req, res) => {
    try {
        const {first, second} = req.body;
        const operator = await Operator.findById(req.params.id);

        if (first) { 
            const removed = await Weapon.findById(first);
            operator.primaryWeapons.splice(operator.primaryWeapons.indexOf(removed),1);
        };

        if (second) {
        const added = await Weapon.findById(second);
        operator.primaryWeapons.push(added);
        }

        operator.save()
        .catch((err) => {
        console.log(err.message);
        })

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err);
    };
};

exports.deleteAndUpdateOperatorPrimaryWeapon = deleteAndUpdateOperatorPrimaryWeapon;

const deleteAndUpdateOperatorSecondaryWeapon = async(req, res) => {
    try {
        const {first, second} = req.body;
        const operator = await Operator.findById(req.params.id);
        const removed = await Weapon.findById(first);

        operator.secondaryWeapons.splice(operator.secondaryWeapons.indexOf(removed),1);

        if (second) {
        const added = await Weapon.findById(second);
        operator.secondaryWeapons.push(added);
        }

        operator.save()
        .catch((err) => {
        console.log(err.message);
        })

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err);
    };
};

exports.deleteAndUpdateOperatorSecondaryWeapon = deleteAndUpdateOperatorSecondaryWeapon;

const deleteAndUpdateUtility = async(req,res) => {
    try {
        const {first, second} = req.body;
        const operator = await Operator.findById(req.params.id);
        const removed = await Utility.findById(first);

        operator.utility.splice(operator.utility.indexOf(removed),1);

        if (second) {
        const added = await Utility.findById(second);
        operator.Utility.push(added);
        }

        operator.save()
        .catch((err) => {
        console.log(err.message);
        })

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err);
    };
};

exports.deleteAndUpdateUtility = deleteAndUpdateUtility;

const deleteAndUpdateFaction = async(req, res) => {
    try {
        const {first, second} = req.body;
        const operator = await Operator.findById(req.params.id);
        const removed = await Faction.findById(first);

        operator.faction.splice(operator.faction.indexOf(removed),1);

        if (second) {
        const added = await Faction.findById(second);
        operator.Faction.push(added);
        }

        operator.save()
        .catch((err) => {
        console.log(err.message);
        })

        return res.status(200).json(operator);
    } catch(err) {
        console.log(err)
    };
};

exports.deleteAndUpdateFaction = deleteAndUpdateFaction;

const deleteOperator = async(req, res) => {
    console.log(req.params.id)
    try {
        await Operator.findByIdAndDelete(req.params.id);

        return res.status(200).json("Operator successfully deleted");
    } catch(err) {
        console.log(err);
    }
};

exports.deleteOperator = deleteOperator;