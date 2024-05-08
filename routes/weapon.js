const { showWeapons,
        showWeaponByName,
        showWeaponById,
        createWeapon,
        updateWeaponNoClass,
        deleteAndUpdateOperator,
        deleteWeapon} 
    = require('../controllers/weapon');
const express = require('express')

const router = express.Router();

const base = '/weapon';

router.get(`${base}`, showWeapons);
router.post(`${base}/name/:name`, showWeaponByName);
router.post(`${base}/id/:id`, showWeaponById);
router.post(`${base}/create`, createWeapon);
router.put(`${base}/update/:id`, updateWeaponNoClass);
router.put(`${base}/update/operator/:id`, deleteAndUpdateOperator);
router.delete(`${base}/delete/:id`, deleteWeapon);

module.exports = router;
