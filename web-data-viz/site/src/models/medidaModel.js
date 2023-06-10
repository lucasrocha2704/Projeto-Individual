var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        COUNT(comentario) AS mensagem,
        idHashtags
        FROM comentarios RIGHT JOIN hashtags 
        ON fkhashtags = idHashtags 
        GROUP BY idHashtags 
        ORDER BY 
        idHashtags DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        COUNT(comentario) AS mensagem,
        idHashtags
        FROM comentarios RIGHT JOIN hashtags 
        ON fkhashtags = idHashtags 
        GROUP BY idHashtags 
        ORDER BY 
        idHashtags DESC`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        COUNT(comentario) AS mensagem,
        idHashtags
        FROM comentarios RIGHT JOIN hashtags 
        ON fkhashtags = idHashtags 
        GROUP BY idHashtags 
        ORDER BY 
        idHashtags DESC`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        COUNT(comentario) AS mensagem,
        idHashtags
        FROM comentarios RIGHT JOIN hashtags 
        ON fkhashtags = idHashtags 
        GROUP BY idHashtags 
        ORDER BY 
        idHashtags DESC`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
