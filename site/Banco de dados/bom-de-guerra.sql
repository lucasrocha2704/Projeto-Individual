create database Evolucao_Kratos;

use Evolucao_Kratos;

-- create user 'war'@'localhost' identified by 'urubu100';
-- grant select, insert, delete, update on Evolucao_Kratos.* to 'war'@'localhost';
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
        idComentario INT PRIMARY KEY AUTO_INCREMENT,
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
DELIMITER //
CREATE PROCEDURE CADASTRAR_USUARIO(IN US_NOME VARCHAR
(16), US_EMAIL VARCHAR(45), US_SENHA VARCHAR(12), 
US_FOTO VARCHAR(300), PR_MITOLOGIA VARCHAR(7), PR_PERSONAGEM 
VARCHAR(6)) BEGIN 
	INSERT INTO usuario (nome, email, senha, foto)
	VALUES ( us_nome, us_email, us_senha, us_foto);
	INSERT INTO preferencias
	VALUES ( (SELECT idUsuario FROM usuario WHERE us_email = us_email), pr_mitologia, pr_personagem);
	END// 
DELIMITER ;

GRANT EXECUTE ON PROCEDURE cadastrar_usuario to 'war'@'localhost';
flush privileges;

select * from usuario;
SELECT * from preferencias;
SELECT * FROM hashtags;
SELECT * FROM comentarios;

INSERT INTO usuario VALUES (null, 'Lucas Neves', 'lucas@gmail.com', 'lucas123', 'user.png'),
                           (null, 'Maria Silva', 'maria@gmail.com', 'maria123', 'user.png'),
                           (null, 'João Santos', 'joao@gmail.com', 'joao123', 'user.png'),
                           (null, 'Ana Oliveira', 'ana@gmail.com', 'ana123', 'user.png');

INSERT INTO hashtags
VALUES (null, '#mitologiaGrega'), (null, '#mitologiaNórdica'), 
       (null, '#kratos'), (null, '#atreus'), 
       (null, '#gow1'), (null, '#gow2'),
       (null, '#gow3'), (null, '#gow4'),
       (null, '#gow5'), (null, '#gowAscension'),
       (null, '#gowChainsOfOlympus'), (null, '#gowGhostOfSparta');

INSERT INTO comentarios VALUES (NULL, 3, 'Kratos, o espartano vingativo, desafia deuses e busca redenção em God of War, explorando mitologia nórdica e enfrentando desafios colossais.', 3),
                               (NULL, 2, 'Em God of War, Kratos e seu filho embarcam em odisseia nórdica, enfrentando deuses e fortalecendo laços familiares, numa jornada emocional e mitológica.', 2),
                               (NULL, 1, 'God of War apresenta Kratos, um guerreiro espartano que busca redenção e ensina seu filho a enfrentar perigos mitológicos, forjando um laço poderoso.', 2),
                               (NULL, 4, 'Em God of War, Kratos transforma-se de guerreiro vingativo a pai protetor, numa jornada repleta de mitos gregos e ensinamentos familiares.', 2),
                               (NULL, 1, 'Em God of War, Kratos desafia deuses gregos em busca de redenção. Aventurando-se pelo Monte Olimpo, Submundo e Labirinto de Creta, enfrenta Zeus, Atena e Poseidon, vivenciando a grandiosidade da mitologia grega em batalhas épicas e intrigas divinas.', 1);

SELECT
    c.idComentario,
    c.fkUsuario,
    c.comentario,
    c.fkhashtags,
    u.idUsuario,
    u.nome,
    u.email,
    u.senha,
    u.foto,
    h.idHashtags,
    h.nome hashtag
FROM comentarios c
    INNER JOIN usuario u ON fkUsuario = u.idUsuario
    INNER JOIN hashtags h ON idHashtags = fkhashtags ORDER BY idComentario;

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