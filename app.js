import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import constants from './constants.js';

const app = express()

//Import routings
import authRoutes from './routers/auth.js' 

//Configuracion del body parse para poder mandar contenido json en el body
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

//Conf de estaticos
app.use(express.static("uploads"))

//Conf CORS 
app.use(cors())

//Conf routes
app.use(`/api/${constants.API_VERSION}`, authRoutes)

export default app;