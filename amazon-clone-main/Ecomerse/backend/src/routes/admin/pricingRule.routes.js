const express = require('express');
const router = express.Router();

const {
  createPricingRule,
  getPricingRules,
  updatePricingRule,
  deletePricingRule
} = require('../../controller/admin/pricingRule.controller');

router.post('/', createPricingRule);
router.get('/', getPricingRules);
router.put('/:id', updatePricingRule);
router.delete('/:id', deletePricingRule);

module.exports = router;
