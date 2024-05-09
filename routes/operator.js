const { showOperators, 
        showOperatorByName, 
        showOperatorById,
        createOperator,
        updateOperatorNoClass,
        updateOperatorFaction,
        deleteAndUpdateOperatorPrimaryWeapon,
        deleteAndUpdateOperatorSecondaryWeapon,
        deleteAndUpdateUtility,
        deleteOperator} 
    = require('../controllers/operator');
const express = require('express');

// import any middleware

// create routes
const router = express.Router();

const base = '/operator';

router.get(`${base}`, showOperators);
router.post(`${base}/create`, createOperator);
router.post(`${base}/name/:name`, showOperatorByName);
router.post(`${base}/id/:id`, showOperatorById);
router.put(`${base}/update/:id`, updateOperatorNoClass);
router.put(`${base}/update/primary/:id`, deleteAndUpdateOperatorPrimaryWeapon);
router.put(`${base}/update/secondary/:id`, deleteAndUpdateOperatorSecondaryWeapon);
router.put(`${base}/update/utility/:id`, deleteAndUpdateUtility);
router.put(`${base}/update/faction/:id`, updateOperatorFaction);
router.delete(`${base}/delete/:id`, deleteOperator);

module.exports = router;