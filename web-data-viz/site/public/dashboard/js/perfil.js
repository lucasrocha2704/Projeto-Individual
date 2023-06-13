if (typeof sessionStorage.ID_USUARIO == 'undefined') {
    window.location.href = '../login.html'
} else {
    function carregarPagina(idUsuario) {
        fetch(`/usuarios/Perfil/${idUsuario}`).then(function (resposta) {
            if (resposta.ok) {

                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));
                    infos = resposta[0]
                    var nome = document.getElementById("nomeUsuario");
                    nome.innerHTML = infos.nome;
                    var Foto = document.getElementById("imgUsuario");
                    Foto.src = `../assets/${infos.foto}`;

                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);

        });
    }

    function mudarNome(idUsuario) {
        var nomeNovo = outroNome.value;

        if (nomeNovo.length != 0) {
            fetch(`/usuarios/alterarNome/${idUsuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nomeNovo
                })
            }).then(function (resposta) {
                // console.log(resposta)
                if (resposta.ok) {
                    sessionStorage.NOME_USUARIO = nomeNovo;
                    infos = resposta[0]
                    carregarPagina(idUsuario);
                    outroNome.value = "";

                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        } else {
            validacaoNome.innerHTML = "O seu novo nome tem que ter pelo menos 1 caracter";
            outroNome.style = "border-color: red;";
        }
    }

    function novaImagem(idUsuario) {
        const formData = new FormData();
        formData.append('imgNova', imgNova.files[0])

        fetch(`/usuarios/alterarImagem/${idUsuario}`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                carregarPagina(idUsuario);
            })
            .catch(err => {
                console.log(err);
            })
    }

    var aparecer = false;

    function exibirPersonalizar() {

        if (aparecer) {
            pers.style = "display: none";
            dados.style = "display: none";
            aparecer = false;
            aparecerDados = false;
        } else {
            pers.style = "display: flex";
            dados.style = "display: none";
            aparecer = true;
            aparecerDados = false;
        }
    }
    var aparecerDados = false;

    // function exibirDados() {

    // }

    function exibirDados(idUsuario) {
        fetch(`/usuarios/exibirDadosPessoais/${idUsuario}`).then(function (resposta) {
            if (resposta.ok) {

                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));
                    infos = resposta[0]

                    var nome = document.getElementById("nomePessoal");
                    var email = document.getElementById("email");
                    var personagem = document.getElementById("personagem");
                    var mitologia = document.getElementById("mitologia");
                    nome.innerHTML = infos.nome;
                    email.innerHTML = infos.email;
                    personagem.innerHTML = infos.personagem;
                    mitologia.innerHTML = infos.mitologia;

                    if (aparecerDados) {
                        pers.style = "display: none";
                        dados.style = "display: none";
                        aparecer = false;
                        aparecerDados = false;
                    } else {
                        pers.style = "display: none";
                        dados.style = "display: flex";
                        aparecer = false;
                        aparecerDados = true;
                    }

                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    }

    function sair() {
        delete sessionStorage.EMAIL_USUARIO;
        delete sessionStorage.ID_USUARIO;
        delete sessionStorage.NOME_USUARIO;
        window.location.href = '../login.html';
    }
}