
// ANIMAÇÃO DE SCROLL

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.about, .menu, .secao-sobre, .numeros, .cta-section, .secao-simulacao').forEach(el => {
    observer.observe(el);
});


// ACCORDION FAQ

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const jaAberto = item.classList.contains('aberto');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));

        if (!jaAberto) item.classList.add('aberto');
    });
});


// MENU HAMBÚRGUER
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('ativo');
        navbar.classList.toggle('aberto');
    });

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('ativo');
            navbar.classList.remove('aberto');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
            hamburger.classList.remove('ativo');
            navbar.classList.remove('aberto');
        }
    });
}



// VALIDAÇÃO DO FORMULÁRIO
const form = document.getElementById('form-contato');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');
        const msgErro = document.getElementById('msg-erro');
        const msgSucesso = document.getElementById('msg-sucesso');

        // Limpa estados anteriores
        [nome, email, mensagem].forEach(c => {
            c.classList.remove('campo-erro');
            const span = c.parentElement.querySelector('span');
            if (span) span.textContent = '';
        });
        msgErro.style.display = 'none';
        msgSucesso.style.display = 'none';

        let valido = true;

        if (!nome.value.trim()) {
            nome.classList.add('campo-erro');
            const span = document.getElementById('span1');
            if (span) span.textContent = 'Por favor, insira seu nome.';
            valido = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            email.classList.add('campo-erro');
            const span = document.getElementById('span2');
            if (span) span.textContent = 'Por favor, insira seu e-mail.';
            valido = false;
        } else if (!emailRegex.test(email.value)) {
            email.classList.add('campo-erro');
            const span = document.getElementById('span2');
            if (span) span.textContent = 'Insira um e-mail válido.';
            valido = false;
        }

        if (!mensagem.value.trim()) {
            mensagem.classList.add('campo-erro');
            const span = document.getElementById('span3');
            if (span) span.textContent = 'Por favor, escreva sua mensagem.';
            valido = false;
        }

        if (!valido) {
            msgErro.textContent = 'Preencha todos os campos obrigatórios.';
            msgErro.style.display = 'block';
            return;
        }

        msgSucesso.style.display = 'block';
        form.reset();

        setTimeout(() => {
            msgSucesso.style.display = 'none';
        }, 5000);
    });

    // Feedback em tempo real
    form.querySelectorAll('input, textarea').forEach(campo => {
        campo.addEventListener('input', () => {
            campo.classList.remove('campo-erro');
            const span = campo.parentElement.querySelector('span');
            if (span) span.textContent = '';
        });
    });
}



// LINK ATIVO NO MENU
const links = document.querySelectorAll('.navbar a');
const paginaAtual = window.location.pathname.split('/').pop();

links.forEach(link => {
    const hrefPagina = link.getAttribute('href').split('/').pop();
    if (hrefPagina === paginaAtual || (paginaAtual === '' && hrefPagina === 'index.html')) {
        link.classList.add('ativo');
    }
});

