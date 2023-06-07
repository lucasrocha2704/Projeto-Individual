var database = require("../database/config");

function listar() {
    console.log("ACESSEI O comentarios  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT 
    C.idComentario,
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
    INNER JOIN usuario u
        ON fkUsuario = u.idUsuario 
    INNER JOIN hashtags h
        ON idHashtags = fkhashtags ORDER BY idComentario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(idUsuario, comentario, fkhashtags) {
    console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, comentario, fkhashtags);
    var instrucao = `
        INSERT INTO comentarios (idComentario, fkUsuario, comentario, fkhashtags) VALUES (NULL, ${idUsuario}, '${comentario}', ${fkhashtags});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idComentario) {
    console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idComentario);
    var instrucao = `
        DELETE FROM comentarios WHERE idComentario = ${idComentario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    publicar,
    deletar
}
