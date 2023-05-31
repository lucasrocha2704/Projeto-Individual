create database Evolucao_Kratos;
use Evolucao_Kratos;

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