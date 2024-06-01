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
}

module.exports = new UsuariosC();