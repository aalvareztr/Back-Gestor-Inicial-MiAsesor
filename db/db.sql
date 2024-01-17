/*INNGRESADA x*/
CREATE TABLE clientes (
    rut VARCHAR(15) NOT NULL PRIMARY KEY,
    tipo VARCHAR(10) NOT NULL, /*Empresa / Cliente */
    razon_social VARCHAR(350) NOT NULL, /* Nombre */
    regimen_tributario VARCHAR(100) NOT NULL, 
    /*regimen_tributario VARCHAR(300)*/
    mail VARCHAR(400) NOT NULL,
    telefono VARCHAR(50),
    domicilio /* VARCHAR(100) NOT NULL  - - esta opcion puede ser mas adelante  */ TEXT,
    clave VARCHAR(200), /*crypt password*/
    giro VARCHAR(300)
    ,FOREIGN KEY (regimen_tributario) REFERENCES regimenes_tributarios(id)
    /*FOREIGN KEY (domicilio) REFERENCES domicilios(id)*/
);

ALTER TABLE clientes ADD COLUMN giro VARCHAR(300);

INSERT INTO clientes (rut,tipo,razon_social,regimen_tributario,mail,telefono,domicilio,giro) VALUES 
("77753942-6","Empresa","TAPICERIA LEOPOLDO GENARO MORALES VASQUEZ E.I.R.L.","PRO PYME Transparente 14D N°8","leonardovasquezshoes@gmail.com","56934546068","HNOS CARRERA 4217 LOS NOGALES COMUNA ESTACION CENTRAL REGION METROPOLITANA","TAPICERIA"),
("")
;

/*esta tabla no fue agregada*/
CREATE TABLE domicilios (
    id VARCHAR(100) NOT NULL PRIMARY KEY, 
    pais VARCHAR (100),
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    calle VARCHAR(300),
    numeracion VARCHAR(10),
    codigo_postal VARCHAR(10),
    piso VARCHAR(10),
    departamento VARCHAR(10)
);

/*INGRESADA x*/
CREATE TABLE regimenes_tributarios(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    tipo VARCHAR(350) NOT NULL,
    contabilidad VARCHAR(250)
);

/*INGRESADA x*/
CREATE TABLE representantes_legales (    
    rut VARCHAR (15) NOT NULL PRIMARY KEY,
    priority BOOLEAN,
    id_cliente VARCHAR(15) NOT NULL,
    nombre VARCHAR(350) NOT NULL,
    clave VARCHAR(200),
    fecha_alta DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(rut)
);

INSERT INTO representantes_legales (rut,order_num,id_cliente,nombre,clave) VALUES ("13682581-K",1,"77753942-6","LEOPOLDO GENARO MORALES VASQUEZ","$2b$15$vIgcNBp4zE8yZ1Ob/a.53eLZNrDf9zokPAjsfa/502x6UUZtfNYEq");


/*INNGRESADA x*/
CREATE TABLE actividad_comercial(
    id_cliente VARCHAR(15) NOT NULL,
    codigo VARCHAR(300) NOT NULL,
    priority BOOLEAN,
    FOREIGN KEY (id_cliente) REFERENCES clientes(rut)
);


/*INGRESADA x*/
CREATE TABLE planes_por_cliente(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    id_plan VARCHAR(100) NOT NULL,
    id_cliente VARCHAR(15) NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_plan) REFERENCES planes(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(rut)
);



/*INSERTADA x*/

CREATE TABLE contratos (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    fecha DATE,
    id_cliente VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(rut)
);

INSERT INTO contratos (id,fecha,id_cliente) VALUES ("a7ea9d15-ea17-4aa6-ad55-5b5649c988ef","2023-12-13","77753942-6")


/*INSERTADA x*/

CREATE TABLE planes_por_contrato (
    id_contrato VARCHAR(100) NOT NULL,
    id_plan VARCHAR(100) NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_contrato) REFERENCES contratos(id),
    FOREIGN KEY (id_plan) REFERENCES planes(id)
);

INSERT INTO planes_por_contrato (id_contrato,id_plan) VALUES ("a7ea9d15-ea17-4aa6-ad55-5b5649c988ef","acf983d1-2114-4161-a452-d24f47d94d4a");

/*

DROP TABLE planes;

CREATE TABLE planes(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    nombre VARCHAR(400) NOT NULL,
    precio FLOAT NOT NULL,
    observaciones TEXT,
);

DROP TABLE historico_planes;

CREATE TABLE historico_planes(
    plan VARCHAR(100) NOT NULL,
    fecha DATE,
    current_quote FLOAT,
    FOREIGN KEY (plan) REFERENCES planes_por_cliente(id)
);

DROP TABLE contratos;

CREATE TABLE contratos(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    id_cliente VARCHAR(15) NOT NULL,
    fecha_creacion DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(rut)
);

*/

/*NNuevas agregadas*/

/*IGRESADA x */
CREATE TABLE planes (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio FLOAT NOT NULL,
    mes_de_gracia INT
);

ALTER TABLE planes ADD COLUMN descripcion VARCHAR(250);

INSERT INTO planes (id,nombre,precio,descripcion) VALUES 
("2c4cf6a7-f357-4d1b-ad17-057fa9395c7a","Plan Básico",49990,null),
("5cf62da4-708b-4b7c-a109-f2666d5ef60c","Plan Básico",69990,null),
("66988f3d-78a6-4055-9c2f-c004088516be","Plan Básico",179990,null),
("76466ab3-cc21-412b-a6c2-32098ba30880","Plan Emprendedor",9990,"renta gratis"),
("acf983d1-2114-4161-a452-d24f47d94d4a","Plan Emprendedor",9990,"renta gratis + 3 meses gratis"),
("ca8613b4-dcd9-405e-8e51-b454eec299f4","Plan Emprendedo",19990,"renta gratis"),
("3de9d66d-04ec-4c1f-a804-f4b79f330a71","Plan Emprendedor Pro",34990,"renta gratis"),
("376936bd-ad0b-4594-a16d-f84b88d0a2b6","Plan Emprendedor Pro",24990,"renta gratis")
;


/*INGRESADA x*/
CREATE TABLE servicios_adicionales(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio FLOAT,
    financiacion TEXT
);


/*INGRESADA x*/
CREATE TABLE promociones (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
);

/*INGRESADA x*/
CREATE TABLE servicios_adicionales_personalizados(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL
);


/*Datos de prueba*/

INSERT INTO CLIENTES 