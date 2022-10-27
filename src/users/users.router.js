const router = require('express').Router()
const passport = require('passport')

const adminValidate = require('../middlewares/role.middleware')
const userServices = require('./users.services')

require('../middlewares/auth.middleware')(passport)



//? rutas raiz

router.get('/',
 passport.authenticate('jwt', {session: false}),
 userServices.getAllUsers)




//? ruta de informacion propia del usuario loggeado
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser)
    .patch(
         passport.authenticate('jwt', {session: false}),
         adminValidate,
         userServices.updateMyUser
    )
   .delete(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.deleteMyUser
    )


//? rutas dinamicas por id
router.route('/:id')
        .get(userServices.getUserById)
        .patch(
            adminValidate,
            passport.authenticate('jwt', {session: false}),
            userServices.patchUser
            )
        .delete(
            adminValidate,
            passport.authenticate('jwt', {session: false}),
            userServices.deleteUser
        )


module.exports = router