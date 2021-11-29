-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2021 a las 03:00:58
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `marketplace`
--
CREATE DATABASE IF NOT EXISTS `marketplace` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `marketplace`;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregarProducto` (IN `p_nombreProducto` VARCHAR(100), IN `p_descProducto` VARCHAR(100), IN `p_precioProducto` FLOAT, IN `p_stockProducto` INT, IN `p_idCategoria` INTEGER)  BEGIN
	declare v_idProducto integer;
    
    INSERT INTO PRODUCTO(nombreProducto,descProducto,precioProducto,stockProducto,idCategoria) 
    VALUES(p_nombreProducto,p_descProducto,p_precioProducto,p_stockProducto,p_idCategoria);
    
   
   
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'TV y Video'),
(2, 'Audio'),
(3, 'Celulares'),
(4, 'Reloj Inteligente'),
(5, 'Cómputo'),
(6, 'Lavadoras'),
(7, 'Refrigeración'),
(8, 'Cocinas'),
(9, 'Hogar'),
(10, 'Electrodomesticos'),
(11, 'Muebles'),
(12, 'Camas'),
(13, 'Automotriz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversion`
--

CREATE TABLE `conversion` (
  `idConversion` int(11) NOT NULL,
  `tipoMoneda` varchar(50) DEFAULT NULL,
  `valorMoneda` float DEFAULT NULL,
  `montoIngresado` float DEFAULT NULL,
  `fechaConversion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `conversion`
--

INSERT INTO `conversion` (`idConversion`, `tipoMoneda`, `valorMoneda`, `montoIngresado`, `fechaConversion`) VALUES
(1, 'Euro', 1.25, 95.99, '2021-11-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventa`
--

CREATE TABLE `detalleventa` (
  `idDetalle` int(11) NOT NULL,
  `numVenta` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidadProducto` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalleventa`
--

INSERT INTO `detalleventa` (`idDetalle`, `numVenta`, `idProducto`, `cantidadProducto`, `total`) VALUES
(3, 1, 1, 5, 100),
(4, 2, 1, 1, 500),
(5, 2, 3, 1, 506.5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(100) DEFAULT NULL,
  `descProducto` varchar(100) DEFAULT NULL,
  `precioProducto` float DEFAULT NULL,
  `stockProducto` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `descProducto`, `precioProducto`, `stockProducto`, `idCategoria`, `imagen`) VALUES
(1, 'Televisor Samsung', 'Samsung Televisor Crystal de 43\" / UN43AU7000PX / 4K UHD', 437, 20, 1, 'https://store.midwich.com/media/image/gallery/Samsung-SAMLED43AU7100-TV_1.jpg'),
(2, 'Televisor LG', 'LG Televisor Smart TV de 65\" / 65QNED90SPA / Ultra HD', 2, 5, 1, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/6/5/65qned90spa_1.jpg'),
(3, 'Parlante Amazon', 'Amazon Parlante Echo Dot con Reloj y Alexa / B07XJ8C8F7 / Bluetooth', 79.99, 20, 2, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/b/0/b07xj8c8f7.jpg'),
(4, 'Audífonos Samsung', 'Samsung Audífonos Galaxy Buds 2 / SMR177NZKALT / Negro', 125, 20, 2, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/0/0/002_galaxybuds2_graphite.jpg'),
(5, 'Equipo de sonido Sony', 'Sony Equipo de sonido Vertical / MHCV02 / Bluetooth', 199, 10, 2, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/s/o/sony_3.jpg'),
(6, 'Torre de sonido Samsung', 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a09442221', 187, 13, 2, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/m/x/mx-t40-za_001_front1_black.jpg'),
(7, 'Parlante Radioshack', 'RadioShack Parlante Bluetooth con luces LED / 4001933 / 40W', 74.99, 16, 2, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/4/0/4001933_05.jpg'),
(8, 'Xiaomi POCOX3 PRO', 'XIAOMI Celular / POCOX3PROAZU / 256 GB', 349, 10, 3, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/x/3/x3pro_azul_3.jpg'),
(9, 'Telefono TCL', 'TCL Celular / T6125FBLUE / 64 GB', 149, 10, 3, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/t/c/tcl_20e.png'),
(10, 'Celular Samsung', 'Samsung Celular Galaxy A52 / SMA525MZKGGT / 128 GB', 200, 6, 3, 'https://lcoimgprod-grupounicomer.netdna-ssl.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/0/6/06_galaxya52_5g_awesome_black_front_r30.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombreRol`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(60) DEFAULT NULL,
  `correoUsuario` varchar(70) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `telefonoUsuario` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `correoUsuario`, `contrasena`, `telefonoUsuario`, `direccion`, `idRol`) VALUES
(1, 'diego', 'diego@gmail.com', '123456', '12345678', 'SS', 1),
(9, 'denny', 'diego@gmail.com', '123456', '12112121', 'SS', 1),
(10, 'kevin', 'mario@gmail.com', '123456', '33434565', 'SS', 1),
(11, 'usuario', 'usuario@gmail.com', '123456', '22334455', 'su casita', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `idUsuario` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `calificacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `valoracion`
--

INSERT INTO `valoracion` (`idUsuario`, `idProducto`, `calificacion`) VALUES
(1, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `numVenta` int(11) NOT NULL,
  `fechaVenta` date DEFAULT NULL,
  `totalVenta` float DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`numVenta`, `fechaVenta`, `totalVenta`, `idUsuario`) VALUES
(1, '2021-11-23', 50, 1),
(2, '2021-11-28', 1006.5, 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `conversion`
--
ALTER TABLE `conversion`
  ADD PRIMARY KEY (`idConversion`);

--
-- Indices de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `numVenta` (`numVenta`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_rol` (`idRol`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`idUsuario`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`numVenta`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `conversion`
--
ALTER TABLE `conversion`
  MODIFY `idConversion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `numVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conversion`
--
ALTER TABLE `conversion`
  ADD CONSTRAINT `conversion_ibfk_1` FOREIGN KEY (`idConversion`) REFERENCES `venta` (`numVenta`);

--
-- Filtros para la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD CONSTRAINT `detalleventa_ibfk_1` FOREIGN KEY (`numVenta`) REFERENCES `venta` (`numVenta`),
  ADD CONSTRAINT `detalleventa_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
