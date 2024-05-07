const { showWeapons,
        showOneWeapon,
        createWeapon,
        updateWeaponNoClass,
        deleteAndUpdateOperator,
        deleteWeapon} 
    = require('../controllers/weapon');
const express = require('express')

const router = express.Router();

const base = '/weapon';

router.get(`${base}`, showWeapons);
router.post(`${base}/:search`, showOneWeapon);
router.post(`${base}/create`, createWeapon);
router.post(`${base}/update/:id`, updateWeaponNoClass);
router.post(`${base}/update/operator/:id`, deleteAndUpdateOperator);
router.delete(`${base}/delete/:id`, deleteWeapon);

module.exports = router;
