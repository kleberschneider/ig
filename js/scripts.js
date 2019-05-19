
window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 50;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 3 && current < 12) return 'Um bom dia por aí!';
    if (current >= 12 && current < 18) return 'Uma boa tarde por aí!';
    if (current >= 18 || current < 3) return 'Uma boa noite por aí!';
  }


  var messages = [
    'Muito bem! :)',
    'Cê me encontrou, Kleber Schneider aqui! 🙋🏻',
    'Eu projeto e codifico coisas na web.',
    'Por exemplo, posso construir:',
    'lojas virtuais, portfolios, aplicações web...',
    'Não tenho muitos amigos, mas aposto que você tem.',
    'Se me indicar para alguém que conheça,',
    'te pago um chocolate.',
    'É só me enviar um e-mail p/ falar sobre isso.',
    'Quem sabe essa pessoa possa ser você mesm@.',
    'Pense na aposentaria que não vamos ter e perceba',
    'hoje que nossa geração precisa ser empreendedora.',
    'Enfim...',
    'Se não quiser falar sobre seu negócio online,',
    'me envie uma foto do seu drink com a porção de batata frita depois.',
    'Vou coracionar todas essas fotos.',
    'Obrigado por aparecer por aqui. 😺',
  /*  '<a target="_blank" href="https://twitter.com/kleberschneider">twitter.com/kleberschneider</a><br><a target="_blank" href="https://codepen.io/kleberschneider">codepen.io/kleberschneider</a><br><a target="_blank" href="https://github.com/kleberschneider">github.com/kleberschneider</a>', */
    getCurrentTime(),
    '👀 Aguardo seu <a href="mailto:via.instagram@pm.me?subject=ADOREI!%20Vamos%20conversar!!!&body=Hey,%20Kleber!%20:)%0D%0ASei%20que%20seu%20preço%20é%20o%20mais%20barato,%20que%20você%20entrega%20rápido%20e%20que%20você%20faz%20um%20ótimo%20trabalho.%0D%0A%0D%0AAgora,%20quero%20te%20passar:%0D%0A%0D%0AUm%20contato%20para%20job%20para%20me%20dar%20comissão:%20%0D%0AUm%20job%20para%20mim%20com%20desconto:%20%0D%0AUma%20dúvida%20minha:%20%0D%0A%0D%0A%0D%0A">contato</a>. 👋'
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 50}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 50);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

}
