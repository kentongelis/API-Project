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
            return res.status(200).json(faction);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showFactionById = showFactionById;

const createFaction = async(req, res) => {
    if (req.user) {
        try {
            const {name, image, operators} = req.body;
            const faction = new Faction();
            faction.name = name;
            faction.image = image;
            if (operators) {
                for (let i = 0; i < operators.length; i++) {
                    let operator = Operator.findOne({name:operators[i]});
                    faction.operators.push(operator);
                };
            };

            await faction.save()
                .catch((err) => {
                    console.log(err.message);
                });
                
            return res.status(200).json(faction);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.createFaction = createFaction;

const updateFactionNoClass = async(req, res) => {
    if (req.user) {
        try {
            const {name, image} = req.body;
            const fields = {name, image};

            const faction = await Faction.findByIdAndUpdate(req.params.id, fields, { new: true});

            return res.status(200).json(faction);
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.updateFactionNoClass = updateFactionNoClass;

const deleteAndUpdateOperator = async(req, res) => {
    if (req.user) {
        console.log(req.body)
        try {
            const {first, second} = req.body;
            const faction  = await Faction.findById(req.params.id).populate("operators");

            if (first) {
                const removed = await Operator.findOne({name:first});
                faction.operators.splice(faction.operators.indexOf(removed), 1);
            }

            if (second) {
                const added = await Operator.findOne({name:second});
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
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteAndUpdateOperator = deleteAndUpdateOperator;

const deleteFaction = async(req, res) => {
    if (req.user) {
        try {
            await Faction.findByIdAndDelete(req.params.id);

            return res.status(200).json("Faction successfully deleted");
        } catch(err) {
            console.log(err);
        };
    } else {
        return res.status(401).json("Please log in or sign up to complete this action");
    };
};

exports.deleteFaction = deleteFaction;