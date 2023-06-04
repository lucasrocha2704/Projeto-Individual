create database Evolucao_Kratos;
use Evolucao_Kratos;

-- create user 'war'@'localhost' identified by 'urubu100';
-- grant select, insert, delete, update on Evolucao_Kratos.* to 'war'@'localhost';  
-- GRANT EXECUTE ON PROCEDURE cadastrar_usuario to 'war'@'localhost';
-- flush privileges;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(16),
    email varchar(45) UNIQUE,
    senha varchar(12),
    foto varchar(300)
);

create table comentarios (
	fkUsuario int,
    foreign key(fkUsuario) references usuario(idUsuario),
    comentario varchar(280)
);

create table hashtags (
    idHashtags int primary key auto_increment,
    nome VARCHAR(45),
    fkComentario int,
    Foreign Key (fkComentario) REFERENCES comentarios(fkUsuario)    
);

CREATE table preferencias (
    fkUsuario INT,
    Foreign Key (fkUsuario) REFERENCES usuario(idUsuario),
    mitologia VARCHAR(7),
    personagem VARCHAR(6)
);
select * from usuario;
SELECT * from preferencias;
DELIMITER //
CREATE PROCEDURE cadastrar_usuario(IN 
	us_nome VARCHAR(16), us_email VARCHAR(45), us_senha VARCHAR(12), us_foto VARCHAR(300),
    pr_mitologia VARCHAR(7), pr_personagem VARCHAR(6)
)
BEGIN
	INSERT INTO usuario (nome, email, senha, foto) 
		VALUES (us_nome, us_email, us_senha, us_foto);
	INSERT INTO preferencias VALUES ((SELECT idUsuario FROM usuario WHERE us_email = us_email), pr_mitologia, pr_personagem);
END//
DELIMITER ;

-- CALL cadastrar_usuario('nome', 'email', 'senha', 'user.png',
--             'Grega', 'Kratos'
--         );

-- drop database Evolucao_Kratos;