var avisoModel = require("../models/avisoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO avisoController");
    res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function listarPorUsuario(req, res) {
//     var idUsuario = req.params.idUsuario;

//     avisoModel.listarPorUsuario(idUsuario)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         )
//         .catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log(
//                     "Houve um erro ao buscar os avisos: ",
//                     erro.sqlMessage
//                 );
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

// function pesquisarcomentario(req, res) {
//     var comentario = req.params.comentario;

//     avisoModel.pesquisarcomentario(comentario)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

function publicar(req, res) {
    var idUsuario = req.params.idUsuario;
    var comentario = req.body.comentario;
    var fkhashtags = req.body.fkhashtags;

    if (fkhashtags == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (comentario == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(idUsuario, comentario, fkhashtags)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novoComentario = req.body.comentario;
    var idComentario = req.params.idComentario;

    avisoModel.editar(novoComentario, idComentario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idComentario = req.params.idComentario;

    avisoModel.deletar(idComentario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    testar,
    listar,
    // listarPorUsuario,
    // pesquisarcomentario,
    publicar,
    editar,
    deletar
}