import bcryptjs from 'bcryptjs';
import User from '../models/user.js'
import jsonwebtoken from 'jsonwebtoken'

function register(req, res){
   const { firstname, lastname, password, email } = req.body
   
   if(!password) res.status(400).send({
    msg: "La contraseña es obligatoria"
   })

   const user = new User({
    firstname,
    lastname,
    password,
    email
   })

   const encryp = bcryptjs.genSaltSync(10)
   const hashPassword = bcryptjs.hashSync(password, encryp)
   user.password = hashPassword

   user.save((error, userStorage) => {
    if(error){
        res.status(400).send({
            msg: "Error al crear user"
        })
    } else{
        res.status(200).send({
            userStorage
        })
    }
   })
}

function login(req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send({ msg: "El email es obligatorio" });
    }

    if (!password) {
        return res.status(400).send({ msg: "La contraseña es obligatoria" });
    }

    const emailLowerCase = email.toLowerCase();

    // Buscar usuario por email
    User.findOne({ email: emailLowerCase }, (error, userStorage) => {
        if (error) {
            return res.status(500).send({ msg: "Error del servidor" });
        }

        // Verifica si el usuario existe
        if (!userStorage) {
            return res.status(404).send({ msg: "El usuario no existe" });
        }

        // Comparar la contraseña
        bcryptjs.compare(password, userStorage.password, (bcryptError, check) => {
            if (bcryptError) {
                return res.status(500).send({ msg: "Error del servidor" });
            }

            if (!check) {
                return res.status(400).send({ msg: "Contraseña incorrecta" });
            }

            if (!userStorage.active) {
                return res.status(401).send({ msg: "Usuario no autorizado o no activo" });
            }

            // Generar tokens si la contraseña es correcta y el usuario está activo
            return res.status(200).send({
                access: jsonwebtoken.createAccesToken(userStorage),
                refresh: jsonwebtoken.createRefreshToken(userStorage),
            });
        });
    });
}


export default {
    register,
    login
}