var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/stylesheets/style.html', function (req, res) {
  res.send('haha')
})
router.get('/adc', function (req, res, next) {
  let vard = {
    cheng: 1,
    yang: 2
  }
  console.log(req.params)
  console.log(req.query)
  res.send(vard);

});



module.exports = router;
