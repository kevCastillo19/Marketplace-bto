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
insert into categoria(nombreCategoria) values('Electrodomesticos');

#drop table imagen;
create table producto(
	idProducto integer primary key auto_increment,
    nombreProducto varchar(100),
    descProducto float,
    precioProducto float,
    stockProducto int,
    idCategoria integer,
    FOREIGN KEY(idCategoria) references categoria(idCategoria)
);
 
#insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('Refrigeradora',10,500,5,1);
#insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('Microonda',15,100,8,1);
##select max(idProducto) as id from producto;
##select *from producto;
##select *from imagen;
delete from producto where idProducto=8;

#drop procedure sp_agregarProducto;

DELIMITER //
create procedure sp_agregarProducto(
in p_nombreProducto varchar(100), 
in p_descProducto float, in p_precioProducto float, 
in p_stockProducto int, in p_idCategoria integer, in p_imagen varchar(200))
BEGIN
	declare v_idProducto integer;
    
    INSERT INTO PRODUCTO(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) 
    VALUES(p_nombreProducto,p_descProducto,p_precioProducto,p_stockProducto,p_idCategoria);
    
    select max(idProducto) into v_idProducto from producto;
    
    INSERT INTO IMAGEN(idProducto,urlImage) VALUES(v_idProducto,p_imagen);
   
END //
DELIMITER ;
call sp_agregarProducto('Licuadora',15,100,8,1,'licuadoraimagen');
 
create table imagen(
	idImagen integer primary key auto_increment,
    idProducto integer,
    urlImage varchar(200),
    FOREIGN KEY(idProducto) references producto(idProducto)  on delete cascade
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

drop table valoracion;
create table valoracion(
    idUsuario integer,
    idProducto integer,
    calificacion int,
    FOREIGN KEY(idUsuario) references usuario(idUsuario) ,
    FOREIGN KEY(idProducto) references producto(idProducto) on delete cascade,
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









