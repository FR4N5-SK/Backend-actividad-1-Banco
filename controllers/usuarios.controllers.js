const { busqueda } = require("../database/busqueda");
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

    //metodo para crear usuarios
    crear(usuario_nuevo) {
        return new Promise((resolve, reject) => {
            try {
                let {nombre, apellido, clave, usuario} = usuario_nuevo;
                if (!nombre || !apellido || !clave || !usuario) {
                    return reject("Revisa nuevamente el manuel, te falta propiedades")
                }
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario) {
                        return reject("Ya existe el usuario")
                    }
                }
                let nuevo = {
                    nombre: nombre, 
                    apellido: apellido, 
                    clave: clave, 
                    usuario: usuario
                }
                usuarios.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar usuario",
                    data: nuevo
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Peticion para editar
    editar(edicion, usuario) {
        return new Promise((resolve, reject) => {
            try {
                let {error, data, id} = busqueda(usuarios, usuario)
                let {nombre, apellido, clave} = edicion
                if (!nombre || !apellido || !clave) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (error) {
                    return reject("No existe el usuario")
                }
                data.nombre = nombre
                data.apellido = apellido
                data.clave = clave
                usuarios.splice(id, 1);
                usuarios.push(data);
                return resolve({
                    mensaje: "Peticion realizado con exito para editar usuario",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new UsuariosC();