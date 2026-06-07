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


// 1. Seleciona todos os elementos que têm a classe 'escondido'
const elementos = document.querySelectorAll('.escondido');

// 2. Cria o observador que vigia a tela
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar'); 
            
        } else {
            
            entrada.target.classList.remove('mostrar');
        }
    });
}, {
    threshold: 0.15 
});

// 3. Diz ao observador para vigiar cada um dos elementos selecionados
elementos.forEach(elemento => observador.observe(elemento));

const PESOS = {

    /* Estado de saúde inicial da vítima */
    gravidade: {
        "estavel":  10,
        "grave":    30,
        "critico":  50
    },

    /* Faixa etária — componente de urgência */
    faixaEtaria: {
        "adulto":  5,
        "crianca": 15,
        "idoso":   15
    },

    /* Clima — cada sub-variável vale de 1 (leve) a 3 (extremo) */
    clima: {
        precipitacao: {
            "sem_chuva":      1,
            "chuva_leve":     1,
            "chuva_moderada": 2,
            "tempestade":     3
        },
        visibilidade: {
            "alta":  1,
            "baixa": 2,
            "nula":  3
        },
        vento: {
            "sem_vento": 1,
            "leve":      1,
            "moderado":  2,
            "forte":     3
        }
    },

    /* Localização — terreno e comunicação, cada um de 1 a 3 */
    localizacao: {
        terreno: {
            "urbana":   1,
            "floresta": 2,
            "montanha": 2,
            "alagada":  3
        },
        comunicacao: {
            "parcial":       1,
            "sem_cobertura": 2,
            "isolada":       3
        }
    }
};


/* ================================================================
   PENALIDADES
   Subtraídas da pontuação final por decisões incoerentes.
   Altere os valores para calibrar cada tipo de penalidade.
================================================================ */

const PENALIDADES = {
    "equipe":     20,   /* RN18 — equipe inadequada ao terreno */
    "tecnologia": 15,   /* RN15 — tecnologia incoerente ao cenário */
    "vitima":     25,   /* atraso no acionamento em estado crítico */
    "operador":   10    /* RN20 — taxa de acerto baixa acumulada */
};


/* ================================================================
   CLASSIFICAÇÃO FINAL
   Define as faixas de pontuação e o status da missão.
   Altere os valores de "ate" para mudar os limites de cada faixa.
================================================================ */

const CLASSIFICACAO = [
    {
        ate: 60,
        label: "RISCO BAIXO",
        icone: "🟢",
        cor: "#2E7D32",
        interpretacao: (base, pen) =>
            `Cenário com <strong>baixo risco</strong>. Pontuação base: ${base} pts. ` +
            `${pen > 0 ? `Penalidades aplicadas: −${pen} pts.` : 'Sem penalidades.'} ` +
            `Operador tem margem para planejar com cuidado.`
    },
    {
        ate: 120,
        label: "RISCO MODERADO",
        icone: "🟡",
        cor: "#F9A825",
        interpretacao: (base, pen) =>
            `Cenário com <strong>risco moderado</strong>. Pontuação base: ${base} pts. ` +
            `${pen > 0 ? `Penalidades: −${pen} pts comprometem o resultado.` : 'Sem penalidades — bom sinal.'} ` +
            `Cada decisão conta para definir Sucesso ou Fracasso.`
    },
    {
        ate: Infinity,
        label: "RISCO ALTO",
        icone: "🔴",
        cor: "#C62828",
        interpretacao: (base, pen) =>
            `Cenário de <strong>alto risco</strong>. Pontuação base: ${base} pts. ` +
            `${pen > 0 ? `Penalidades de −${pen} pts agravam o cenário.` : 'Nenhuma penalidade — mas o ambiente é hostil.'} ` +
            `Margem mínima: qualquer erro pode levar ao Fracasso.`
    }
];


/* ================================================================
   PONTUAÇÃO MÁXIMA PARA A BARRA VISUAL
   Máximo teórico: (50 + 15) × (1.8 + 2.0) = 247 → arredondado para 250
================================================================ */

const MAX_PONTUACAO = 250;


/* ================================================================
   FUNÇÃO DE CÁLCULO — RF21
   Fórmula: (Gravidade + Urgência) × (MultClima + MultLocalização) − Penalidades
================================================================ */

function calcularPontuacao(estado) {

    /* Componente 1: Gravidade */
    const pontoGravidade = PESOS.gravidade[estado.gravidade] ?? 0;

    /* Componente 2: Urgência (faixa etária) */
    const pontoFaixa = PESOS.faixaEtaria[estado.faixa] ?? 0;

    const subtotal = pontoGravidade + pontoFaixa;

    /* Multiplicador de Clima
       Média dos três escores (1–3) convertida para escala 1.0–1.8 */
    const escorePrecip = PESOS.clima.precipitacao[estado.precipitacao] ?? 1;
    const escoreVisib  = PESOS.clima.visibilidade[estado.visibilidade] ?? 1;
    const escoreVento  = PESOS.clima.vento[estado.vento] ?? 1;
    const mediaClima   = (escorePrecip + escoreVisib + escoreVento) / 3;
    const multClima    = parseFloat((1.0 + (mediaClima - 1) * (0.8 / 2)).toFixed(2));

    /* Multiplicador de Localização
       Média dos dois escores (1–3) convertida para escala 1.0–2.0 */
    const escoreTerreno = PESOS.localizacao.terreno[estado.terreno] ?? 1;
    const escoreComun   = PESOS.localizacao.comunicacao[estado.comunicacao] ?? 1;
    const mediaLoc      = (escoreTerreno + escoreComun) / 2;
    const multLoc       = parseFloat((1.0 + (mediaLoc - 1) * (1.0 / 2)).toFixed(2));

    const multTotal = parseFloat((multClima + multLoc).toFixed(2));

    /* Pontuação base (antes de penalidades) */
    const pontuacaoBase = Math.round(subtotal * multTotal);

    /* Penalidades */
    const totalPenalidades = estado.penalidades.reduce(
        (acc, tipo) => acc + (PENALIDADES[tipo] ?? 0), 0
    );

    /* Pontuação final */
    const pontuacaoFinal = Math.max(0, pontuacaoBase - totalPenalidades);

    /* Classificação */
    const classif = CLASSIFICACAO.find(c => pontuacaoFinal <= c.ate);

    return {
        pontoGravidade,
        pontoFaixa,
        subtotal,
        multClima,
        multLoc,
        multTotal,
        pontuacaoBase,
        totalPenalidades,
        pontuacaoFinal,
        classif,
        formulaTexto:
            `(${pontoGravidade} + ${pontoFaixa}) × (${multClima} + ${multLoc})` +
            (totalPenalidades > 0 ? ` − ${totalPenalidades}` : '') +
            ` = <strong>${pontuacaoFinal}</strong>`
    };
}


/* ================================================================
   LEITURA DO DOM E ATUALIZAÇÃO DO SIMULADOR
================================================================ */

function lerEstadoDoDOM() {
    const radio = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    };

    const penalidades = Array.from(
        document.querySelectorAll('input[name="penalidade"]:checked')
    ).map(cb => cb.value);

    return {
        gravidade:    radio('gravidade')    || 'estavel',
        faixa:        radio('faixa')        || 'adulto',
        precipitacao: radio('precipitacao') || 'sem_chuva',
        visibilidade: radio('visibilidade') || 'alta',
        vento:        radio('vento')        || 'sem_vento',
        terreno:      radio('terreno')      || 'urbana',
        comunicacao:  radio('comunicacao')  || 'parcial',
        penalidades
    };
}

function atualizarSimulador() {
    const estado = lerEstadoDoDOM();
    const r = calcularPontuacao(estado);

    /* Passos do cálculo */
    document.getElementById('val-gravidade').textContent   = `+${r.pontoGravidade}`;
    document.getElementById('val-faixa').textContent       = `+${r.pontoFaixa}`;
    document.getElementById('val-subtotal').textContent    = r.subtotal;
    document.getElementById('val-clima').textContent       = `×${r.multClima}`;
    document.getElementById('val-localizacao').textContent = `×${r.multLoc}`;
    document.getElementById('val-mult-soma').textContent   = `×${r.multTotal}`;
    document.getElementById('val-base').textContent        = r.pontuacaoBase;
    document.getElementById('val-penalidades').textContent =
        r.totalPenalidades > 0 ? `−${r.totalPenalidades}` : '−0';

    /* Pontuação final e cor */
    document.getElementById('pontuacao-final').textContent = r.pontuacaoFinal;
    document.getElementById('pontuacao-final').style.color = r.classif.cor;

    /* Barra de progresso */
    const pct = Math.min(100, Math.round((r.pontuacaoFinal / MAX_PONTUACAO) * 100));
    const barra = document.getElementById('barra-fill');
    barra.style.width           = pct + '%';
    barra.style.backgroundColor = r.classif.cor;

    /* Status */
    document.getElementById('status-icone').textContent = r.classif.icone;
    document.getElementById('status-texto').textContent = r.classif.label;

    /* Fórmula e interpretação */
    document.getElementById('formula-texto').innerHTML       = r.formulaTexto;
    document.getElementById('interpretacao-texto').innerHTML =
        r.classif.interpretacao(r.pontuacaoBase, r.totalPenalidades);
}


/* ================================================================
   INICIALIZAÇÃO
================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const todosInputs = document.querySelectorAll(
        '.simulador-controles input[type="radio"], ' +
        '.simulador-controles input[type="checkbox"]'
    );

    todosInputs.forEach(input => {
        input.addEventListener('change', atualizarSimulador);
    });

    atualizarSimulador();
});
