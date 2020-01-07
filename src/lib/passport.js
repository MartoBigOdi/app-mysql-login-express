//Acá, con estos módulos vamos a hacer las auth que elegimmos. 
const passport = require('passport');
//Acá elegimos la estrategia Local.
const LocalStrategy = require('passport-local').Strategy;
//Acá requirimos la base de datos.
const pool = require('../database');
const helpers = require('../lib/helpers');

//Acá elegimos la estrategia con la cual nos vamos a registrar, en este caso la estrategia es LOCAL(Vamos a usar nuestra de base de datos), Instanciamos new LocalStrategy para crear el objeto.
//passport.use()---> tiene dos parametros, el nombre de la estrategia y el tipo de estrategia que vamos a utilizar que es un objeto instanciado.
passport.use('registro.local', new LocalStrategy({
        //Estos datos son los que vamos a recibir desde el front para hacer la AUTH. Si deseamos utilizar más datos solamenete tenemos que agregarlos acá dentro de la AUTH.
        usernameField:'username',
        passwordField:'password',
        passReqToCallback: true
}, async (req, username, password, done) => { //En este callback no olvidarse de pasar el 'done' para que siga ejecutando lo que sigue en el servidor.
        const { cargo, fullname } = req.body; //Los busco desde el req.body porque no los estoy pidiendo dsd el parametro de la estrategia. 
        const newUser = {
                username,
                password,
                fullname,
                cargo,
        };
        //Acá ciframos la contraseña con el método que traemos desde el 'lib/helpers'.
        newUser.password = await helpers.encryptPassword(password);
        //Acá estamos 'INSERT INTO a la tabla 'users'' el nuevo user que instanciamos con los datos recibidos. 
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        console.log(result);
}));

//La documentaciñon de passport índica que necesitamos hacer pasos más una vez hecha la estrategia, primero serializar y luego deserializar.
//passport.serializeUser((user, done) => {
        
//});

