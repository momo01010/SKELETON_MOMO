const router = require('express').Router()
const passport = require('passport')


const userServices = require('./users.services')

require('../middlewares/auth.middleware')(passport)



//? rutas raiz

router.get('/',
 passport.authenticate('jwt', {session: false}),
 userServices.getAllUsers)




//? ruta de informacion propia del usuario loggeado
router.route('/me')
    .get(
        passport.authenticate('jwt, {session: false}'),
        userServices.getMyUser)
    .patch(
         passport.authenticate('jwt', {session: false}),
         userServices.updateMyUser
    )
   .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteMyUser
    )


//? rutas dinamicas por id
router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)





module.exports = router