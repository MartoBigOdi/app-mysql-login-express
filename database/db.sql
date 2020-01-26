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

------>Acá agrego una caracteristica a 'id' pero en este caso lo agregamos anteriormente.
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
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    urgencia VARCHAR(150) NOT NULL,
    descripción TEXT,
    user_id INT(11),
    tiempoDeCreación timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE seguimientoTareas
    MODIFY id INT(11) AUTO_INCREMENT NOT NULL;

CREATE TABLE seguimientoTareas2(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    urgencia VARCHAR(150) NOT NULL,
    descripción TEXT,
    user_id INT(11),
    tiempoDeCreación timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_userTabla2 FOREIGN KEY (user_id) REFERENCES users(id)
);

 DROP TABLE seguimientoTareas; --->Si queremos borrar la tabla ponemos esto, luego podemos hacer de nuevo la query apra crearla, más que nada por si necesitamos volver a contar con el Id dsd 1. 


----->Query para ingresar Tarea según el ID en la tabla 'seguimientoTareas'.
 insert into seguimientoTareas(id,title,urgencia,descripción,user_id) values(2,'Terminar la APP del laburo','15 días','Mejorar lo más que se pueda en SQL y Terminar el programa para el trabajo',1);
----->O podemos insertar también de manera directa los valores. 
  insert into seguimientoTareas values(2,'Terminar la APP del laburo','15 días','Mejorar lo más que se pueda en SQL y Terminar el programa para el trabajo',1);