//Acá, con estos módulos vamos a hacer las auth que elegimmos. 
const passport = require('passport');
//Acá elegimos la estrategia Local.
const LocalStrategy = require('passport-local').Strategy;
//Acá requirimos la base de datos.
const pool = require('../database');
const helpers = require('../lib/helpers');


//passport.use('login.local', new LocalStrategy({

//}));



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

//La documentaciñon de passport índica que necesitamos hacer pasos más una vez hecha la estrategia, primero serializar y luego deserializar.
passport.serializeUser((user, done) => {
        done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
        //Lo guardamos en una const porque eso devuelve un array.
       const fila = await pool.query('SELECT * FROM users where id = ?', [id]);
       //Le hacemos 'null' al callback del 'done' y le pedimos del objeto 'fila' la posición 0 porque es la información que necesitamos. 
       done(null, fila[0]);
});

