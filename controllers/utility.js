const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operator');
const Utility = require('../models/utility')

const showUtility = async(req, res) => {
    try {
        const utility = await Utility.find();
        return res.status(200).json(utility);
    } catch(err) {
        console.log(err);
    };
};

exports.showUtility = showUtility;

const showUtilityByName = async(req, res) => {
    try {
        const utility = await Utility.findOne({name: req.params.name});

        if (!utility) {
            return res.status(400).json({message: "This Utility does not Exist"});
        } else {
            return res.status(200).json(utility);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showUtilityByName = showUtilityByName;

const showUtilityById = async(req, res) => {
    try {
        const utility = await Utility.findById(req.params.id)

        if (!utility) {
            return res.status(400).json({message: "This Utility does not Exist"});
        } else {
            return res.status(200).json(utility);
        };
    } catch(err) {
        console.log(err);
    };
};

exports.showUtilityById = showUtilityById;

const createUtility = async(req, res) => {
    try {
        const {name, image, operators, side, purpose} = req.body;
        const utility = new Utility();
        utility.name = name;
        utility.image = image;
        if (operators) {
            for (let i = 0; i < operators.length; i++) {
                let operator = Operator.findById(operators[i]);
                utility.operators.push(operator);
            };
        };
        utility.side = side
        utility.purpose = purpose;

        await utility.save()
            .catch((err) => {
                console.log(err.message);
            });

        return res.status(200).json(utility);
    } catch(err) {
        console.log(err);
    };
};

exports.createUtility = createUtility;

const updateUtilityNoClass = async(req, res) => {
    try {
        const {name, image, side, purpose} = req.body;
        const fields = {name, image, side, purpose};

        const utility = await Utility.findByIdAndUpdate(req.params.id, fields, { new: true});

        return res.status(200).json(utility);

    } catch(err) {
        console.log(err);
    };
};

exports.updateUtilityNoClass = updateUtilityNoClass;

const deleteAndUpdateOperator = async(req, res) => {
    try {
        const {first, second} = req.body;
        const utility = await Utility.findById(req.params.id);
        
        if (first) {
            const removed = await Operator.findById(first);
            utility.operators.splice(utility.operators.indexOf(removed),1);
        };

        if (second) {
            const added = await Operator.findById(second);
            utility.operators.push(added);
        };

        utility.save()
            .catch((err) => {
                console.log(err.message);
            });

        return res.status(200).json(utility);
    } catch(err) {
        console.log(err);
    };
};

exports.deleteAndUpdateOperator = deleteAndUpdateOperator;

const deleteUtility = async(req, res) => {
    try {
        await Utility.findByIdAndDelete(req.params.id);

        return res.status(200).json("Utility successfully deleted");
    } catch(err) {
        console.log(err);
    };
};

exports.deleteUtility = deleteUtility;
