const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operator');
const Weapon = require('../models/weapon');

const showWeapons = async(req, res) => {
    try {
        const weapons = await Weapon.find();
        return res.status(200).json(weapons);
    } catch(err) {
        console.log(err);
    };
};

exports.showWeapons = showWeapons;

const showWeaponByName = async(req, res) => {
    try {
        const weapon =  await Weapon.findOne({name: req.params.name});
        
        if (!weapon) {
            return res.status(400).json({message: "This Weapon does not exist"});
        } else {
            return res.status(200).json(weapon);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showWeaponByName = showWeaponByName;

const showWeaponById = async(req, res) => {
    try {
        const weapon = await Weapon.findById(req.params.id);

        if (!weapon) {
            return res.status(400).json({message: "This Weapon does not exist"});
        } else {
            return res.status(200).json(weapon);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showWeaponById = showWeaponById;

const createWeapon = async(req, res) => {
    if (req.user) {
        try {
            const {name, image, operators, sights, damage, rof} = req.body;
            const weapon = new Weapon();

            const testWeapon =  await Weapon.findOne({name: name});
            if (testWeapon) {
                return res.status(400).json({message: "This weapon already exists"})
            }

            weapon.name = name;
            weapon.image = image;
            if (operators) {
                for (let i = 0; i < operators.length; i++) {
                    let operator = await Operator.findOne({name:operators[i]});
                    weapon.operators.push(operator);
                };
            ;}
            weapon.sights = sights;
            weapon.damage = damage;
            weapon.rof = rof;

            await weapon.save()
                .catch((err) => {
                    console.log(err.message);
                });

            return res.status(200).json(weapon);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.createWeapon = createWeapon;

const updateWeaponNoClass = async(req, res) => {
    if (req.user) {
        try {
            const {name, image, sights, damage, rof} = req.body;
            const fields = {name, image, sights, damage, rof};

            const weapon = await Weapon.findByIdAndUpdate(req.params.id, fields, { new: true });

            return res.status(200).json(weapon);

        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.updateWeaponNoClass = updateWeaponNoClass;

const deleteAndUpdateOperator = async(req, res) => {
    if (req.user) {
        try {
            const {first, second} = req.body;
            const weapon = await Weapon.findById(req.params.id);

            if (first) {
                const removed = await Operator.findOne({name:first});
                weapon.operators.splice(weapon.operators.indexOf(removed),1);
            };

            if (second) {
                const added = await Operator.findOne({name:second});
                weapon.operators.push(added);
            }

            weapon.save()
                .catch((err) => {
                    console.log(err.message);
                });

            return res.status(200).json(weapon);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteAndUpdateOperator = deleteAndUpdateOperator;

const deleteWeapon = async(req, res) => {
    if (req.user) {
        try {
            await Weapon.findByIdAndDelete(req.params.id);

            return res.status(200).json("Weapon successfully deleted");
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteWeapon = deleteWeapon;