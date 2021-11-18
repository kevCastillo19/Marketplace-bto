create database marketplace;

use marketplace;

create table usuario(
	idUsuario integer primary key auto_increment,
    nombreUsuario varchar(60),
    correoUsuario varchar(70),
    contrasena varchar(50),
    telefonoUsuario varchar(15),
    direccion varchar(100)
);


create table administrador(
	idAdmin integer primary key auto_increment,
    userAdmin varchar(60),
    contrasenaAdmin varchar(50),
    estadoAdmin boolean
);

create table categoria(
	idCategoria integer primary key auto_increment,
    nombreCategoria varchar(50)
);

create table producto(
	idProducto integer primary key auto_increment,
    nombreProducto varchar(100),
    descProducto float,
    precioProducto float,
    stockProducto int,
    idCategoria integer,
    FOREIGN KEY(idCategoria) references categoria(idCategoria)
);

create table imagen(
	idImagen integer primary key auto_increment,
    idProducto integer,
    urlImage varchar(200),
    FOREIGN KEY(idProducto) references producto(idProducto)  
);

create table venta(
	numVenta integer primary key auto_increment,
    fechaVenta date,
    totalVenta float,
    idUsuario integer,
    FOREIGN KEY(idUsuario) references usuario(idUsuario)
);

create table detalleVenta(
	idDetalle integer primary key auto_increment,
    numVenta integer,
    idProducto integer,
    cantidadProducto int,
    total float,
    FOREIGN KEY(numVenta) references venta(numVenta),
    FOREIGN KEY(idProducto) references producto(idProducto)
);

create table valoracion(
    idUsuario integer,
    idProducto integer,
    calificacion int,
    FOREIGN KEY(idUsuario) references usuario(idUsuario),
    FOREIGN KEY(idProducto) references producto(idProducto),
    primary key(idUsuario,idProducto)
);

create table conversion(
	idConversion integer primary key auto_increment,
    tipoMoneda varchar(50),
    valorMoneda float,
    montoIngresado float,
    fechaConversion date,
    FOREIGN KEY(idConversion) references venta(numVenta)
);

show tables;









