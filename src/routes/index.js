const { Router } = require('express');
const router = Router();
const { filtroLogeado } = require('../lib/proteccion');
 

router.get('/', filtroLogeado , (req,res) => {
    req.logOut();
    res.render('inicio')
});

module.exports = router;
