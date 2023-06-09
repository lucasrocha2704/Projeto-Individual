function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var select = hashtags.value;

    var corpo = {
        fkhashtags: form_postagem.hashtags.value,
        comentario: form_postagem.comentario.value
    }
    console.log(select)
    if (select < 1) {
        hashtags.style = "border-color: red;";
        alert("Preencher o campo com alguma hashtag")
    } else {
        fetch(`/avisos/publicar/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // window.alert("Post realizado com sucesso pelo usuario de nome: " + idUsuario + "!");
                window.location = "/Comunidade.html";
                limparFormulario();
                console.log(select)
                // finalizarAguardar();
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }
}

function deletar(idComentario) {
    console.log("Criar função de apagar post escolhido - ID" + idComentario);
    fetch(`/avisos/deletar/${idComentario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.location = "/Comunidade.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function atualizarFeed() {
    //aguardar();
    fetch("/avisos/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                // console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    sessionStorage.ID_COMENTARIO = publicacao.idComentario;

                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");
                    var spanID = document.createElement("span");
                    var spanhashtags = document.createElement("span");
                    var spanNome = document.createElement("span");
                    var divcomentario = document.createElement("div");
                    var divButtons = document.createElement("div");
                    // var btnEditar = document.createElement("button");
                    var btnDeletar = document.createElement("button");


                    // spanID.innerHTML = "ID: <b>" + publicacao.idUsuario + "</b>";
                    spanhashtags.innerHTML = "<u><b>" + publicacao.hashtag + "</u></b>";
                    spanNome.innerHTML = `<img src="assets/${publicacao.foto}" > <b> ${publicacao.nome} </b>`;
                    divcomentario.innerHTML = "Comentário: <br><br><b>" + publicacao.comentario + "</b>";
                    // btnEditar.innerHTML = "Editar";
                    btnDeletar.innerHTML = "Deletar";

                    divPublicacao.className = "publicacao";
                    spanhashtags.id = "inputNumero" + publicacao.idComentario;
                    spanNome.className = "publicacao-nome";
                    spanhashtags.className = "publicacao-hashtags";
                    divcomentario.className = "publicacao-comentario";

                    divButtons.className = "div-buttons"

                    // btnEditar.className = "publicacao-btn-editar"
                    // // btnEditar.id = "btnEditar" + publicacao.idComentario;
                    // btnEditar.setAttribute("onclick", `editar(${publicacao.idComentario})`);

                    btnDeletar.className = "publicacao-btn-editar"
                    btnDeletar.id = "btnDeletar" + publicacao.idComentario;
                    btnDeletar.setAttribute("onclick", `deletar(${publicacao.idComentario})`);

                    divPublicacao.appendChild(spanID);
                    divPublicacao.appendChild(spanNome);
                    divPublicacao.appendChild(spanhashtags);
                    divPublicacao.appendChild(divcomentario);
                    divPublicacao.appendChild(divButtons);
                    // divButtons.appendChild(btnEditar);
                    divButtons.appendChild(btnDeletar);
                    feed.appendChild(divPublicacao);
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("comentario")));
    divResultado.innerHTML = formulario.get("comentario");

    // finalizarAguardar();

    return false;
}

function obterDadosGrafico() {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = ['#gowGhostOfSparta', '#gowChainsOfOlympus', '#gowAscension', '#gow5', '#gow4', '#gow3', '#gow2', '#gow1', '#atreus', '#kratos', '#mitologiaNórdica', '#mitologiaGrega'];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'mensagens',
            data: [],
            fill: false,
            borderColor: '#262626',
            backgroundColor: '#262626',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.mensagem);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    chartBarra.data = dados;
    chartBarra.update();

}

var exibido = false;

function exibir() {

    if (exibido == false) {
        grafico.style.display = "flex";
        exibido = true;
    } else {
        grafico.style.display = "none";
        exibido = false;
    }
}