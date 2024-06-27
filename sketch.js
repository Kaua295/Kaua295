let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;
//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;
//sons do jogo
let raquetada;
let ponto;
let trilha;
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
function setup() {
  do {
    numJogadores = prompt('Quantos jogadores vão participar do jogo?');
    if (numJogadores !== null && !isNaN(numJogadores) && numJogadores == 1 && numJogadores == 2) {
      console.log('Número de jogadores: ' + numJogadores);
    } else {
      console.log('Por favor, insira um número válido de jogadores.');
    }
  } while (numJogadores === null || isNaN(numJogadores) || numJogadores <= 0 || numJogadores >= 3);
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    if (numJogadores == 1)
      movimentaRaqueteRobo();
    if (numJogadores == 2)
      movimentoRaqueteDois();
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
}
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }

}

function verificaColisaoRaquete(x, y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//RAQUETE ADIVERSARIO
function movimentaRaqueteRobo(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente
}

function movimentoRaqueteDois(){
      if (keyCode === 87) {
    console.log('Tecla W pressionada');
    yRaqueteOponente -= 10;
  } else if (keyCode === 83) {
    console.log('Tecla S pressionada');
    yRaqueteOponente += 10;
  }
}

//PONTUAÇÃO
function incluiPlacar(){
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  stroke(255);
  rect(130, 10, 40, 20)
  stroke(0);
  fill(255);
  text(meusPontos, 150, 26)
  fill(color(255, 140, 0));
  stroke(255);
  rect(430, 10, 40, 20)
  stroke(0);
  fill(255);
  text(pontosDoOponente, 450, 26)
}
function marcaPonto(){
  if (xBolinha > 593){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 7){
    pontosDoOponente += 1;
    ponto.play();
  }
}  





