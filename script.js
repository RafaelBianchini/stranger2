// ============================================================
// BLOCO 1 - DADOS (as listas de onde saem os sorteios)
// Pessoa 1 explica: o que é um array e o que é um objeto
// ============================================================

// Identidade do grupo (objeto com texto e uma lista)
const GRUPO = {
  nome: "Matemática II",
  turma: "3B",
  integrantes: ["Rafael", "Maria B", "Alexandre", "Paolla"]
};

// Arrays simples: cada um é uma lista de opções
const NOMES = ["Denise", "Bobby", "Kelly", "Hank", "Tina", "Walt", "Lucy", "Danny", "Rita", "Otis"];
const SOBRENOMES = ["Harper", "Lowell", "Brennan", "Cooper", "Mills", "Reyes", "Callahan", "Pierce"];
const LOCAIS = ["Centro de Hawkins", "Subúrbio de Hawkins", "Fazenda nos arredores", "Shopping Starcourt", "Perto da floresta", "Ao lado do laboratório"];
const TRACOS = ["Leal", "Curioso", "Corajoso", "Sarcástico", "Estrategista", "Generoso", "Teimoso"];
const DEFEITOS = ["Orgulhoso", "Impulsivo", "Desconfiado", "Distraído", "Ciumento", "Mentiroso compulsivo"];
const HABILIDADES = ["Improvisa sob pressão", "Lê pessoas com facilidade", "Conserta rádios e walkie-talkies", "Faz qualquer um rir", "Resolve enigmas", "Nunca se perde na floresta"];
const SEGREDOS = ["Escondeu um mapa da floresta", "Guarda um walkie-talkie que ninguém deveria ouvir", "Tem poderes que ainda não entende", "Já viu luzes estranhas no céu", "Mantém um diário de coisas que desaparecem"];
const INVERTIDOS = [
  "Coberto de esporos, vaga por uma Hawkins escura e silenciosa.",
  "Perdeu a voz, mas ouve tudo o que o monstro sussurra.",
  "Virou guia dos que se perdem entre as árvores de raízes vivas.",
  "Ficou preso numa versão congelada da própria casa.",
  "Consegue abrir pequenas fendas entre os dois mundos."
];
const ATRIBUTOS = ["Coragem", "Inteligência", "Carisma", "Sorte"];

// Array de objetos: cada profissão tem um texto (t) e uma faixa de idade (min e max)
// Assim a idade sempre combina com a profissão
const PAPEIS = [
  { t: "Aluno do clube de ciências", min: 12, max: 16 },
  { t: "Jogador de RPG do clube de fantasia", min: 13, max: 18 },
  { t: "Atendente da locadora de vídeo", min: 16, max: 24 },
  { t: "Salva-vidas da piscina municipal", min: 17, max: 25 },
  { t: "Xerife substituto", min: 25, max: 50 },
  { t: "Cientista do laboratório", min: 30, max: 60 },
  { t: "Radialista amador", min: 20, max: 45 },
  { t: "Entregador de jornais", min: 12, max: 17 }
];


// ============================================================
// BLOCO 2 - FUNÇÕES DE SORTEIO
// Pessoa 2 explica: Math.random, Math.floor e como funciona uma função
// ============================================================

// Escolhe um item aleatório de uma lista
// Math.random() dá um número de 0 a 0.99; multiplicando pelo tamanho da lista
// e arredondando pra baixo (Math.floor) temos uma posição válida
function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Sorteia um número inteiro entre min e max (inclusive)
function numero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Atalho para pegar elementos do HTML pelo id
const $ = (id) => document.getElementById(id);


// ============================================================
// BLOCO 3 - GERADOR DE PERSONAGEM
// Pessoa 3 explica: template string, map/join e innerHTML
// ============================================================

function gerarPersonagem() {
  const papel = sortear(PAPEIS);               // sorteia a profissão (um objeto)
  const idade = numero(papel.min, papel.max);  // idade dentro da faixa da profissão

  // Para cada atributo, sorteia um valor de 3 a 10 e cria uma barra em HTML
  // map transforma cada item da lista em um pedaço de HTML; join junta tudo num texto só
  const barras = ATRIBUTOS.map((atributo) => {
    const v = numero(3, 10);
    return `<div class="barra"><span>${atributo}</span><i style="--v:${v}"></i><b>${v}</b></div>`;
  }).join("");

  // Monta a ficha inteira e coloca dentro da página
  // Os ${...} dentro das crases inserem valores do JavaScript no HTML
  $("ficha").innerHTML = `
    <div class="dados">
      <p class="registro">Registro de moradores &middot; nº ${numero(1000, 9999)}</p>
      <h2>${sortear(NOMES)} ${sortear(SOBRENOMES)}</h2>
      <p class="sub">${idade} anos &middot; ${papel.t}</p>

      <div class="chips">
        <span class="chip"><small>Traço</small>${sortear(TRACOS)}</span>
        <span class="chip defeito"><small>Defeito</small>${sortear(DEFEITOS)}</span>
      </div>

      <dl>
        <dt>Onde vive</dt><dd>${sortear(LOCAIS)}</dd>
        <dt>Habilidade</dt><dd>${sortear(HABILIDADES)}</dd>
        <dt>Segredo</dt><dd>${sortear(SEGREDOS)}</dd>
      </dl>

      <div class="atributos">${barras}</div>
    </div>

    <div class="invertido">
      <h3>No Mundo Invertido</h3>
      <p>${sortear(INVERTIDOS)}</p>
    </div>
    <p class="dica">Algo muda quando você entra no Mundo Invertido...</p>
    <span class="carimbo real">Morador</span>
    <span class="carimbo inv">Contaminado</span>`;
}


// ============================================================
// BLOCO 4 - MUNDO INVERTIDO E EVENTOS
// Pessoa 4 explica: dataset, if/else (operador ternário) e addEventListener
// ============================================================

// Troca entre o mundo real e o invertido
function alternarMundo() {
  // Se o mundo atual NÃO é "invertido", então vamos entrar nele
  const invertido = document.body.dataset.mundo !== "invertido";

  // O CSS lê esse atributo (data-mundo) e muda cores e elementos visíveis
  document.body.dataset.mundo = invertido ? "invertido" : "real";
  $("mundo").textContent = invertido ? "Voltar para o mundo real" : "Entrar no Mundo Invertido";
}

// Textos do cabeçalho e do rodapé, vindos do objeto GRUPO
$("grupo").textContent = GRUPO.nome + " - " + GRUPO.turma;
$("rodape").textContent = "Feito por " + GRUPO.integrantes.join(", ") + ".";

// Liga cada botão à sua função: quando clicar, a função roda
$("gerar").addEventListener("click", gerarPersonagem);
$("mundo").addEventListener("click", alternarMundo);