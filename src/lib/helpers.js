//Acá creamos este archivo para poder encriptar el password. Con el Módulo 'bcrytp.js'
const encrypt = require('bcryptjs');

//Creamos un objeto el cual va a tener métodos de encriptación.
const helpers = {};

//Este método es para el registro.
helpers.encryptPassword = async (password) => {
    //salt nos va a permitir cirfar el texto plano 10 veces en este caso.
    const salt = await encrypt.genSalt(10);
    const hash = await encrypt.hash(password, salt);
    return hash;  
};

//Este método es para el login.
//Acá comparamos el password con el password guardado en la base de datos.
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await encrypt.compare(password, savedPassword);//No olvidarse de retornar el resultado de la consulta. 
    } catch(e) {
        console.log(e);
    };
};

module.exports = helpers;