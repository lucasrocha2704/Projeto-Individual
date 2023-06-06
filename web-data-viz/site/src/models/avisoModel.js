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
    h.idHashtags,
    h.nome hashtag
FROM comentarios c
    INNER JOIN usuario u
        ON fkUsuario = u.idUsuario 
    INNER JOIN hashtags h
        ON idHashtags = fkhashtags;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function pesquisarDescricao(texto) {
//     console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
//     var instrucao = `
//         SELECT 
//             a.id AS idUsuario,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM comentarios a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE a.descricao LIKE '${texto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucao = `
//         SELECT 
//             a.id AS idUsuario,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM comentarios a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE u.id = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function publicar(idUsuario, comentario, fkhashtags) {
    console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, comentario, fkhashtags);
    var instrucao = `
        INSERT INTO comentarios (idComentario, fkUsuario, comentario, fkhashtags) VALUES (NULL, ${idUsuario}, '${comentario}', ${fkhashtags});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novoComentario, idComentario) {
    console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoComentario, idComentario);
    var instrucao = `
        UPDATE comentarios SET comentario = '${novoComentario}' WHERE id = ${idComentario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idComentario) {
    console.log("ACESSEI O comentarios MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idComentario);
    var instrucao = `
        DELETE FROM comentarios WHERE id = ${idComentario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar
}
