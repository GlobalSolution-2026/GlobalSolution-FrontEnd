// Faz uma sombra quando desde a página

const header = document.querySelector(".cabecalho-principal");


    window.addEventListener("scroll", () => {
        
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.boxShadow = "none";
        }
    });

// Funcionalidade do FAQ

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        
        document.querySelectorAll(".faq-item").forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

// formulário

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-contato');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    
    const msgErro = document.getElementById('msg-erro');
    const msgSucesso = document.getElementById('msg-sucesso');
    
    const span1 = document.getElementById('span1');
    const span2 = document.getElementById('span2');
    const span3 = document.getElementById('span3');

    // Constante sobre nome composto para validação
    const regexNomeComposto = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

    // Estilização do span
    function gerenciarEstiloSpan(span, textoErro) {
        if (textoErro) {
            span.textContent = textoErro;
            span.style.display = 'block';
            span.style.backgroundColor = '#f8d7da';
            span.style.color = '#721c24';
            span.style.border = '1px solid #f5c6cb';
            span.style.padding = '8px';
            span.style.borderRadius = '4px';
            span.style.marginTop = '5px';
            span.style.fontSize = '0.85rem';
        } else {
            span.textContent = '';
            span.style.display = 'none';
        }
    }

    // Função para verificar se a caixa de erro grande deve sumir antes do envio
    function checarEFecharErroGlobal() {
        const nomeVal = nome.value.trim();
        const emailVal = email.value.trim();
        const mensagemVal = mensagem.value.trim();

        if (
            nomeVal && emailVal && mensagemVal && 
            regexNomeComposto.test(nomeVal) && 
            emailVal.includes('@') && emailVal.includes('.') &&
            validarTamanhoMensagem(mensagemVal)
        ) {
            msgErro.style.display = 'none';
        }
    }

    // --- Validações ao sair do campo (Blur) ---
    nome.addEventListener('blur', () => {
        const nomeVal = nome.value.trim();
        if (nomeVal === "") {
            gerenciarEstiloSpan(span1, 'O nome é obrigatório!');
        } else if (!regexNomeComposto.test(nomeVal)) {
            gerenciarEstiloSpan(span1, 'Por favor, insira seu nome completo (nome e sobrenome).');
        } else {
            gerenciarEstiloSpan(span1, '');
            checarEFecharErroGlobal();
        }
    });

    email.addEventListener('blur', () => {
        const emailVal = email.value.trim();
        if (emailVal === "") {
            gerenciarEstiloSpan(span2, 'O e-mail é obrigatório!');
        } else if (!emailVal.includes('@') || !emailVal.includes('.')) {
            gerenciarEstiloSpan(span2, 'Por favor, insira um e-mail válido.');
        } else {
            gerenciarEstiloSpan(span2, '');
            checarEFecharErroGlobal();
        }
    });

    mensagem.addEventListener('blur', () => {
        const mensagemVal = mensagem.value.trim();
        if (mensagemVal === "") {
            gerenciarEstiloSpan(span3, 'A mensagem é obrigatória!');
        } else if (!validarTamanhoMensagem(mensagemVal)) {
            gerenciarEstiloSpan(span3, 'Sua mensagem deve ser mais detalhada (mínimo de 30 caracteres)');
        } else {
            gerenciarEstiloSpan(span3, '');
            checarEFecharErroGlobal();
        }
    });

    // Conta os caracteres 
    function validarTamanhoMensagem(texto) {
        const textoLimpo = texto.trim();
        //Checagem por caracteres
        const temBastanteCaracteres = textoLimpo.length >= 30;
        return temBastanteCaracteres
    }

    // --- Validação no Envio (Submit) ---
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nomeVal = nome.value.trim();
            const emailVal = email.value.trim();
            const mensagemVal = mensagem.value.trim();
            
            // Reseta os alertas principais
            msgErro.style.display = 'none';
            msgSucesso.style.display = 'none';

            // Verifica campos vazios
            if (!nomeVal || !emailVal || !mensagemVal) {
                msgErro.textContent = "Erro: Todos os campos são obrigatórios.";
                msgErro.style.display = 'block';
                return;
            }

            // Verifica se o nome é composto
            if (!regexNomeComposto.test(nomeVal)) {
                msgErro.textContent = "Erro: Por favor, preencha seu nome completo.";
                msgErro.style.display = 'block';
                return;
            }

            // Verifica email válido
            if (!emailVal.includes('@') || !emailVal.includes('.')) {
                msgErro.textContent = "Erro: Por favor, insira um e-mail válido.";
                msgErro.style.display = 'block';
                return;
            }

            // Verifica se a mensagem contém uma frase válida
            if (!validarTamanhoMensagem(mensagemVal)) {
                msgErro.textContent = "Erro: A mensagem precisa ser mais detalhada (mínimo de 30 caracteres).";
                msgErro.style.display = 'block';
                return;
            }

            gerenciarEstiloSpan(span1, '');
            gerenciarEstiloSpan(span2, '');
            gerenciarEstiloSpan(span3, '');

            msgSucesso.style.display = 'block';
            form.reset();
            console.log("Formulário do Lobo-guará Tech enviado com sucesso!");
        });
    }
});