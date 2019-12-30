const { Router } = require('express');
const router = Router();

//Este pool hace referencia a la base de datos.
const pool = require('../database');

router.get('/agregar', (req, res) => {
    res.render('follow/agregar');
});

router.post('/agregar', (req, res) => {
    res.send('Recibido');
});

module.exports = router;