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
    try {
        const {name, image, operators, sights, damage, rof} = req.body;
        const weapon = new Weapon();
        weapon.name = name;
        weapon.image = image;
        // for (let i = 0; i < operators.length; i++) {
        //     let operator = Operator.findById(operators[i]);
        //     weapon.operators.push(operator);
        // };
        weapon.sights = sights;
        weapon.damage = damage;
        weapon.rof = rof;

        weapon.save()
            .catch((err) => {
                console.log(err.message);
            });

        return res.status(200).json(weapon);
    } catch(err) {
        console.log(err);
    };
};

exports.createWeapon = createWeapon;

const updateWeaponNoClass = async(req, res) => {
    try {
        const {name, image, sights, damage, rof} = req.body;
        const fields = {name, image, sights, damage, rof};

        const weapon = await Weapon.findByIdAndUpdate(req.params.id, fields, { new: true });

        return res.status(200).json(weapon);

    } catch(err) {
        console.log(err);
    };
};

exports.updateWeaponNoClass = updateWeaponNoClass;

const deleteAndUpdateOperator = async(req, res) => {
    try {
        const {first, second} = req.body;
        const weapon = await Weapon.findById(req.params.id);
        const removed = await Operator.findById(first);

        weapon.operators.splice(weapon.operators.indexOf(removed),1);

        if (second) {
            const added = await Operator.findById(second);
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
};

exports.deleteAndUpdateOperator = deleteAndUpdateOperator;

const deleteWeapon = async(req, res) => {
    try {
        await Weapon.findByIdAndDelete(req.params.id);

        return res.status(200).json("Weapon successfully deleted");
    } catch(err) {
        console.log(err);
    };
};

exports.deleteWeapon = deleteWeapon;