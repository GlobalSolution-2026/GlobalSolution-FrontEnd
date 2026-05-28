const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.about, .menu').forEach(el => {
    observer.observe(el);
});


// Accordion FAQ
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const jaAberto = item.classList.contains('aberto');

        // fecha todos
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));

        // abre o clicado (se não estava aberto)
        if (!jaAberto) item.classList.add('aberto');
    });
});