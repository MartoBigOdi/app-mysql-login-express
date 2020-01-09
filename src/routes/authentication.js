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

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', passport.authenticate('login.local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    }),
);

router.get('/profile' ,(req, res) => {
    res.render('profile');//Como no esta en ninguna carpeta le pasamos directamente el nombre 'profile'.
})

module.exports = router;