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
        validacaoNome.innerHTML = "O seu novo nome tem que ter no mínimo <u>5</u> caracteres";
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
        aparecer = false
    } else {
        pers.style = "display: flex";
        dados.style = "display: none";
        aparecer = true
    }
}