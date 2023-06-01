-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
create database Evolucao_Kratos;
use Evolucao_Kratos;

create user 'war'@'localhost' identified by 'urubu100';
grant select, insert, delete, update on Evolucao_Kratos.* to 'war'@'localhost';  
flush privileges;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(16),
    email varchar(45),
    senha varchar(12),
    foto varchar(64)
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
    mitologia VARCHAR(45),
    personagem VARCHAR(45)
);
-- DROP DATABASE evolucao_kratos;
/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
