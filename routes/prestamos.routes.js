var express = require('express');
const prestamosControllers = require('../controllers/prestamos.controllers');
var router = express.Router();

// Mostrar todas las cuentas de prestamos
router.get('/', function(req, res, next) {
  prestamosControllers.mostrar()
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
