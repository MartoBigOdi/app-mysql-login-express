const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { estalogeado, filtroLogeado } = require('../lib/proteccion');



router.get('/registro', filtroLogeado ,(req, res) => {
    res.render('auth/registroDeUsuario')
});

router.post('/registro', passport.authenticate('registro.local', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true,
    }),
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/login', filtroLogeado ,(req, res) => {
    res.render('auth/login')
});

router.post('/login', passport.authenticate('login.local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    }),
);


router.get('/profile', estalogeado ,(req, res) => {
    res.render('profile');//Como no esta en ninguna carpeta le pasamos directamente el nombre 'profile'.
})

module.exports = router;
