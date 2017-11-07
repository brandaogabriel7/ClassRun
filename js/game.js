// cada state é uma fase de execuçao do jogo, ajuda a organizar melhor
$(document).ready(function() {
  let game = new Phaser.Game(1280, 960, Phaser.AUTO, null, 'containerGame'),//cria o canvas
  // inicia o sistema de física arcade e chama o loadState
  bootState = {
    create: function() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.state.start('load');
    }
  },
  // Carrega todas as imagens, sprites, audios e outros arquivos necessários ao jogo
  loadState = {
    preload: function() {
      let loadingMessage = game.add.text(game.world.centerX, game.world.centerY, 'LOADING', { font: '100px Courier', fill: '#fff'}).anchor.set(.5);
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.PageAlignHorizontally = true;
      game.scale.PageAlignVertically = true;
      game.stage.backgroundColor = '#936f39';
      game.load.spritesheet('mainCharacter1', 'assets/sprites/mainCharacter1.png', 160, 160);
      game.load.spritesheet('mainCharacter2', 'assets/sprites/mainCharacter2.png', 160, 160);
      game.load.spritesheet('mainCharacter3', 'assets/sprites/mainCharacter3.png', 160, 160);
      game.load.spritesheet('mainCharacter4', 'assets/sprites/mainCharacter4.png', 160, 160);
      game.load.spritesheet('teacher', 'assets/sprites/teacher.png', 160, 160);
      game.load.spritesheet('objetos', 'imgs/objetos/objetosSpriteSheet.png', 120, 76);
      game.load.tilemap('unicolevel', 'assets/mapa/mapa.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('choose', 'imgs/chooseCharacters.png', 960, 540);
      game.load.image('playbutton', 'imgs/buttons/playbutton.png');
      game.load.image('brandsbutton', 'imgs/buttons/brandsbutton.png');
      game.load.image('alicebutton', 'imgs/buttons/alicebutton.png');
      game.load.image('annabutton', 'imgs/buttons/annabutton.png');
      game.load.image('babibutton', 'imgs/buttons/babibutton.png');
      game.load.image('denovobutton', 'imgs/buttons/botaodenovo.png');
      game.load.image('menubutton', 'imgs/buttons/menubutton.png');
      game.load.image('Tiles', 'assets/mapa/Tiles.png');
      game.load.image('background', 'imgs/background.png');
      game.load.image('backgroundmenu', 'imgs/backgroundmenu.png');
      game.load.audio('hit', 'sounds/hit.wav');
      game.load.audio('coletou1', 'sounds/coletou1.wav');
      game.load.audio('coletou2', 'sounds/coletou2.wav');
      game.load.audio('jump', 'sounds/jump.wav');
      game.load.audio('gameSong', 'sounds/gameSong1.mp3');
    },
    create: function() {
      game.state.start('title');
    }
  },
  // indica que caso o usauario não escolha um personagem, a opção 1 é a padrão
  op = '1',
  // state para escolha dos personagens(é o anterior ao início do jogo)
  titleState = {
    create: function() {
      let bg = game.add.tileSprite(0, 0, 960, 540, 'backgroundmenu'),
      playbutton = game.make.button(728, 400, 'playbutton', startGame),
      brandsbutton = game.make.button(77, 300, 'brandsbutton', function() {op='1'}),
      alicebutton = game.make.button(294, 300, 'alicebutton', function() {op='2'}),
      annabutton = game.make.button(511, 300, 'annabutton', function() {op='3'}),
      babibutton = game.make.button(728, 300, 'babibutton', function() {op='4'}),
      buttonsgroup = game.add.group();
      bg.fixedToCamera = true;
      game.add.sprite(0, 0, 'choose');
      buttonsgroup.add(playbutton);
      buttonsgroup.add(brandsbutton);
      buttonsgroup.add(alicebutton);
      buttonsgroup.add(annabutton);
      buttonsgroup.add(babibutton);
    }
  },
  map,
  timer,
  ganhou,
  pontuacao = 0,
  timeFinal,
  layer,
  bg,
  // coordenadas dos itens do jogo
  coordenadas = [{x: 899, y: 1032}, {x: 1824, y: 1064}, {x: 3050, y: 434}, {x: 6894, y: 264}, {x: 9764, y: 391}, {x: 15515, y: 839}, {x: 16819, y:680}, {x: 18970, y: 648}, {x: 21893, y: 1064}, {x: 30880, y: 903}, {x: 29900, y: 900}],
  itens,
  // State iniciado quando o jogo termina
  resultState = {
    create: function() {
      let bg = game.add.tileSprite(0, 0, 960, 540, 'backgroundmenu'),
      denovobutton = game.make.button(728, 400, 'denovobutton', function() {game.state.start('title');}),
      menubutton = game.make.button(77, 400, 'menubutton', function() { $('.geral').removeClass('invisivel'); scriptGame.remove(); $('canvas').remove(); }),
      buttonsgroup = game.add.group();
      bg.fixedToCamera = true;
      buttonsgroup.add(denovobutton);
      buttonsgroup.add(menubutton);
      let resulttxt,
      timertxt = game.add.text(400, 200, 'Time: ' + timeFinal);
      scoretxt = game.add.text(410, 260, 'Score: ' + pontuacao);
      if(ganhou == true) {
        resulttxt = game.add.text(340, 60, 'You Win');
      }
      else {
        resulttxt = game.add.text(340, 60, 'You Lose');
      }
      resulttxt.font = 'Fipps';
      resulttxt.fontSize = '5em';
      resulttxt.stroke = '#000000';
      resulttxt.fill = '#000';
      scoretxt.font = 'Fipps';
      scoretxt.fontSize = '2.5em';
      scoretxt.stroke = '#000000';
      scoretxt.fill = '#000';
      timertxt.font = 'Fipps';
      timertxt.fontSize = '2.5em';
      timertxt.stroke = '#000000';
      timertxt.fill = '#000';
      pontuacao = 0;
    }
  },
  playState = {
    player: null,
    teacher: null,
    inicio: null,
    isMusicOn: true,
    create: function() {
      let self = this,
      pontuacao = 0,
      botaoEl = $('#musica').removeClass('invisivel').click(function() {
        if(self.isMusicOn == true) {
          self.music.stop();
          self.isMusicOn = false;
        }
        else {
          self.music.play();
          self.isMusicOn = true;
        }
      });
      self.music = this.add.audio('gameSong', 0.3, true);
      self.music.play();
      self.inicio = self.time.now;
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.input.keyboard.addKey(Phaser.Keyboard.F11).onDown.add(gofull, this);
      bg = game.add.tileSprite(0, 0, 1280, 640, 'background');
      bg.fixedToCamera = true;
      map = game.add.tilemap('unicolevel');
      map.addTilesetImage('Tiles');
      layer1 = map.createLayer('Camada de Tiles 1');
      map.setCollisionByExclusion([0, 12, 14, 32, 35, 36, 37]);
      layer1.resizeWorld();
      self.player = new Player(30000, 700, op);
      self.teacher = new Teacher(22200, 700);
      game.camera.follow(self.player);
      game.add.existing(self.player);
      game.add.existing(self.teacher);
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      game.physics.enable(self.teacher, Phaser.Physics.ARCADE);
      self.player.body.setSize(60, 120, 70, 20);
      self.teacher.body.setSize(60, 120, 70, 20);
      self.player.body.collideWorldBounds= true;
      self.teacher.body.collideWorldBounds= true;
      game.physics.arcade.gravity.y = 500;
      self.player.body.bounce.y = 0.2;
      self.teacher.body.bounce.y = 0.2;
      itens = self.add.group();
      itens.enableBody = true;
      for(let i = 0,f = 0;i < 11;i++, f++) {
        if(f==6) f=0;
        let objeto = itens.create( coordenadas[i].x, coordenadas[i].y, 'objetos', f);
        objeto.data = {item: f};
        objeto.body.gravity.y = 300;
        objeto.body.collideWorldBounds = true;
        objeto.body.bounce.y = 0.8 + Math.random() * 0.2;
      }
    },
    update: function() {
      let self = this,
      cursors = game.input.keyboard.createCursorKeys(),
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      timer = (self.game.time.now-self.inicio);
      if(self.player.x >= 31900) {
        if(pontuacao >= 0) {
          if(self.isMusicOn) {
            self.music.stop();
          }
          ganhou = true;
          game.state.start('result');
        }
        else {
          if(self.isMusicOn) {
            self.music.stop();
          }
          ganhou = false;
          game.state.start('result');
        }
      }
      if(self.teacher.x >= 31900) {
        if(self.isMusicOn) {
          self.music.stop();
        }
        ganhou = false;
        game.state.start('result');
      }
      game.debug.text('Time: ' + (self.game.time.now-self.inicio), 32, 32);
      timeFinal = self.game.time.now-self.inicio;
      game.physics.arcade.collide(self.player, layer1);
      game.physics.arcade.overlap(self.player, itens, this.collectItem, null, this);
      game.physics.arcade.collide(itens, layer1);
      game.physics.arcade.collide(self.teacher, layer1);
      game.physics.arcade.collide(self.teacher, self.player);
      self.player.animations.play('walk');
      self.player.body.velocity.x = 0;
      self.teacher.body.velocity.x = 70;
      self.teacher.animations.play('walk');
      if(cursors.left.isDown) {
        self.player.body.velocity.x -= 380;
        self.player.scale.setTo(1, 1);
      }
      else if(cursors.right.isDown) {
        self.player.body.velocity.x += 380;
        self.player.scale.setTo(-1, 1);
      }
      else {
        self.player.animations.stop();
      }
      if (jumpButton.isDown && self.player.body.onFloor() )
      {
        self.player.body.velocity.y = -500;
        self.player.frame = 4;
        self.player.sfx.jump.play();
      }
      // if(cursors.down.isDown) {
      //   console.log(self.player.body.x + ', ' + self.player.body.y);
      // }
    },
    collectItem: function(player, item) {
      let indexItem = item.data['item'];
      console.log(indexItem);
      if(indexItem == 2 || indexItem == 3) {
        player.coletados.push(indexItem);
        pontuacao-=100;
        player.sfx.coletou2.play();
      }
      else {
        player.coletados.push(indexItem);
        pontuacao+=100;
        player.sfx.coletou1.play();
      }
      item.kill();
    }
  };

  function Player(x, y, op) {
    let player = game.add.sprite(x, y, 'mainCharacter' + op);
    player.scale.setTo(-1, 1);
    player.coletados = [];
    player.frame = 0;
    player.anchor.setTo(.5, 1);
    player.animations.add('walk', [0, 1, 2, 3], 10);
    player.sfx = {};
    player.sfx.jump = game.add.audio('jump');
    player.sfx.coletou1 = game.add.audio('coletou1');
    player.sfx.coletou2 = game.add.audio('coletou2');
    return player;
  }

  function Teacher(x, y) {
    let teacher = game.add.sprite(x, y, 'teacher');
    teacher.scale.setTo(-1, 1);
    teacher.frame = 0;
    teacher.anchor.setTo(.5, 1);
    teacher.animations.add('walk', [0, 1, 2, 3], 10);
    teacher.sfx = {};
    return teacher;
  }

  function gofull() {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen();
    }
    else {
      game.scale.startFullScreen(false);
    }
  }

  function startGame() {
    game.state.start('play');
  }

  game.state.add('boot', bootState);
  game.state.add('load', loadState);
  game.state.add('title', titleState);
  game.state.add('play', playState);
  game.state.add('result', resultState);
  game.state.start('boot');
});
