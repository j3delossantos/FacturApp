const express= require('express');
const router = express.Router();

//GET  page.
router.get('/clients', function(req, res, next) {
    res.render('clients/clientsList', { title: 'FacturApp' });
  });


module.exports = router; 