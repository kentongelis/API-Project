const { showUtility,
        showUtilityByName,
        showUtilityById,
        createUtility,
        updateUtilityNoClass,
        deleteAndUpdateOperator,
        deleteUtility}
        = require('../controllers/utility');
const express = require('express');

const router = express.Router();

const base = '/utility';

router.get(`${base}`, showUtility);
router.post(`${base}/name/:name`, showUtilityByName);
router.post(`${base}/id/:id`, showUtilityById);
router.post(`${base}/create`, createUtility);
router.put(`${base}/update/:id`, updateUtilityNoClass);
router.put(`${base}/update/operator/:id`, deleteAndUpdateOperator);
router.delete(`${base}/delete/:id`, deleteUtility);

module.exports = router;