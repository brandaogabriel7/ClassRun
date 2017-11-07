let scriptGame;
$(document).ready(function(){
    $('#modal-cred').modal();
    let $bios = [{
      botao: $('#botao-alice'),
      biografia: $('#alice-bio')
    },
    {
      botao: $('#botao-dornelas'),
      biografia: $('#dornelas-bio')
    },
    {
      botao: $('#botao-babi'),
      biografia: $('#babi-bio')
    },
    {
      botao: $('#botao-brandao'),
      biografia: $('#brandao-bio')
    }],
    $voltar = $('.voltar'),
    $ulbotao = $('#ul-botoes');

    $voltar.click(function(){
      $ulbotao.css("display", "inline");
      for(let i=0; i<$bios.length; i++){
        $bios[i].biografia.removeClass('visivel');
        $bios[i].biografia.addClass('invisivel');
      }
    });

    for(let i=0; i<$bios.length; i++){
      $bios[i].botao.click(function(e){
        $bios[i].biografia.removeClass('invisivel');
        $bios[i].biografia.addClass('visivel');
        $ulbotao.css("display", "none");
      });
    }
// Para resolver o problema de sincronia dos códigos e do momento em que o Canvas é adicionado eu criei essa função para acrescentar
// o canvas só quando o jogo inciar. Todo o resto da página fica invisível.
    $('#playButtonMenu').click(function() {
      $('.geral').addClass('invisivel');
      scriptGame = document.createElement('script');
      scriptGame.src = 'js/game.js';
      scriptGame.name = 'scriptGame';
      document.body.appendChild(scriptGame);
    });
});
