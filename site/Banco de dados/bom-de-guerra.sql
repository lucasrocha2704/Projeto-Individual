create database Evolucao_Kratos;

use Evolucao_Kratos;

-- create user 'war'@'localhost' identified by 'urubu100';

-- grant select, insert, delete, update on Evolucao_Kratos.* to 'war'@'localhost';

-- GRANT EXECUTE ON PROCEDURE cadastrar_usuario to 'war'@'localhost';

-- flush privileges;

create table
    usuario (
        idUsuario int primary key auto_increment,
        nome varchar(16),
        email varchar(45) UNIQUE,
        senha varchar(12),
        foto varchar(300)
    );

create table
    hashtags (
        idHashtags int primary key auto_increment,
        nome VARCHAR(45)
    );
create table
    comentarios (
        fkUsuario int,
        foreign key(fkUsuario) references usuario(idUsuario),
        comentario varchar(280),
        fkhashtags int,
        Foreign Key (fkhashtags) REFERENCES hashtags(idHashtags)
    );

CREATE table
    preferencias (
        fkUsuario INT,
        Foreign Key (fkUsuario) REFERENCES usuario(idUsuario),
        mitologia VARCHAR(7),
        personagem VARCHAR(6)
    );

select * from usuario;
SELECT * from preferencias;

SELECT * FROM hashtags;

SELECT * FROM comentarios;

DELIMITER //

CREATE PROCEDURE CADASTRAR_USUARIO(IN US_NOME VARCHAR
(16), US_EMAIL VARCHAR(45), US_SENHA VARCHAR(12), 
US_FOTO VARCHAR(300), PR_MITOLOGIA VARCHAR(7), PR_PERSONAGEM 
VARCHAR(6)) BEGIN 
	INSERT INTO
	    usuario (nome, email, senha, foto)
	VALUES (
	        us_nome,
	        us_email,
	        us_senha,
	        us_foto
	    );
	INSERT INTO preferencias
	VALUES ( (
	            SELECT idUsuario
	            FROM usuario
	            WHERE
	                us_email = us_email
	        ),
	        pr_mitologia,
	        pr_personagem
	    );
	END// 


DELIMITER ;
INSERT INTO comentarios (fkUsuario, comentario, fkhashtags) VALUES (4, '${comentario}', 5);
INSERT INTO hashtags
VALUES (null, '#mitologiaGrega'), (null, '#mitologiaNórdica'), 
(null, '#kratos'), (null, '#atreus'), 
(null, '#gow1'), (null, '#gow2'), 
(null, '#gow3'), (null, '#gow4'), 
(null, '#gow5'), (null, '#gowAscension'), 
(null, '#gowChainsOfOlympus'), (null, '#gowGhostOfSparta');

SELECT
    c.fkUsuario,
    c.comentario,
    c.fkhashtags,
    u.idUsuario,
    u.nome,
    u.email,
    u.senha,
    h.idHashtags,
    h.nome hashtag
FROM comentarios c
    INNER JOIN usuario u ON fkUsuario = u.idUsuario
    INNER JOIN hashtags h ON idHashtags = fkhashtags;

-- CALL
--     cadastrar_usuario(
--         'nome',
--         'email',
--         'senha',
--         'user.png',
--         'Grega',
--         'Kratos'
--     );

-- drop database Evolucao_Kratos;