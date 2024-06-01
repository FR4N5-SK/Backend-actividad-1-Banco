const { grupos_cooperativas } = require("../database/db");

class CooperativasC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (grupos_cooperativas.length === 0) {
                    return resolve("No hay registrado ningun grupo de cooperativa")
                }
                return resolve({
                    mensaje: "Peticion de mostrar los grupos de cooperativas completada",
                    data: grupos_cooperativas
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new CooperativasC();