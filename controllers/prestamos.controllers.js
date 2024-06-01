const { cuentas_prestamos } = require("../database/db");

class PrestamosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (cuentas_prestamos.length === 0) {
                    return resolve("No hay registrado ninguna cuenta de prestamos")
                }
                return resolve({
                    mensaje: "Peticion de mostrar las cuentas de prestamos completada",
                    data: cuentas_prestamos
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new PrestamosC();