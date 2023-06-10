var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload')
var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/Perfil/:idUsuario", function (req, res) {
    usuarioController.exibirPerfil(req, res);
});
router.get("/exibirDadosPessoais/:idUsuario", function (req, res) {
    usuarioController.exibirDadosPessoais(req, res);
});

router.put("/alterarNome/:idUsuario", function (req, res) {
    usuarioController.alterarNome(req, res);
});

router.post("/alterarImagem/:idUsuario", upload.single('imgNova'), (req, res) => {
    usuarioController.alterarImagem(req, res);
});

module.exports = router;