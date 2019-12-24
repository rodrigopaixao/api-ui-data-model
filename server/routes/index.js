var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');

router.get('/', function (req, res, next) {
  res.json({api: '1.0.0'})
});

router.get('/products', function (req, res, next) {

  const products = [
    {id: 'b1c46c88-4e59-481f-8ff9-48fbce22df34', name: 'Product A', price: 100, status: 'active'},
    {id: 'ce0d5701-c4e2-43b2-a511-8d98338140a0', name: 'Product B', price: 200, status: 'inactive'},
    {id: 'bb429607-68f0-43ac-b7ab-30cba5bc46e0', name: 'Product C', price: 300, status: 'active'}
  ];

  res.json(products);
});

router.put('/products', function (req, res, next) {

  switch (req.body.id) {
    case 'b1c46c88-4e59-481f-8ff9-48fbce22df34':
      res.json({
        status: 200,
        message: req.body.name + ' was updated successfully'
      });
      break;
    case 'ce0d5701-c4e2-43b2-a511-8d98338140a0':
      res.status(400).send({
        status: 400,
        message: 'Bad request'
      });
      break;
    case 'bb429607-68f0-43ac-b7ab-30cba5bc46e0':
      res.status(500).send({
        status: 500,
        message: 'Server Request'
      });
      break;
    default:
      res.json({message: 'Success', data: req.body});
  }
});

router.post('/products', function (req, res, next) {
  const obj = req.body;
  obj.id = uuidv1();

  res.json({
    message: req.body.name + ' is now created',
    data: obj
  });
});

module.exports = router;
