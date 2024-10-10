-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 03:43:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reclamos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `totales_reclamos_estados` (OUT `descripcion` CHAR, OUT `cantidad` INT)   SELECT re.descripcion, count(r.idReclamo) as cantidad FROM `reclamos` as r
INNER JOIN `reclamos_estado` AS re ON re.idReclamosEstado = r.idReclamoEstado
GROUP by re.descripcion$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `idOficina` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `oficinas`
--

INSERT INTO `oficinas` (`idOficina`, `nombre`, `idReclamoTipo`, `activo`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 1),
(4, 'Dpto. de Facturación', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `idReclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int(11) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `idUsuarioCreador` int(11) NOT NULL,
  `idUsuarioFinalizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos`
--

INSERT INTO `reclamos` (`idReclamo`, `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`, `idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
(5, 'ruido en motor', NULL, '2024-08-19 06:00:00', NULL, NULL, 1, 1, 9, NULL),
(6, 'rotura de  motor ', NULL, '2024-08-19 07:00:00', NULL, NULL, 4, 1, 8, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(11, 'suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2, 3, 8, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 12, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_estado`
--

CREATE TABLE `reclamos_estado` (
  `idReclamosEstado` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_estado`
--

INSERT INTO `reclamos_estado` (`idReclamosEstado`, `descripcion`, `activo`) VALUES
(1, 'Creado', 1),
(2, 'En Proceso', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_tipo`
--

CREATE TABLE `reclamos_tipo` (
  `idReclamosTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_tipo`
--

INSERT INTO `reclamos_tipo` (`idReclamosTipo`, `descripcion`, `activo`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1),
(14, 'tipo reclamos creado en clase', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correoElectronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `idTipoUsuario` int(11) NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idTipoUsuario`, `imagen`, `activo`) VALUES
(1, 'Daenerys', 'Targaryen', 'daetar@correo.com', 'b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3', 1, NULL, 1),
(2, 'Jon', 'Snow', 'jonsno@gmail.com', 'd98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5', 1, NULL, 1),
(3, 'Tyrion', 'Lannister', 'tyrlan@correo.com', '9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9', 2, NULL, 1),
(4, 'Margaery', 'Tyrell', 'martyr@correo.com', 'ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57', 2, NULL, 1),
(5, 'Samwell', 'Tarly', 'samtar@correo.com', 'a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde', 2, NULL, 1),
(6, 'Jeor', 'Mormont', 'jeomor@correo.com', 'ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca', 2, NULL, 1),
(7, 'Khal', 'Drogo', 'khadro@gmail.com', '84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37', 3, NULL, 1),
(8, 'Catelyn', 'Stark', 'catsta@correo.com', '229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7', 3, NULL, 1),
(9, 'Yara', 'Greyjoy', 'yargre@correo.com', '097c61d6a3ee77e4f4a9d2c6b6fb284ee927a0c315f30172f685e4659a4f621b', 3, NULL, 1),
(12, 'Jose', 'Battaglia', 'josbat@gmail.com', 'c30d798692466db470eafebfb04c272b359c80f2ebbac6f51f6e9ff9b6e3177b', 3, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_oficinas`
--

CREATE TABLE `usuarios_oficinas` (
  `idUsuarioOficina` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idOficina` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_oficinas`
--

INSERT INTO `usuarios_oficinas` (`idUsuarioOficina`, `idUsuario`, `idOficina`, `activo`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 8, 3, 1),
(4, 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipo`
--

CREATE TABLE `usuarios_tipo` (
  `idUsuarioTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_tipo`
--

INSERT INTO `usuarios_tipo` (`idUsuarioTipo`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`idOficina`),
  ADD UNIQUE KEY `idOficina` (`idOficina`),
  ADD KEY `oficinas_fk2` (`idReclamoTipo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`idReclamo`),
  ADD UNIQUE KEY `idReclamo` (`idReclamo`),
  ADD KEY `reclamos_fk6` (`idReclamoEstado`),
  ADD KEY `reclamos_fk7` (`idReclamoTipo`),
  ADD KEY `reclamos_fk8` (`idUsuarioCreador`),
  ADD KEY `reclamos_fk9` (`idUsuarioFinalizador`);

--
-- Indices de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  ADD PRIMARY KEY (`idReclamosEstado`),
  ADD UNIQUE KEY `idReclamosEstado` (`idReclamosEstado`);

--
-- Indices de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  ADD PRIMARY KEY (`idReclamosTipo`),
  ADD UNIQUE KEY `idReclamosTipo` (`idReclamosTipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `usuarios_fk5` (`idTipoUsuario`);

--
-- Indices de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD PRIMARY KEY (`idUsuarioOficina`),
  ADD UNIQUE KEY `idUsuarioOficina` (`idUsuarioOficina`),
  ADD KEY `usuariosOficinas_fk1` (`idUsuario`),
  ADD KEY `usuariosOficinas_fk2` (`idOficina`);

--
-- Indices de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  ADD PRIMARY KEY (`idUsuarioTipo`),
  ADD UNIQUE KEY `idUsuarioTipo` (`idUsuarioTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `idOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `idReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  MODIFY `idReclamosEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  MODIFY `idReclamosTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  MODIFY `idUsuarioOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  MODIFY `idUsuarioTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD CONSTRAINT `oficinas_fk2` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamosTipo`);

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_fk6` FOREIGN KEY (`idReclamoEstado`) REFERENCES `reclamos_estado` (`idReclamosEstado`),
  ADD CONSTRAINT `reclamos_fk7` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamosTipo`),
  ADD CONSTRAINT `reclamos_fk8` FOREIGN KEY (`idUsuarioCreador`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `reclamos_fk9` FOREIGN KEY (`idUsuarioFinalizador`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_fk5` FOREIGN KEY (`idTipoUsuario`) REFERENCES `usuarios_tipo` (`idUsuarioTipo`);

--
-- Filtros para la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD CONSTRAINT `usuariosOficinas_fk1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `usuariosOficinas_fk2` FOREIGN KEY (`idOficina`) REFERENCES `oficinas` (`idOficina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
