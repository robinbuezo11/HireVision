DROP DATABASE IF EXISTS PROYECTO_SEMI;
CREATE DATABASE PROYECTO_SEMI;
USE PROYECTO_SEMI;

CREATE TABLE USUARIO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    APELLIDO VARCHAR(50) NOT NULL,
    FOTO VARCHAR(250) NOT NULL,
    CORREO VARCHAR(250) NOT NULL UNIQUE,
    FECHA_NACIMIENTO DATE NOT NULL,
    CV VARCHAR(250),
    ADMIN INT NOT NULL DEFAULT 0 CHECK (ADMIN IN (0, 1)) -- 0: Usuario, 1: Administrador
);

CREATE TABLE EMPLEO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    PUESTO VARCHAR(50) NOT NULL,
    DESCRIPCION VARCHAR(4000) NOT NULL,
    SALARIO DECIMAL(10, 2) NOT NULL,
    FECHA_CREACION DATE NOT NULL
);

CREATE TABLE HABILIDAD (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL
);

CREATE TABLE EMPLEO_HABILIDAD (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_EMPLEO INT NOT NULL,
    ID_HABILIDAD INT NOT NULL,
    FOREIGN KEY (ID_EMPLEO) REFERENCES EMPLEO(ID),
    FOREIGN KEY (ID_HABILIDAD) REFERENCES HABILIDAD(ID)
);

CREATE TABLE POSTULACION (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO INT NOT NULL,
    ID_EMPLEO INT NOT NULL,
    FECHA_POSTULACION DATE NOT NULL,
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID),
    FOREIGN KEY (ID_EMPLEO) REFERENCES EMPLEO(ID)
);