const { grupos_cooperativas, usuarios, relacion_cooperativas } = require("../database/db");
const { v4: uuidv4 } = require('uuid');
const { programacion_fechas } = require("../database/fechas");
const { busqueda } = require("../database/busqueda");

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
                let { pago_cuotas, cuotas_totales, dias_entre_cuotas, fecha_iniciar } = cuenta_nueva;
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

    // Peticion para editar
    editar(edicion, cuenta) {
        return new Promise((resolve, reject) => {
            try {
                let { error, data, id } = busqueda(grupos_cooperativas, cuenta)
                console.log(data)
                let { balance, pago_cuotas, cuotas_totales } = edicion
                if (!balance || !pago_cuotas || !cuotas_totales) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (error) {
                    return reject("No existe la cooperativa")
                }
                data.balance = Number(balance)
                data.pago_cuotas = Number(pago_cuotas)
                data.cuotas_totales = Number(cuotas_totales)
                data.fechas = programacion_fechas(data.fechas[0], Number(data.dias_entre_cuotas), Number(cuotas_totales))
                grupos_cooperativas.splice(id, 1);
                grupos_cooperativas.push(data);
                return resolve({
                    mensaje: "Peticion realizado con exito para editar el grupo de cooperativa",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    relacionar(usuario, cooperativa) {
        return new Promise((resolve, reject) => {
            try {
                let res_usuario = busqueda(usuarios, usuario)
                let res_cooperativa = busqueda(grupos_cooperativas, cooperativa)
                if (res_usuario.error) {
                    return reject("No existe el usuario")
                }
                if (res_cooperativa.error) {
                    return reject("No existe la cooperativa")
                }
                let relacion = {
                    usuario: usuario,
                    grupo_cooperativa: cooperativa,
                    cuotas_pagadas: 0
                }
                relacion_cooperativas.push(relacion)
                return resolve({
                    mensaje: "Se completo con exito la peticion de relacionar cooperativa con usuario",
                    data: relacion
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new CooperativasC();