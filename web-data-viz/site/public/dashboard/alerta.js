var alertas = [];

function obterdados() {
    fetch(`/medidas/tempo-real`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, fkhashtags) {
    var temp = resposta[0].temperatura;

    console.log(fkhashtags === resposta[0].fk_aquario)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, fkhashtags, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, fkhashtags, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(fkhashtags);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, fkhashtags, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, fkhashtags, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (fkhashtags == 1) {
        temp_aquario_1.innerHTML = temp + "°C";
        card = card_1
    } else if (fkhashtags == 2) {
        temp_aquario_2.innerHTML = temp + "°C";
        card = card_2
    } else if (fkhashtags == 3) {
        temp_aquario_3.innerHTML = temp + "°C";
        card = card_3
    } else if (fkhashtags == 4) {
        temp_aquario_4.innerHTML = temp + "°C";
        card = card_4
    }

}

// function exibirAlerta(temp, fkhashtags, grauDeAviso, grauDeAvisoCor) {
//     var indice = alertas.findIndex(item => item.fkhashtags == fkhashtags);

//     if (indice >= 0) {
//         alertas[indice] = { fkhashtags, temp, grauDeAviso, grauDeAvisoCor }
//     } else {
//         alertas.push({ fkhashtags, temp, grauDeAviso, grauDeAvisoCor });
//     }

//     exibirCards();
    
// // Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
// }

// function removerAlerta(fkhashtags) {
//     alertas = alertas.filter(item => item.fkhashtags != fkhashtags);
//     exibirCards();
// }
 
// function exibirCards() {
//     alerta.innerHTML = '';

//     for (var i = 0; i < alertas.length; i++) {
//         var mensagem = alertas[i];
//         alerta.innerHTML += transformarEmDiv(mensagem);
//     }
// }

// function transformarEmDiv({ fkhashtags, temp, grauDeAviso, grauDeAvisoCor }) {
//     return `<div class="mensagem-alarme">
//     <div class="informacao">
//     <div class="${grauDeAvisoCor}">&#12644;</div> 
//      <h3>Aquário ${fkhashtags} está em estado de ${grauDeAviso}!</h3>
//     <small>Temperatura ${temp}.</small>   
//     </div>
//     <div class="alarme-sino"></div>
//     </div>`;
// }
