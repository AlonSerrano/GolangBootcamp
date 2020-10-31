create table RolUsuario(
id varchar(36) primary key, 
idRol varchar(36) ,
idUsuario varchar(36),
idUsuarioDependiente varchar(36),
creado datetime,
actualizado datetime,
FOREIGN KEY (idRol) REFERENCES Rol(id),
FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
