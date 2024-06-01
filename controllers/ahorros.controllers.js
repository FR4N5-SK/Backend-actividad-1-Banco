const { cuentas_ahorro } = require("../database/db");
const { v4: uuidv4 } = require('uuid');

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

    //metodo para crear cuenta ahorro
    crear(cuenta_nueva) {
        return new Promise((resolve, reject) => {
            try {
                let {balance, interes, usuario} = cuenta_nueva;
                if (!balance || !interes || !usuario) {
                    return reject("Revisa nuevamente el manuel, te falta propiedades")
                }
                for (let i = 0; i < cuentas_ahorro.length; i++) {
                    if (cuentas_ahorro[i].usuario === usuario) {
                        return reject("Ya el usuario tiene una cuenta de ahorro usuario")
                    }
                }
                let nuevo = {
                    balance: Number(balance), 
                    interes: Number(interes),
                    tasa_interes: Number(((interes / 360) * balance).toFixed(2)), 
                    usuario: usuario,
                    id: uuidv4()
                }
                cuentas_ahorro.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar cuenta de ahorro",
                    data: nuevo
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new AhorrosC();