const express = require('express');
const logger = require('morgan');
const figlet = require('figlet');
const color = require('colors');
const exphbs =require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Settings
app.set('port', process.env.PORT || 3050);//Si nos dan un puerto lo utilizamos sino seteamos uno 3050. 
app.set('views', path.join(__dirname, 'views'));//Recordemos que '_dirname' nos devuelve la carpeta donde se ejecuta la constante (_dirname); entonces concatenamos con la carpeta 'views'.
app.engine('.hbs', exphbs ({//Configuramos el motor de vista
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layoutas'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')//Iniciamos el motor de plantilla y le decimos que ext tiene que tener.

//Midleware 
app.use(logger('dev'))//Este parametro nos muestra un determinado tipo de mensaje por consola. vemos los tipos de petición. y Si fue positiva la peti. 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/follow',require('./routes/follow'));
//Public 
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(app.get('port'), () => {
    console.log('Server on Port'.trap.rainbow, app.get('port'));
            figlet.text('Follow.App', {
            font: 'jazmine',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, 
        
            function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
        });

})