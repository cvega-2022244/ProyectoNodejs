'use strict'

import  Express  from "express"
import { actulizarCategoria, porDefecto,agregarCategoria, eliminarCategoria, listarCategoria, test } from "./categoria.controller.js"

const api = Express.Router()


api.get('/test', test)
api.get('/listar',listarCategoria)
api.post('/agregar',agregarCategoria)
api.put('/actualizar/:id',actulizarCategoria)
api.delete('/eliminar/:id',eliminarCategoria)
export default api