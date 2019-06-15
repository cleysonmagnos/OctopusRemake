// img.crossOrigin = 'Anonymous';
function preload() {
  bg = loadImage('img/background/background1.png');
  bg2 = loadImage('img/background/background2.png');
  // bg_completo = loadImage('img/Bases/background.png');
  
  sprite_perso = loadAnimation('img/perso/direita/perso_1.png', 'img/perso/direita/perso_2.png');
  sprite_perso_esq = loadAnimation('img/perso/esquerda/perso_1.png', 'img/perso/esquerda/perso_2.png');
  sprite_perso_tes = loadAnimation('img/perso/tesouro/tesouro_1.png', 'img/perso/tesouro/tesouro_3.png');
  sprite_perso_cor = loadAnimation('img/perso/corda/perso_1.png', 'img/perso/corda/perso_2.png');
  sprite_pego = loadAnimation('img/perso/pego/pego.png', 'img/perso/pego/pego_2.png');

  polvo_ten_1 = loadAnimation('img/polvo/tentaculoA/tentaculo_1.png', 'img/polvo/tentaculoA/tentaculo_6.png');
  polvo_ten_2 = loadAnimation('img/polvo/tentaculoB/tentaculo_1.png', 'img/polvo/tentaculoB/tentaculo_5.png');
  polvo_ten_3 = loadAnimation('img/polvo/tentaculoC/tentaculo_1.png', 'img/polvo/tentaculoC/tentaculo_4.png');
  polvo_ten_4 = loadAnimation('img/polvo/tentaculoD/tentaculo_1.png', 'img/polvo/tentaculoD/tentaculo_5.png');
  polvo_ten_5 = loadAnimation('img/polvo/tentaculoE/tentaculo_1.png', 'img/polvo/tentaculoE/tentaculo_5.png');

}

function setup(){
	createCanvas(240,160);
  frameRate(24);
  obj_Deus = new Deus(24);
  alert("Pressione Seta Esquerda e Direita para jogar ");
}

function draw(){
  obj_Deus.engine();
}

function keyPressed() {
  if(keyCode == LEFT_ARROW && obj_Deus.iniciado){
    obj_Deus.botaoPressionado(1);
  }else if(keyCode == RIGHT_ARROW && obj_Deus.iniciado){
    obj_Deus.botaoPressionado(-1);
  }
  if(keyCode == RIGHT_ARROW && !obj_Deus.iniciado){
    obj_Deus.iniciado = true;
  }
  
}

class Deus {
	constructor(frame){
    this.iniciado = false;
    this.frames = frame;
    this.frameAtual = 1;
    this.frameContador = 1;
    this.framePegoFim = 1;
    this.pego = false;
    this.bg = bg;
    this.bg2 = bg2;
    // this.sprBarco = sprite_barco;
    this.sprPego = sprite_pego;
    this.personagem = new Personagem();
    this.octopus = new Octopus();
    this.pontuacao = 0;
    this.pontuacaoTemp = 0;
    this.variacaoSpr = 1;
    this.vidas = 3;
  }

  engine(){
    this.carregarBG();
    // this.carregarBarquinho();
    this.contadorFrame();
    this.mostrarPontuacao();
    // this.contadorFrame();
    this.octopus.carregarTentaculos();
    if(this.iniciado){
      this.personagem.posicionarPersonagem();
      // this.verificarDerrota();
    }
    if(this.pego){
      // this.mostrarPego();
    }
  }

  iniciar(){
    this.iniciado = true;
  }
  
  carregarBG(){
    image(this.bg2, 0, 0);
    image(this.bg, 0, 0);
  }

  mostrarPontuacao(){
    textSize(20);
    text(this.pontuacao, 120, 20);
  }

  carregarBarquinho(){
    if(!this.iniciado){
      // image(this.sprBarco.getImageAt(0), 20, 4);
      animation(this.sprBarco, 35, 15);
    }
    if(this.vidas == 2){
      image(barco_parado, 50, 4);
    }
    if(this.vidas == 3){
      image(barco_parado, 53, 4);
      image(barco_parado, 70, 4);
    }
    
  }

  botaoPressionado(lado){
    this.personagem.posicionarPersonagem(lado);
  }

  contadorFrame(){
    this.frameAtual++;
    // console.log(this.frameAtual);
    // console.log(this.frames);
    if(this.iniciado && (this.frameAtual == this.frames || this.frameAtual == this.frames/2 || this.frameAtual == 1)){
      this.octopus.Alternacao();
    }
    if(this.iniciado && (this.frameAtual == this.frames) && this.personagem.angulo < 0.94){
      this.pontuacao++;
      this.pontuacaoTemp++;
      // console.log(this.pontuacao);
    }
    if(this.frameAtual > (this.frames - 1)){
      this.frameAtual = 1;
    }
    
  }

  retornarBarquinho(){
    this.pontuacao = this.pontuacao + this.pontuacaoTemp;
    
    this.resetarObjetos();
  }

  mostrarPego(){
    this.frameContador++;
    // console.log(this.frameContador);
    if(this.frameContador < this.framePegoFim){
      animation(this.sprPego, 143, 83);
    }else{
      this.framePegoFim = 0;
      this.frameContador = 0;
      this.pego = false;
    }
    
  }

  verificarDerrota(){
    const posicao = this.personagem.posicaoAtual;
    const inicio1 =  this.octopus.inicio1;
    const inicio2 =  this.octopus.inicio2;
    const inicio3 =  this.octopus.inicio3;
    const inicio4 =  this.octopus.inicio4;

    if((posicao == 0 || posicao == 1) && inicio1 == 3){
      this.retirarVida();
      return true;
    }
    if((posicao == 4 || posicao == 5) && inicio2 == 4){
      this.retirarVida();
      return true;
    }
    if((posicao == 6 || posicao == 7) && inicio3 == 4){
      this.retirarVida();
      return true;
    }
    if(posicao > 7 && inicio4 == 3){
      this.retirarVida();
      return true;
    }

    // console.log(posicao, inicio4);
  }

  retirarVida(){
    this.vidas--;
    this.pego = true;
    this.frameContador = this.frameAtual;
    this.framePegoFim = this.frameAtual + 3 * this.frames;
    // console.log(this.framePegoFim);

    if(this.vidas > 0){
      this.resetarObjetos();
      // console.log(this.vidas);
    }else{
      
      alert("Game Over!! Sua pontuação total foi de: " + this.pontuacao + " pontos");
      // console.log(this.pontuacao);
      this.resetarObjetos();
      location.reload();

    }
  }
  
  resetarObjetos(){
    this.iniciado = false;
    this.pontuacaoTemp = 0;
    this.personagem = new Personagem();
    this.octopus = new Octopus();
  }
  

}

class Personagem {
	constructor(){
    this.angulo = PI + 0.40;
    this.raio = 110;
    this.sprite = sprite_perso;
    this.sprite_esq = sprite_perso_esq;
    this.sprite_dir = sprite_perso;
    this.sprite_cor = sprite_perso_cor;
    this.sprite_tes = sprite_perso_tes;
    this.tesouro = sprite_perso;
    this.corda = sprite_perso;
    this.variacaoAngulo = 0.20;
    
    this.posicaoAtual = 0;

  }

  carregarSprite(){
    let vector = this.p2c();
    let x_img = vector.x + 120;
    let y_img = vector.y + 80;
    // console.log(this.angulo);
    // console.log(this.raio);
    animation(this.sprite, x_img, y_img);
  }

  posicionarPersonagem(lado = 0){
    // ellipse(120, 80, 100, 100);
    if(lado > 0 && this.angulo < 3.55){
      this.angulo = this.angulo + this.variacaoAngulo;
      if(this.angulo > 1.75){
        this.raio += 5;
      }
      if(this.angulo < 1.34){
        this.raio -= 10;
      }
      this.sprite = this.sprite_esq;
      
    }else if(lado < 0 && this.angulo > 0.94){
      this.angulo = this.angulo - this.variacaoAngulo;
      if(this.angulo > 1.55){
        this.raio -= 5;
      }
      if(this.angulo < 1.14){
        this.raio += 10;
      }
      this.sprite = this.sprite_dir;
    }
    if(this.angulo > 2.95){
      this.sprite = this.sprite_cor;
    }
    if(this.angulo < 0.94){
      this.sprite = this.sprite_tes;
    }
    if(this.angulo > 3.55){
      this.voltarBarquinho();
    }
    this.carregarSprite();

  }

  voltarBarquinho(){
    obj_Deus.retornarBarquinho();
  }

  animacaoTesouro(){
    animation(this.animaTesouro, 175 , 135);
  }

  p2c(){
    let y = this.raio * sin(this.angulo);
    let x = this.raio * cos(this.angulo);
    let vetorRotate = createVector(x, y);
    return vetorRotate;
  }
  
  // teste(){
  //   // alert('asdasd');
  // }
  

}

class Octopus {
	constructor(){
    // this.pego = sprite_pego;
    // this.base = base_polvo;
    this.sprTentaculo1 = polvo_ten_1;
    this.sprTentaculo2 = polvo_ten_2;
    this.sprTentaculo3 = polvo_ten_3;
    this.sprTentaculo4 = polvo_ten_4;
    this.sprTentaculo5 = polvo_ten_5;
    this.inicio1 = int(random(1, 2));
    this.inicio2 = int(random(1, 4));
    this.inicio3 = int(random(1, 4));
    this.inicio4 = int(random(1, 4));
    this.inicio5 = int(random(1, 4));
    this.variacao1 = 1;
    this.variacao2 = 1;
    this.variacao3 = 1;
    this.variacao4 = 1;
    this.variacao5 = 1;
    this.tentaculo1 = createVector(43,27);
    this.tentaculo2 = createVector(7,36);
    this.tentaculo3 = createVector(81,91);
    this.tentaculo4 = createVector(43,70);
    this.tentaculo5 = createVector(172,82);
    
  }
  
  Alternacao(){
    this.variacao1 = int(random([-1, 1]));
    this.variacao2 = int(random([-1, 1]));
    this.variacao3 = int(random([-1, 1]));
    this.variacao4 = int(random([-1, 1]));
    this.variacao5 = int(random([-1, 1]));
    // console.log(this.variacao1, this.variacao2, this.variacao3, this.variacao4);
    
    if((this.inicio1 > 4 && this.variacao1 > 0) || (this.inicio1 < 1 && this.variacao1 < 0)){
      this.variacao1 = -this.variacao1;
    }
    if((this.inicio2 > 3 && this.variacao2 > 0) || (this.inicio2 < 1 && this.variacao2 < 0)){
      this.variacao2 = -this.variacao2;
    }
    if((this.inicio3 > 2 && this.variacao3 > 0) || (this.inicio3 < 1 && this.variacao3 < 0)){
      this.variacao3 = -this.variacao3;
    }
    if((this.inicio4 > 3 && this.variacao4 > 0) || (this.inicio4 < 1 && this.variacao4 < 0)){
      this.variacao4 = -this.variacao4;
    }
    if((this.inicio5 > 3 && this.variacao5 > 0) || (this.inicio5 < 1 && this.variacao5 < 0)){
      this.variacao5 = -this.variacao5;
    }

    this.inicio1 = this.inicio1 + this.variacao1;
    this.inicio2 = this.inicio2 + this.variacao2;
    this.inicio3 = this.inicio3 + this.variacao3;
    this.inicio4 = this.inicio4 + this.variacao4;
    this.inicio5 = this.inicio5 + this.variacao5;
    console.log(this.inicio1, this.inicio2, this.inicio3, this.inicio4, this.inicio5);

  }

  carregarTentaculos(){

    image(this.sprTentaculo1.getImageAt(this.inicio1), this.tentaculo1.x, this.tentaculo1.y);
    image(this.sprTentaculo2.getImageAt(this.inicio2), this.tentaculo2.x, this.tentaculo2.y);
    image(this.sprTentaculo4.getImageAt(this.inicio4), this.tentaculo4.x, this.tentaculo4.y);
    image(this.sprTentaculo3.getImageAt(this.inicio3), this.tentaculo3.x, this.tentaculo3.y);
    image(this.sprTentaculo5.getImageAt(this.inicio5), this.tentaculo5.x, this.tentaculo5.y);

  }


}


