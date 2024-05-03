const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operators')
const Weapon = require('../models/weapon')
const Utility = require('../models/utility')
const Faction = require('../models/faction')


module.exports = (app) => {
   // Operator Controller

    const showOperators = async(req, res) => {
        const operators = await Operator.find()
        return res.status(200).json(operators)
    }
    exports.showOperator = showOperators;

    const showOneOperator = async(req, res) => {
        const operators = 
        ((parseInt(req.params)) === Number) ? await Operator.findById(req.body) : 
        ((req.params) === String) ? await Operator.findOne({name: req.body}) : ''
        
        if (!operators) {
            return res.status(200).json(operators)
        } else {
            return res.status(400).json({message: "This operator does not exist"})
        }
        }
    exports.showOneOperator = showOneOperator;

    const createOperator = async(req, res) => {
        const {name, image, gadget, primaryWeapons, secondaryWeapons, utility, side, faction} = req.body;
        const operator = new Operator();
        operator.name = name;
        operator.image = image;
        operator.gadget = gadget;
        for (let i = 0; i < primaryWeapons.length; i++) {
            let weapon = Weapon.findById(primaryWeapons[i]);
            operator.primaryWeapons.push(weapon);
        }
        for (let i = 0; i < secondaryWeapons.length; i++) {
            let weapon = Weapon.findById(secondaryWeapons[i]);
            operator.secondaryWeapons.push(weapon);
        }
        for (let i = 0; i < utility.length; i++) {
            let util = Utility.findById(utility[i]);
            operator.utility.push(util)
        }
        operator.side = side;
        operator.faction = Faction.findById(faction)

        operator.save()
                .catch((err) => {
                    console.log(err.message)
                })

        return res.status(200).json(operator)
    }
    exports.createOperator = createOperator;

    const updateOperator = async(req, res) => {
        const hello = 'helloi∂'
    }
  }