const { showFaction,
        showFactionByName,
        showFactionById,
        createFaction,
        updateFactionNoClass,
        deleteAndUpdateOperator,
        deleteFaction}
        = require('../controllers/faction');
const express = require('express');

const router = express.Router();

const base = '/faction';

router.get(`${base}`, showFaction);
router.post(`${base}/name/:name`, showFactionByName);
router.post(`${base}/id/:id`, showFactionById);
router.post(`${base}/create`, createFaction);
router.put(`${base}/update/:id`, updateFactionNoClass);
router.put(`${base}/update/operator/:id`, deleteAndUpdateOperator);
router.delete(`${base}/delete/:id`, deleteFaction);

module.exports = router;