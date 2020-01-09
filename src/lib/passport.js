//Acá, con estos módulos vamos a hacer las auth que elegimmos. 
const passport = require('passport');
//Acá elegimos la estrategia Local.
const LocalStrategy = require('passport-local').Strategy;
//Acá requirimos la base de datos.
const pool = require('../database');
const helpers = require('../lib/helpers');

//Acá en el Log in hacemos algo muy parecido que en el registro solamente que que en este caso vamos a utiliår el 'herlpersMatchpass' para comparar la password que nos pasan con la que tenemos en la base de datos. 
passport.use('login.local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
}, async (req, username, password, done) => {
        console.log(req.body);
        //Acá hacemos la petición con la query para buscar la coincidencia con el username. 
        const filas = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if(filas.length > 0) { //Si es mayor a 0 significa que encontramos al usuario.
                const user = filas[0];
                const passValido = await helpers.matchPassword(password, user.password);//Esto devuelve un booleano.
                if(passValido){ //Si passValido es 'true' seguimos con el 'done' normal y le enviamos un msj con flash.
                        done(null, user, req.flash('correcto' ,'Buenas ' + user.username));//Acordarse que req.flash LLEVA dos parametros, primero el nombre del msj y luego el msj en si. 
                } else {
                        done(null, false, req.flash('message', 'Password Incorrecto'));
                }
        } else {
                return done(null, false, req.flash('message', 'EL usuario NO existe'));//Si el usuario esta mal no lo dejamos ingresar al sistema y le enviamos un msj diciendo que 
        }
        
}));



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
        //Acá le agregamos el 'id' desde la propiedad que tiene 'result'.
        newUser.id = result.insertId;
        console.log(result);
        //Aca devolvemos NULL al callback del 'done' para que siga ejecutando el codigo siguiente.
        return done(null, newUser);
}));



//La documentaciñon de passport índica que necesitamos hacer dos pasos más una vez hecha la estrategia, primero serializar y luego deserializar.
passport.serializeUser((user, done) => {
        done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
        //Lo guardamos en una const porque eso devuelve un array.
       const filas = await pool.query('SELECT * FROM users where id = ?', [id]);
       //Le hacemos 'null' al callback del 'done' y le pedimos del objeto 'fila' la posición 0 porque es la información que necesitamos. 
       done(null, filas[0]);
});

