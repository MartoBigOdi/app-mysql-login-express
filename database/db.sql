------>Creamos la base de datos
CREATE DATABASE database_follow;

------>Acá le decimos que es la que vamos a utlizar 
USE database_follow;
------>Acá le creamos la tabla a la base de datos. 
CREATE TABLE users(
    id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY ,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    cargo VARCHAR(60) NOT NULL
    );

------>Acá agrego una caracteristica a 'id'
ALTER TABLE users
    ADD PRIMARY KEY (id);

------>Para modificar algo es 
-------> Acá le estamos indicando que la tabla tiene un incremento de 2 en 2. 
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

------>si yo quiero ver la tabla 'users' dsd mi mysql. 
DESCRIBE users;


------>Creamos tabla de contenidos para cada usuario. 
CREATE TABLE seguimientoTareas(
    id INT(11) PRIMARY KEY NOT NULL,
    title VARCHAR(150) NOT NULL,
    urgencia VARCHAR(150) NOT NULL,
    descripción TEXT,
    user_id INT(11),
    tiempoDeCreación timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE seguimientoTareas
    MODIFY id INT(11) AUTO_INCREMENT NOT NULL;

    