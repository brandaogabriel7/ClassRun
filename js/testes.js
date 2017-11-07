let objetos = [],
    imgsObjetos = document.querySelector('.objetos');

  function Objeto(tempoDeInicio){
    this.el = document.createElement('img');
    for(let i=0; i<imgsObjetos.length; i++)
      this.el.src = 'imgs/objetos/' + imgsObjetos[i] + '.png';
    this.el.style.height = '8em';
    this.el = document.body.appendChild(this.el);
    this.posicao(tempoDeInicio);
  }










  <!DOCTYPE html>
  <html>
  <head>
  	<title>Evolução Do Reino Plantae</title>
  	<meta charset="utf-8">
  	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
  	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
  	<link rel="stylesheet" type="text/css" href="estilos.css">
  	<link rel="shortcut icon" href="imgs/icone.ico" />
  </head>
  <body id="body-esp">
  	<ul id="menu">
  		<li id="homepage"><a href="index.html">Pagina Inicial</a></li>
  		<li><a href="reino.html">Reino</a></li>
  		<li><a href="evolucao.html">Evolução</a></li>
  		<li><a href="criadores.html" target="_blank">Colaboradores</a></li>
  	</ul>
  	<div id="Importância">
  		<h1 class="titulo"> A Importância do Reino Plantae </h1>
  			<ul class="listagem">
  				<li>Importante para a manutenção do da vida na terra
  				auxiliando no ciclo de matéria.</li>
  				<li>Primordialmente importante para a nutrição de todos os seres  vivos, já que alimentam os herbívoros.</li>
  				<li>Servem de abrigo para incontáveis animais atráves de relações de epifitismo e inquilismo, por exemplo.</li>
  				<li>Fornecem oxigênio e também matéria prima.</li>
  			</ul>
  	</div>

  	<div id="reino">
  		<section class="part">
  			<img src="imgs/Briófitas.jpg" alt="Exemplo de Briófita" class="briofita foto">
  			<h2 class="tipo sumiu">Briófitas</h2>
  			<ul class="texto sumiu">
  				<li class="new">Embriófita com gametângio protegido.</li>
  				<li class="none">Sem vaso condutor. </li>
  				<li class="none">Sem semente.</li>
  				<li class="none">Sem flor e fruto.</li>
  				<li>Dependem de água para viver e reproduzir.</li>
  				<li>É formado por rizoide, filoide e caulode.</li>
  			</ul>
  		</section>
  		<section class="part">
  			<img src="imgs/Pteridófitas1.jpg" alt="Exemplo de Pteridófita" class="pteridofita foto">
  			<h2 class="tipo sumiu">Pteridófitas</h2>
  			<ul class="texto sumiu">
  				<li class="new">Vasos condutores</li>
  				<li>Dependem de água para reprodução</li>
  				<li class="none">Sem semente</li>
  				<li class="none">Sem flor e fruto</li>
  				<li>Possuem tecidos verdadeiros: raiz, caule e folhas</li>
  			</ul>
  		</section>
  		<section class="part">
  			<img src="imgs/gimnospermas1.jpg" alt="Exemplo de gimnosperma" class="gimnosperma foto">
  			<h2 class="tipo sumiu">Gimnospermas</h2>
  			<ul class="texto sumiu">
  				<li class="new">Formação de sementes.</li>
  				<li class="new">Tubo polínico.</li>
  				<li>Tecidos verdadeiros</li>
  				<li class="new">Possuem sementes</li>
  				<li class="none">Sem frutos</li>
  				<li class="none">Sem ovário</li>
  			</ul>
  		</section>
  		<section class="part">
  			<img src="imgs/angiosperma1.jpg" alt="Exemplo de angiosperma" class="angiosperma foto">
  			<h2 class="tipo sumiu">Angiospermas</h2>
  			<ul class="texto sumiu">
  				<li class="new">Formação de flor e frutos</li>
  				<li>Vivem em diferentes ambientes: terrestres,  dulcícolas e marinhos.</li>
  				<li>Apresentam estruturas reprodutoras macroscópicas.</li>
  				<li>Constituem o maior grupo de vegetais do planeta.</li>
  			</ul>
  		</section>
  		<iframe id="video-plantae" src="https://www.youtube.com/embed/oln6V2OPno4?ecver=2" width="640" height="360" frameborder="0" allowfullscreen></iframe>
  	</div>

  	<a href="#homepage"><img id="groot" src="imgs/groot.gif" alt="Botão Para O Topo, Groot"></a>
  	<script type="text/javascript" src="javes.js"></script>
  </body>
  </html>























  let plantas = document.querySelectorAll(".part");
  let paragrafos = document.querySelectorAll(".texto");
  let gruposFT = document.querySelectorAll(".foto");
  let tipos = document.querySelectorAll(".tipo");
  let videoEl = document.querySelector("#video-plantae");

  for (let i = 0; i < plantas.length; i++) {
  	plantas[i].addEventListener("click", function(){

  		if (paragrafos[i].classList.toggle('voltou')) {
  			for (let j = 0; j < plantas.length; j++) {
  				if (i != j) {
  					plantas[j].classList.add('sumiu');
  					videoEl.classList.add('sumiu');
  				}
  			}
  			window.setTimeout(function(){
  				paragrafos[i].classList.toggle('sumiu');
  				tipos[i].classList.toggle('sumiu');
  			}, 2000);
  			gruposFT[i].classList.toggle('primeiro');
  			}else{

  			gruposFT[i].classList.toggle('primeiro');
  			window.setTimeout(function(){
  				for (let j = 0; j < plantas.length; j++) {
  					if (i != j) {
  						plantas[j].classList.remove('sumiu');
  						videoEl.classList.remove('sumiu');
  					}
  				}
  			},2000);
  			paragrafos[i].classList.toggle('sumiu');
  			tipos[i].classList.toggle('sumiu');
  		}
  	});
  }



















Abelhinha.prototype.remove = function() {
  document.body.removeChild(this.el);
};

Abelhinha.prototype.posiciona = function(tempoAtrasoParaIniciar) {
  this.porcentagemTrajeto = 0;
  this.xInicial = Math.random() < 2 ? -15 : window.innerWidth + 15;
  this.yInicial = Math.random() * document.body.clientHeight;
  this.xFinal = this.xInicial < 0 ? window.innerWidth + 15 : -15;
  this.yFinal = Math.random() * document.body.clientHeight;
  this.el.style.left = `${this.xInicial}px`;
  this.el.style.bottom = `${this.yInicial}px`;
  this.tempoTrajeto = 3000 + Math.random() * 3000;
  this.tempoAtrasoParaIniciar = tempoAtrasoParaIniciar || Math.random() * 7000;
};

Abelhinha.prototype.atualiza = function(delta) {
  if (this.tempoAtrasoParaIniciar >= 0) {
    this.tempoAtrasoParaIniciar -= delta;
    return;
  }
  this.porcentagemTrajeto += delta / this.tempoTrajeto;
  this.x = this.xInicial + this.porcentagemTrajeto * (this.xFinal - this.xInicial);
  this.y = this.yInicial + this.porcentagemTrajeto * (this.yFinal - this.yInicial) + Math.sin(this.porcentagemTrajeto* 4 * Math.PI) * 40;
  this.y = Math.max(this.y, 0);
  this.el.style.left = `${this.x}px`;
  this.el.style.bottom = `${this.y}px`;

  if (this.porcentagemTrajeto >= 1) {
    this.posiciona();
  }
};

let inicio = null;

function atualizaAbelhinhas(agora) {
  if (!inicio) inicio = agora;
  let delta = agora - inicio;
  for (abelhinha of abelhinhas) {
    abelhinha.atualiza(delta);
  }
  inicio = agora;

  window.requestAnimationFrame(atualizaAbelhinhas);
}
atualizaAbelhinhas(0);


document.addEventListener('keyup', function(e) {
  if (e.key === '+' || e.key === '=') {
    let novaAbelhinha = new Abelhinha(1);
    abelhinhas.push(novaAbelhinha);
  } else if (e.key === '-' || e.key === '_') {
    abelhinha = abelhinhas.pop();
    if (abelhinha) {
      abelhinha.remove();
    }
  }
});

document.body.style.overflowX = 'hidden';
abelhinhas.push(new Abelhinha());
abelhinhas.push(new Abelhinha());
abelhinhas.push(new Abelhinha());







  let botaoalice = document.querySelector('#botao-alice');
let botaodornelas = document.querySelector('#botao-dornelas');
let botaobabi = document.querySelector('#botao-babi');
let botaobrandao = document.querySelector('#botao-brandao');
let voltaralice = document.querySelector('#voltaralice');
let voltardornelas = document.querySelector('#voltardornelas');
let voltarbabi = document.querySelector('#voltarbabi');
let voltarbrandao = document.querySelector('#voltarbrandao');
let alice = document.querySelector('#alice-bio');
let dornelas = document.querySelector('#dornelas-bio');
let babi = document.querySelector('#dornelas-bio');
let brandao = document.querySelector('#brandao-bio');
let ulbotao = document.querySelector('#ul-botoes');

function voltando() {
    ulbotao.style.display = "inline";
    alice.classList.add('invisivel');
    dornelas.classList.add('invisivel');
    babi.classList.add('invisivel');
    brandao.classList.add('invisivel');
    alice.classList.remove('visivel');
    dornelas.classList.remove('visivel');
    babi.classList.remove('visivel');
    brandao.classList.remove('visivel');
}
voltaralice.addEventListener('click', voltando);
voltardornelas.addEventListener('click', voltando);
voltarbabi.addEventListener('click', voltando);
voltarbrandao.addEventListener('click', voltando);

function alicefuncao(){
  alice.classList.remove('invisivel');
  alice.classList.add('visivel');
  ulbotao.style.display = "none";
}
botaoalice.addEventListener('click', alicefuncao);

function dornelasfuncao(){
  dornelas.classList.remove('invisivel');
  dornelas.classList.add('visivel');
  ulbotao.style.display = "none";
}
botaodornelas.addEventListener('click', dornelasfuncao);

function babifuncao(){
  babi.classList.remove('invisivel');
  babi.classList.add('visivel');
  ulbotao.style.display = "none";
}
botaobabi.addEventListener('click', babifuncao);

function brandaofuncao(){
  brandao.classList.remove('invisivel');
  brandao.classList.add('visivel');
  ulbotao.style.display = "none";
}
botaobrandao.addEventListener('click', brandaofuncao);

















<p class="nome">Colaboradores</p>
<ul>
  <li>Professor <strong>Flávio Coutinho</strong></li>
  <li><strong>Pedro Paulo</strong> - 1º ano de Informática 2017</li>
  <li><strong>João Pedro Renan</strong> - 3º ano de Informática 2017</li>
</ul>
