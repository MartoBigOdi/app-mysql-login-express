const { Router } = require('express');
const router = Router();

//Este pool hace referencia a la base de datos.
const pool = require('../database');


router.get('/agregar', (req, res) => {
    res.render('follow/agregar');
});

router.post('/agregar', async (req, res) => {
    const { title, urgencia, descripción } = req.body;
    const newFollow = {
        title,
        urgencia,
        descripción
    };
    //utilizamos la conexión a mysql 'pool' y vamos a hacer una query para pasarle los datos. en este caso es el objeto 'newFollow'. Es una petición asincrona 
    await pool.query('INSERT INTO seguimientoTareas set ?', [newFollow]);
    //Tiene dos parametros uno es el nombre con el cual vamos guardar el mensaje y el otro es el mensaje en si.
    req.flash('ok', 'Tarea Guardada correctamente');
    res.redirect('/follow');
});

//Cuando nos manden a esta dirección con el id especificado lo manejamos con un DELETE.
router.get('/delete/:id', async (req, res) => {
     const { id } = req.params; 
     //Elimina desde la tabla 'seguimientoTareas' donde el id sea igual a lo que te voy a pasar a continuación. (siempre recordemos que viene desde req.params.id precisamente). Esto es una petición y va a tomar tiempo por eso es async.
     await pool.query('DELETE FROM seguimientoTareas WHERE ID = ?', [id]);
     req.flash('borrada', 'Tarea Terminada');
     res.redirect('/follow');   
});

//Esta ruta tiene el prefijo '/follow' que lo da el servidor directamente porque nososotros lo modificamos así.
router.get('/', async (req, res) => {
    const follow =  await pool.query('SELECT * FROM seguimientoTareas');
    console.log(follow);
    res.render('follow/list', { follow: follow });
});

module.exports = router;