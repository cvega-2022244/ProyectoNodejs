'use strict'
import { Router } from "express"
import {  agregarUser,  login } from "./user.controller.js"

const api = Router()

api.post('/registrar',agregarUser)
api.post('/login',login)



export default api