const { DataTypes } = require('sequelize')
const { getUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')



const loginUser = async (email, password) => {
    //*este controlador tiene 2 posibles respuestas
    //*1 las credenciales son validas y retornamos el usuario
    //* 2 las credenciales son invalidas y retorna false
    try {
        const user = await getUserByEmail(email)
        //? user.pasword contiene la contraseña encriptada de mi base de datos
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
        return false
    } catch {
        return false
    }
}

module.exports = {
    loginUser
}