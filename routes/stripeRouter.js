const express = require("express");
const router = express.Router();
const controller = require('../controllers/stripeController');

// router.get('/checkout'); // Commented out - no handler defined yet
router.post('/create-product', controller.createPrice);
router.get('/session-status', controller.getSessionStatus);
router.post('/create-checkout-session', controller.createCheckoutSession);

module.exports = router;