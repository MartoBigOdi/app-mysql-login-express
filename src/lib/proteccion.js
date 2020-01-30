

module.exports = {
    estalogeado(req, res, next) { //Para descartar que pueda hacer algo en el sistema sin estar logeado.
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    filtroLogeado(req, res ,next) { //Para ver las rutas que le interesa cuando este logeado. O sea el usuario no va a ver ningun link donde haya un formulario. 
        if (!req.isAuthenticated()) { 
            return next();
        }
        return res.redirect('/profile');
    },
    //Filtro Para la ruta del ADMIN, Solo el req.user.cargo == 'Subgerente Operativo' (O lo que le pasemos por la propiedad del objeto req.) puede acceder.
    admin(req, res, next){
        if(req.user.cargo == 'Subgerente Operativo' || req.user.cargo == 'Directora' || req.user.cargo == 'Gerente Operativo' || req.user.cargo == 'Coordinador de Datos') {
            return next();
        }
        return res.redirect('/profile');
    }

};

