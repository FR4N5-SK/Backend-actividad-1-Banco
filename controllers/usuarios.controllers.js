const { usuarios } = require("../database/db");

class UsuariosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (usuarios.length === 0) {
                    return resolve("No hay registrado ningun usuario")
                }
                return resolve({
                    mensaje: "Peticion de mostrar usuarios completada",
                    data: usuarios
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new UsuariosC();