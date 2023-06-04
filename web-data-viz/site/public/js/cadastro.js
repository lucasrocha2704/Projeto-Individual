
function validar() {
    // aguardar();

    var erro = false;

    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var mitologia = select_mitologia.value;
    var personagem = select_personagem.value;

    var confirmarSenha = ipt_confirmar_senha.value;

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        erro = true;
        ipt_email.style = "border-color: red;";
        msg_email.innerHTML = "Email precisa de @ e .";
    } else {
        ipt_email.style = "border-color: trasnparent;";
        msg_email.innerHTML = "";
    }

    if (nome.length < 4) {
        erro = true;
        ipt_nome.style = "border-color: red;";
        msg_nome.innerHTML = "nome tem que ter mais de 4 dígitos";
    } else {
        ipt_nome.style = "border-color: trasnparent;";
        msg_nome.innerHTML = "";
    }

    if (senha.length < 8) {
        erro = true;
        ipt_senha.style = "border-color: red;";
        msg_senha.innerHTML = "senha tem que ter + de 8 Caracteres";
    } else {
        ipt_senha.style = "border-color: transparent;";
        msg_senha.innerHTML = "";
    }

    if (mitologia == 0) {
        erro = true
        select_mitologia.style = "order-color: red;";
    } else {
        select_mitologia.style = "order-color: transparent;";
    }

    if (personagem == 0) {
        erro = true
        select_personagem.style = "order-color: red;";
    } else {
        select_personagem.style = "order-color: transparent;";
        console.log(personagem);
    }

    if (confirmarSenha != senha) {
        erro = true;
        ipt_confirmar_senha.style = "border-color: red;";
        msg_senha2.innerHTML = "senha tem que ter + de 8 Caracteres";

    } else {
        ipt_confirmar_senha.style = "border-color: transparent;";
        msg_senha2.innerHTML = "";
    }

    if (erro == false) {

        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
        // setInterval(sumirMensagem, 5000)
        // Enviando o valor da nova input
        fetch("/usuarios/cadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                mitologiaServer: mitologia,
                personagemServer: personagem
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "200")

                // limparFormulario();
                pegarID();
                alert("foi");
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;
    } else {
        // finalizarAguardar();
        return false;
    }
}

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }