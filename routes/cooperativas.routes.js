var express = require('express');
const cooperativasControllers = require('../controllers/cooperativas.controllers');
var router = express.Router();

// Mostrar todos los grupos de cooperativas
router.get('/', function(req, res, next) {
  cooperativasControllers.mostrar()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      grupos: respuesta.data
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
