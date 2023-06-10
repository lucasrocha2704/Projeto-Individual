if (typeof sessionStorage.ID_USUARIO !== 'undefined') {
    window.location.href ="../dashboard/perfil.html"
} else {

function validar() {
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var erro = false;

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        erro = true;
        ipt_email.style = "border-color: red;";
        msg_email.innerHTML = "Email precisa de @ e .";
    } else {
        ipt_email.style = "border-color: transparent;";
        msg_email.innerHTML = "";
    }

    if (senha.length < 8) {
        erro = true;
        ipt_senha.style = "border-color: red;";
        msg_senha.innerHTML = "senha tem que ter + de 8 Caracteres";
    } else {
        ipt_senha.style = "border-color: transparent;";
        msg_senha.innerHTML = "";
    }

    if (erro == false) {
        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.EMAIL_USUARIO = json.email;

                    setTimeout(function () {
                        window.location = "../dashboard/perfil.html";
                    }, 2000); // apenas para exibir o loading

                });
                cardErroLogin.style.display = "flex"
                cardErroLogin.style.border = "2px solid greenyellow"
                cardErroLogin.style.color = "greenyellow"
                mensagem_erroLogin.innerHTML = "✅Entrando! Aguarde...✅";
            } else {
                cardErroLogin.style.display = "flex"
                cardErroLogin.style.border = "2px solid red"
                cardErroLogin.style.color = "red"
                mensagem_erroLogin.innerHTML = "❌Conta não cadastrada❌";

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}
}