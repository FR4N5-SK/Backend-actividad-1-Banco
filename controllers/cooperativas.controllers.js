const { grupos_cooperativas } = require("../database/db");
const { v4: uuidv4 } = require('uuid');
const { programacion_fechas } = require("../database/fechas");

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

    //metodo para crear grupos de cooperativa
    crear(cuenta_nueva) {
        return new Promise((resolve, reject) => {
            try {
                let {pago_cuotas, cuotas_totales, dias_entre_cuotas, fecha_iniciar} = cuenta_nueva;
                if (!pago_cuotas || !cuotas_totales || !dias_entre_cuotas || !fecha_iniciar) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                let nuevo = {
                    balance: 0,
                    pago_cuotas: Number(pago_cuotas), 
                    cuotas_totales: Number(cuotas_totales),
                    dias_entre_cuotas: Number(dias_entre_cuotas),
                    id: uuidv4(),
                    fechas: programacion_fechas(fecha_iniciar, Number(dias_entre_cuotas), Number(cuotas_totales))
                }
                grupos_cooperativas.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar grupo de cooperativa",
                    data: nuevo
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new CooperativasC();