CREATE TABLE `Usuario` (
  `id` varchar(36) NOT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `nombreUno` varchar(100) DEFAULT NULL,
  `nombreDos` varchar(100) DEFAULT NULL,
  `apellidoUno` varchar(100) DEFAULT NULL,
  `apellidoDos` varchar(100) DEFAULT NULL,
  `celularValid` boolean DEFAULT FALSE,
  `emailValid` boolean DEFAULT FALSE,
  `creado` datetime DEFAULT NULL,
  `actualizado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
   INDEX (`celular`,`email`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

