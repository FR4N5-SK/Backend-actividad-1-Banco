var express = require('express');
const ahorrosControllers = require('../controllers/ahorros.controllers');
var router = express.Router();

// Mostrar todas las cuentas de ahorros
router.get('/', function(req, res, next) {
  ahorrosControllers.mostrar()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      cuentas: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

module.exports = router;
