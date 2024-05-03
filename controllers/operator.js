const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Operator = require('../models/operators')


module.exports = (app) => {
   // Operator Controller

//localhost/operators/Zofia

   const showOperators = async(req, res) => {
    let operators = 
    ((req.body).length === 0 ) ? await Operator.find() :
    ((req.body) === Number) ? await Operator.findById(req.body) : 
    ((req.body) === String) ? await Operator.findOne({name: req.body}) : ''

    return res.status(200).json(operators)
   }
   
   const createOperator = async(req, res) => {
    const {name, image, gadget, primaryWeapons, secondaryWeapons, utility, side, faction} = req.body;
    const operator = new Operator();
    operator.name = name;
    operator.image = image;
    operator.gadget = gadget;
    operator.primaryWeapons = primaryWeapons.map()
    operator.secondaryWeapons = secondaryWeapons.map()
    operator.utility = utility.map()
    operator.side = side;
    operator.faction = faction.map()
        // Operator mongo thing
        // .save() 

        return res.status(200).json(operator)
   }




  }