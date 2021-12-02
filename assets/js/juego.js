

 const miModulo = (()=>{

     'use strict';

     let deck = [];

     const tipos = [ 'C', 'D', 'H', 'S'],
          especiales = [ 'A', 'J', 'Q', 'K'];

     let puntosJugadores = [];

     //Referencias para el Html
     const btnPedir = document.querySelector('#btnPedir'),
        // btnNuevo = document.querySelector('#btnNuevo'),
           btnDetener = document.querySelector('#btnDetener');

     const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');
     
   //Esta función inicia el juego
     const iniciarJuego = (numJugadores = 2)=>{

       deck = crearDeck();

       puntosJugadores = [];

       for(let i = 0; i < numJugadores; i++){
           puntosJugadores.push(0);
       };

       puntosHTML.forEach(elem => elem.innerText = 0);

       divCartasJugadores.forEach(elem => elem.innerHTML = '');

       btnPedir.disabled = false;
       btnDetener.disabled = false;
    };

   //Esta Función crea una nueva baraja
    const crearDeck = ()=>{
       
        deck = [];

        for( let i = 2; i <= 10; i++){

        for (let tipo of tipos) {
            deck.push ( i + tipo );
        };
      };

       for( let tipo of tipos){

        for (let especial of especiales) {
            deck.push( especial + tipo )
        };
      };

      return _.shuffle( deck );
    };

    //Esta Función me permite darme una carta
    const pedirCarta = ()=>{

     if(deck.length === 0){
        throw 'No hay cartas en el deck'
     };

      return deck.pop();
    };

    const valorCarta = (carta)=>{

     const valor = carta.substring(0, carta.length - 1);

     return ( isNaN( valor ) ) ? 
            ( valor === 'A') ? 11 : 10 
            : valor * 1;
    };

    //Puntos de los Jugadores
    const acumularPuntos = (carta,turno)=>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    // Crear una Carta
    const crearCarta = (carta, turno)=>{

        const imgCarta = document.createElement('img');
              imgCarta.src = `assets/cartas/${carta}.png`;
              imgCarta.classList.add('carta');
              divCartasJugadores[turno].append(imgCarta)
    };

    const determinarGanador = ()=>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) alert ('Nadie Gana');
            else if (puntosMinimos > 21) alert ('La Computadora Gana');
            else if (puntosComputadora > 21) alert ('El Jugador Gana');
            else alert ('Computadora Gana');
        },100);
    };

    //TurnoComputadora
     const TurnoComputadora = (puntosMinimos)=>{

          let puntosComputadora = 0;

          do {

           const carta = pedirCarta();

           puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);

           crearCarta(carta, puntosJugadores.length -1 );
  
          }  while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)); 

           determinarGanador();
    };
  
    //Eventos

    btnPedir.addEventListener('click', ()=>{
     
           const carta = pedirCarta();

           const puntosJugador = acumularPuntos(carta, 0);

           crearCarta(carta, 0);

           if(puntosJugador > 21){
              console.warn('Lo siento mucho, perdiste');
              btnPedir.disabled = true;
              btnDetener.disabled = true;
              TurnoComputadora(puntosJugador);
           }
            else if (puntosJugador === 21){
              console.warn('21, Genial');
              btnPedir.disabled = true;
              btnDetener.disabled = true;
              TurnoComputadora(puntosJugador)
            };     
    });

    btnDetener.addEventListener('click', ()=>{

             btnDetener.disabled = true;
             btnPedir.disabled = true;

             TurnoComputadora(puntosJugadores [0]);
    });

    return{
         nuevoJuego: iniciarJuego
    };
})();






