var express = require('express');
const usuariosControllers = require('../controllers/usuarios.controllers');
var router = express.Router();

// Mostrar todos los usuarios
router.get('/', function(req, res, next) {
  usuariosControllers.mostrar()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuarios: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Agregar Usuario
router.post('/', function(req, res, next) {
  usuariosControllers.crear(req.body)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuario_creado: respuesta.data
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
