const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operator');
const Weapon = require('../models/weapon');
const Utility = require('../models/utility');
const Faction = require('../models/faction');
const checkAuth = require('../index')


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
    if (req.user) {
        try {
            const {name, image, gadget, primaryWeapons, secondaryWeapons, utility, side, org, faction} = req.body;
            const operator = new Operator();
            operator.name = name;
            operator.image = image;
            operator.gadget = gadget;
            if (primaryWeapons, secondaryWeapons, utility) {
                for (let i = 0; i < primaryWeapons.length; i++) {
                    let weapon = await Weapon.findOne({name:primaryWeapons[i]});
                    operator.primaryWeapons.push(weapon);
                }
                for (let i = 0; i < secondaryWeapons.length; i++) {
                    let weapon = await Weapon.findOne({name:secondaryWeapons[i]});
                    operator.secondaryWeapons.push(weapon);
                }
                for (let i = 0; i < utility.length; i++) {
                    let util = await Utility.findOne({name:utility[i]});
                    operator.utility.push(util);
                }
            }
            operator.side = side;
            operator.org = org;
            if (faction) {
                operator.faction = await Faction.findOne({name:faction});
            }

            await operator.save()
                .catch((err) => {
                    console.log(err.message);
                });

            return res.status(200).json(operator);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    }
};

exports.createOperator = createOperator;

const updateOperatorNoClass = async(req, res) => {
    if (req.user) {
        try {
            const {name, image, gadget, side, org, faction} = req.body;
            console.log(faction)
            const newFaction = await Faction.findOne({name:faction})
            console.log(newFaction)
            const fields = {name, image, gadget, side, org, newFaction};

            const operator = await Operator.findByIdAndUpdate(req.params.id, fields, { new: true });

            return res.status(200).json(operator);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.updateOperatorNoClass = updateOperatorNoClass;

const updateOperatorFaction = async(req, res) => {
    if (req.user) {
        try {
            const { faction } = req.body

            console.log(faction);



            const operator = await Operator.findByIdAndUpdate(req.params.id, newFaction, { new: true });

            return res.status(200).json(operator);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.updateOperatorFaction = updateOperatorFaction;

const deleteAndUpdateOperatorPrimaryWeapon = async(req, res) => {
    if (req.user) {
        try {
            const {first, second} = req.body;
            const operator = await Operator.findById(req.params.id);

            if (first) { 
                const removed = await Weapon.findOne({name:first});
                operator.primaryWeapons.splice(operator.primaryWeapons.indexOf(removed),1);
            };

            if (second) {
            const added = await Weapon.findOne({name:second});
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
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteAndUpdateOperatorPrimaryWeapon = deleteAndUpdateOperatorPrimaryWeapon;

const deleteAndUpdateOperatorSecondaryWeapon = async(req, res) => {
    if (req.user) {
        try {
            const {first, second} = req.body;
            const operator = await Operator.findById(req.params.id);

            if (first) {
                const removed = await Weapon.findOne({name:first});
                operator.secondaryWeapons.splice(operator.secondaryWeapons.indexOf(removed),1);
            }

            if (second) {
            const added = await Weapon.findOne({name:second});
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
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteAndUpdateOperatorSecondaryWeapon = deleteAndUpdateOperatorSecondaryWeapon;

const deleteAndUpdateUtility = async(req,res) => {
    if (req.user) {
        try {
            const {first, second} = req.body;
            const operator = await Operator.findById(req.params.id);
            
            if (first) {
                const removed = await Utility.findOne({name:first});
                operator.utility.splice(operator.utility.indexOf(removed),1);
            }

            if (second) {
            const added = await Utility.findOne({name:second});
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
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteAndUpdateUtility = deleteAndUpdateUtility;

const deleteOperator = async(req, res) => {
    if (req.user) {
        try {
            await Operator.findByIdAndDelete(req.params.id);

            return res.status(200).json("Operator successfully deleted");
        } catch(err) {
            console.log(err);
        }
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteOperator = deleteOperator;