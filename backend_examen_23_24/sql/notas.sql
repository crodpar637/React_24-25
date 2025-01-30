-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 20-02-2024 a las 23:29:00
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `notas`
--
DROP DATABASE IF EXISTS `notas`;
CREATE DATABASE IF NOT EXISTS `notas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE `notas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

DROP TABLE IF EXISTS `notas`;
CREATE TABLE `notas` (
  `idnota` int NOT NULL,
  `titulo` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `texto` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fcreacion` datetime NOT NULL,
  `urlimagen` varchar(200) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`idnota`, `titulo`, `texto`, `fcreacion`, `urlimagen`) VALUES
(1, 'Receta del serranito', 'Pan de viena, filetes de cinta de lomo ibérico, pimiento frito, tomate en rodajas, jamón ibérico y un poco de alioli.', '2024-02-19 23:59:25', 'https://montealbor.com/wp-content/uploads/2022/11/sandwich-serranito-typical-in-andalusia-with-ham-gren-pepper-and-grilled-pork-loin-scaled-e1668084067349.jpg'),
(2, '¿Estudiar?', 'Estudiar o comprarme un taxi, ese es el dilema.', '2024-02-19 23:59:25', 'https://pm1.aminoapps.com/6237/ce61ee92e903ccde1970614edff5909075c0fd54_hq.jpg'),
(3, 'Juegos pendientes', 'Sejiro\r\nHades\r\nExpansión The witcher 3\r\n', '2024-02-20 08:12:13', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxSfGkbMsEKevuCUTfs82o6Hfx5k9wy20Qg&usqp=CAU'),
(4, 'Estudiar más', 'Debo recordar estudiar para los exámenes. Todo el día con el Stardew Valley no es bueno.', '2024-02-19 23:59:25', 'https://pm1.aminoapps.com/6237/ce61ee92e903ccde1970614edff5909075c0fd54_hq.jpg'),
(5, 'Vacaciones', 'Matalascañas o Chipiona???', '2024-02-19 23:59:25', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQac8Pm8wxseHfZWWldqgpXEgNdBoJ7Ug1nM9gO6iSRcvYkA8Ej408OLm6U-w&s'),
(6, 'Recomendaciones bares', 'Cantina Cachorro, Bar Ignacio y Bar Jaula', '2024-02-19 23:59:25', 'https://media-cdn.tripadvisor.com/media/photo-s/11/fb/50/74/img-20180202-222542-largejpg.jpg'),
(7, 'Chistes', 'En una entrevista de trabajo:\n- ¿Has sido antes strategic press manager?\n- Sí,  en una startup de partner social gromenawer.\n- Se lo está inventando ¿verdad?\n- Has empezado tú.', '2024-02-19 23:59:25', 'https://www.boredpanda.es/blog/wp-content/uploads/2021/07/it-rage-comics-memes-reddit-60e6e9004b503__700-60eda7f96fe1a__700.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`idnota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `idnota` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
