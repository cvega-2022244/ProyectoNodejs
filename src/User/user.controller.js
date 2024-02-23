'use strict'

import { encriptar,  verificarContraseña } from '../utils/validator.js'
import userModel from './user.model.js'

export const agregarUser = async(req,res)=>{
    try {
        let datos = req.body
        datos.contraseña = await encriptar(datos.contraseña)
        datos.rol = 'CLIENTE'
        let user = new userModel(datos)
        await user.save()
        return res.send({message: `Registrado ${user.rol} ${user.nombre} ` })
    } catch (err) {
       console.error(err)
       return res.status(500).send({message:'Error al agregar Usuario'}) 
    }
}


export const login = async(req,res)=>{
    try {
        let { usuario,contraseña} = req.body
        let user = await userModel.findOne({usuario})
       
        if(user && await verificarContraseña(contraseña, user.contraseña)){
            let usuarioLogeado = {
                usuario : user.usuario,
                nombre : user.nombre,
                rol : user.rol,
               
            }
           
            return  res.send({message: `Bienvenido ${user.nombre} `,usuarioLogeado })
        }
        return res.status(404).send({message: 'Contraseña o usuario incorrectos'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar secion'})
    }
}

