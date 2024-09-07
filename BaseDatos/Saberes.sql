
DROP DATABASE IF EXISTS Saberes;

CREATE DATABASE IF NOT EXISTS Saberes;


CREATE TABLE IF NOT EXISTS Saberes.Usuarios(
    Id_Usuario BIGINT NOT NULL AUTO_INCREMENT,
    Tipo_Usuario VARCHAR(100),
    Nonmbre VARCHAR(100),

    PRIMARY KEY (Id_Usuario)

);

CREATE TABLE IF NOT EXISTS Saberes.Equipo(
    Id_Equipo BIGINT NOT NULL AUTO_INCREMENT,
    Tipo_Usuario VARCHAR(100),
    Nombre VARCHAR(100),
    Estado BOOLEAN,

    PRIMARY KEY (Id_Equipo)
    
);

CREATE TABLE IF NOT EXISTS Saberes.Prestamos(

    Id_Prestamo BIGINT NOT NULL AUTO_INCREMENT,
    Id_Usuario BIGINT,
    Id_Equipo BIGINT,
    Actividad BOOLEAN,

    PRIMARY KEY (Id_Prestamo),

    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id_Usuario),
    FOREIGN KEY (Id_Equipo) REFERENCES Equipo(Id_Equipo)

);

CREATE TABLE IF NOT EXISTS Saberes.Componentes(
    Id_Componente BIGINT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Cantidad INT,

    PRIMARY KEY (Id_Componente)
);

