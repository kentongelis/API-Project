const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operator');
const Faction = require('../models/faction');

const showFaction = async(req, res) => {
    try {
        const faction = await Faction.find();
        return res.status(200).json(faction);
    } catch(err) {
        console.log(err);
    };
};

exports.showFaction = showFaction;

const showFactionByName = async(req, res) => {
    try {
        const faction = await Faction.findOne({name: req.params.name});

        if (!faction) {
            return res.status(400).json({message: "This Faction does not Exist"})
        } else {
            return res.status(200).json(faction);
        };
    } catch(err) {
        console.log(err)
    };
};

exports.showFactionByName = showFactionByName;

const showFactionById = async(req, res) => {
    try {
        const faction = await Faction.findById(req.params.id);

        if (!faction) {
            return res.status(400).json({message: "This Faction does not Exist"});
        } else {
            return res.status(200).json(utility);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showFactionById = showFactionById;

const createFaction = async(req, res) => {
    try {
        const {name, image, operators} = req.body;
        const faction = new Faction();
        faction.name = name;
        faction.image = image;
    //     for (let i = 0; i < operators.length; i++) {
    //         let operator = Operator.findById(operators[i]);
    //         faction.operators.push(operator);
    //     };

        faction.save()
            .catch((err) => {
                console.log(err.message);
            });
            
        return res.status(200).json(faction);
    } catch(err) {
        console.log(err);
    };
};

exports.createFaction = createFaction;

const updateFactionNoClass = async(req, res) => {
    try {
        const {name, image} = req.body;
        const fields = {name, image};

        const Ffction = await Faction.findByIdAndUpdate(req.params.id, fields, { new: true});

        return res.status(200).json(faction);
    } catch(err) {
        console.log(err);
    };
};

exports.updateFactionNoClass = updateFactionNoClass;

const deleteAndUpdateOperator = async(req, res) => {
    try {
        const {first, second} = req.body;
        const faction  = await Faction.findById(req.params.id);
        const removed = await Operator.findById(first);

        faction.operators.splice(faction.operators.indexOf(removed), 1);

        if (second) {
            const added = await Operator.findById(second);
        faction.operators.push(added);
        };

        faction.save()
            .catch((err) => {
                console.log(err.message);
            });

        return res.status(200).json(faction);
    } catch(err) {
        console.log(err);
    };
};

exports.deleteAndUpdateOperator = deleteAndUpdateOperator;

const deleteFaction = async(req, res) => {
    try {
        await Faction.findByIdAndDelete(req.params.id);

        return res.status(200).json("Faction successfully deleted");
    } catch(err) {
        console.log(err);
    };
};

exports.deleteFaction = deleteFaction;