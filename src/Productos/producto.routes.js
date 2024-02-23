'use strict'
import  Express  from "express"
import { actulizarProducto, agregarProducto, eliminarProducto, listaNombre, listar, listarCategoria, test } from "./producto.controller.js"

const api  = Express.Router()

api.get('/testProducto',test)
api.get('/listar',listar)
api.post('/listarPorCategoria',listarCategoria)
api.post('/listarPorNombre',listaNombre)
api.post('/agregar',agregarProducto)
api.put('/actualizar/:id',actulizarProducto)
api.delete('/eliminar/:id',eliminarProducto)



export default api