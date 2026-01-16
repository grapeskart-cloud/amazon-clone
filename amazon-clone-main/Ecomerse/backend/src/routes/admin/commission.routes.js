const express = require('express');
const router = express.Router();

const {
  createCommission,
  getCommissions,
  updateCommission,
  deleteCommission
} = require('../../controller/admin/commission.controller');

router.post('/', createCommission);
router.get('/', getCommissions);
router.put('/:id', updateCommission);
router.delete('/:id', deleteCommission);

module.exports = router;
