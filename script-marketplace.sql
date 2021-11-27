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
insert into usuario(nombreUsuario, correoUsuario, contrasena, telefonoUsuario, direccion) values('javier','javier@gmail.com','asdf','4848484848','SS');
select * from usuario;

create table rol(
	idRol integer primary key auto_increment,
    nombreRol varchar(100)
);

#select *from usuario;
alter table usuario add column idRol integer;
alter table usuario add constraint fk_rol foreign key(idRol) references rol(idRol);
#alter table producto modify column descProducto varchar(100);
#describe producto;


create table categoria(
	idCategoria integer primary key auto_increment,
    nombreCategoria varchar(50)
);
insert into categoria(nombreCategoria) values('Electrodomesticos');

#drop table imagen;
create table producto(
	idProducto integer primary key auto_increment,
    nombreProducto varchar(100),
    descProducto varchar(100),
    precioProducto float,
    stockProducto int,
    idCategoria integer,
    FOREIGN KEY(idCategoria) references categoria(idCategoria)
);
 
insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('Refrigeradora',10,500,5,1);
insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('cocina',10,500,5,1);
insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('tv',10,500,5,1);
#insert into producto(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) values('Microonda',15,100,8,1);
##select max(idProducto) as id from producto;
##select *from producto;
##select *from imagen;
#delete from producto where idProducto=8;

 
create table imagen(
	idImagen integer primary key auto_increment,
    idProducto integer,
    urlImage varchar(200),
    FOREIGN KEY(idProducto) references producto(idProducto)  on delete cascade
);

#drop procedure sp_agregarProducto;

DELIMITER //
create procedure sp_agregarProducto(
in p_nombreProducto varchar(100), 
in p_descProducto float, in p_precioProducto float, 
in p_stockProducto int, in p_idCategoria integer)
BEGIN
	declare v_idProducto integer;
    
    INSERT INTO PRODUCTO(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) 
    VALUES(p_nombreProducto,p_descProducto,p_precioProducto,p_stockProducto,p_idCategoria);
    
END //
DELIMITER ;
#call sp_agregarProducto('Licuadora',15,100,8,1,'licuadoraimagen');


create table venta(
	numVenta integer primary key auto_increment,
    fechaVenta date,
    totalVenta float,
    idUsuario integer,
    FOREIGN KEY(idUsuario) references usuario(idUsuario)
);

insert into venta(fechaVenta, totalVenta, idUsuario) values(sysdate(), 50.00, 1);
select * from venta;

create table detalleVenta(
	idDetalle integer primary key auto_increment,
    numVenta integer,
    idProducto integer,
    cantidadProducto int,
    total float,
    FOREIGN KEY(numVenta) references venta(numVenta),
    FOREIGN KEY(idProducto) references producto(idProducto)
);

insert into detalleventa(numVenta, idProducto, cantidadProducto, total) values(2, 1, 5, 100);
select * from detalleventa;

#drop table valoracion;
create table valoracion(
    idUsuario integer,
    idProducto integer,
    calificacion int,
    FOREIGN KEY(idUsuario) references usuario(idUsuario) ,
    FOREIGN KEY(idProducto) references producto(idProducto) on delete cascade,
    primary key(idUsuario,idProducto)
);

insert into valoracion(idUsuario, idProducto, calificacion) values(1,1,5);
insert into valoracion(idUsuario, idProducto, calificacion) values(1,2,4);
insert into valoracion(idUsuario, idProducto, calificacion) values(2,1,3);

create table conversion(
	idConversion integer primary key auto_increment,
    numVenta integer,
    tipoMoneda varchar(50),
    valorMoneda float,
    montoIngresado float,
    fechaConversion date,
    FOREIGN KEY(numVenta) references venta(numVenta)
);

drop table conversion;

insert into conversion(tipoMoneda, valorMoneda,montoIngresado,fechaConversion) values('Euro', 1.25, 95.99,sysdate());

show tables;









