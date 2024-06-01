const { cuentas_ahorro } = require("../database/db");

class AhorrosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (cuentas_ahorro.length === 0) {
                    return resolve("No hay registrado ninguna cuenta de ahorro")
                }
                return resolve({
                    mensaje: "Peticion de mostrar cuentas de ahorro completada",
                    data: cuentas_ahorro
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new AhorrosC();