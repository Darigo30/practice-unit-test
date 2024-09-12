//AccesToken y RefreshToken 

import jsonwebtoken from 'jsonwebtoken'
import {JWT_SECRETE_KEY } from '../constants.js'

//Funcion para que el token caduque cada 3 horas

function createAccesToken(user) {
    const expToken = new Date()
    expToken.setHours(expToken.getHours() + 3)

    const payload = {
        token_type: "acces",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }
    return jwt.sign(payload, JWT_SECRETE_KEY)
}

//Refresco el createAccesToken, cuando caduque la sesion ha expirado despues de 1 mes

function createRefreshToken(user) {
    const expToken = new Date()
    expToken.getMonth(expToken.getMonth() + 1)

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }
    return jwt.sign(payload, JWT_SECRETE_KEY)
}

//Funcion que decodifica el token

function decoded(token) {
    return jwt.decode(token, JWT_SECRETE_KEY, true)
}

export default {
    createAccesToken,
    createRefreshToken,
    decoded
}