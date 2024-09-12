import express from 'express'
import Authcontrollers from '../controllers/auth.js'

const api = express.Router()

api.post("/auth/register", Authcontrollers.register)
api.post("/auth/login", Authcontrollers.login)

//TODO hacer un middleware para el login 

export default api;