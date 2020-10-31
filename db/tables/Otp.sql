create table Otp(
	id varchar(36) NOT NULL,
	codigo varchar(36) DEFAULT NULL,
	typeCorreoCelular varchar(20) DEFAULT NULL,
	correocelular varchar(100),
	typeCode varchar(20) DEFAULT NULL,
	esValido boolean DEFAULT NULL,
	creado datetime DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY codigoTipos (`codigo`,`typeCorreoCelular`,`typeCode`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;