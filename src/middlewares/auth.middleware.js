//? middleware para proteger rutas


//* 1- revisar si existe token 
//* verificar si el token pertenece aun usuario
//* 3- modificar el req.user con la informacion desencriptada del token 

const {getUserById} = require('../users/users.controllers')
const {jwtSecret} = require('../config')
const JwtStrategy = require('passport-jwt').Strategy; //? passport maneja estrategias para las diferntes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt; //? exyrae los headers de la peticion

module.exports = (passport) => {
    const options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }

    passport.use(
        new JwtStrategy(options, async (decoded, done) =>{
            //? done(error, decoded)
            try{
                const response = await getUserById(decoded.id)
                if(!response){
                    return done(null, false)
                }
                console.log('decode JWT', decoded)
                return done(null, decoded)
            }catch (error) {
                return done(error, false)
            }
        } )
    )

}

