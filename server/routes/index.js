var express = require('express');
var router = express.Router();
const bookingApi = require('../api/bookingApi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', async function (req, res) {
  res.send(await bookingApi.get());
})

module.exports = router;
