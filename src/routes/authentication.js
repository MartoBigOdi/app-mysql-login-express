const { Router } = require('express');
const router = Router();
const passport = require('passport');



router.get('/registro', (req, res) => {
    res.render('auth/registroDeUsuario')
});

router.post('/registro', passport.authenticate('registro.local', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true,
    }),
);

router.get('/profile' ,(req, res) => {
    res.send('Profile');
})

module.exports = router;