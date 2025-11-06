 // Controle de cartas já digitadas e timeouts
  const typeWriterStatus = {
    carta1: false,
    carta2: false,
    carta3: false
  };
  const typeWriterTimeouts = {
    carta1: null,
    carta2: null,
    carta3: null
  };

  // Função de máquina de escrever
  function typeWriter(element, cartaId){
    // Cancela qualquer digitação anterior
    if(typeWriterTimeouts[cartaId]){
      clearTimeout(typeWriterTimeouts[cartaId]);
      typeWriterTimeouts[cartaId] = null;
    }

    const text = element.getAttribute('data-text');
    element.textContent = "";
    let i = 0;
    const speed = 80;

    function write(){
      if(i < text.length){
        element.textContent += text.charAt(i);
        i++;
        typeWriterTimeouts[cartaId] = setTimeout(write, speed);
      } else {
        typeWriterStatus[cartaId] = true;
        typeWriterTimeouts[cartaId] = null;
      }
    }

    write();
  }

  // Abrir carta
  function abrirCarta(n){
    // Fecha todas as cartas
    [1,2,3].forEach(i => {
      const el = document.getElementById('carta'+i);
      if(el){ 
        el.classList.remove('ativa'); 
        el.setAttribute('aria-hidden', 'true'); 
      }
    });

    // Abre a carta selecionada
    const carta = document.getElementById('carta'+n);
    if(carta){ 
      carta.classList.add('ativa'); 
      carta.setAttribute('aria-hidden', 'false'); 
      typeWriter(carta.querySelector('p'), 'carta'+n);
    }
  }

  // Fechar carta
  function fecharCarta(n){
    const carta = document.getElementById('carta'+n);
    if(carta){ 
      carta.classList.remove('ativa'); 
      carta.setAttribute('aria-hidden', 'true'); 
    }
  }

  // Fechar ao clicar fora da carta
  document.addEventListener('click', (ev)=>{
    ['carta1','carta2','carta3'].forEach(id=>{
      const el = document.getElementById(id);
      if(el && el.classList.contains('ativa')){
        if(!el.contains(ev.target) && !ev.target.closest('.presente')){
          el.classList.remove('ativa');
          el.setAttribute('aria-hidden','true');
        }
      }
    });
  });