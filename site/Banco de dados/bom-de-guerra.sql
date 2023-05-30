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
	fkUsurio int,
    foreign key(fkUsuario) references usuario(idUsuario),
    comentario varchar(280)
);
