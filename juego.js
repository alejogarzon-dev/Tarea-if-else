const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let ronda = 1;

function jugarRonda() {
  if (ronda > 5) {
    mostrarGanador();
    rl.close();
    return;
  }

  console.log(`\n🎯 RONDA ${ronda}`);

  rl.question("Jugador 1 presiona ENTER para lanzar el dado ", () => {
    let dado1 = lanzarDado();
    puntajeJugador1 += dado1;
    console.log("Jugador 1 lanzó:", dado1);

    rl.question("Jugador 2 presiona ENTER para lanzar el dado ", () => {
      let dado2 = lanzarDado();
      puntajeJugador2 += dado2;
      console.log("Jugador 2 lanzó:", dado2);

      console.log("Puntaje Jugador 1:", puntajeJugador1);
      console.log("Puntaje Jugador 2:", puntajeJugador2);

      ronda++;
      jugarRonda();
    });
  });
}

function mostrarGanador() {
  console.log("\n🏁 RESULTADO FINAL");

  if (puntajeJugador1 > puntajeJugador2) {
    console.log("🏆 El Jugador 1 es la monda ganó");
  } else if (puntajeJugador2 > puntajeJugador1) {
    console.log("🏆 El Jugador 2 es la monda ganó");
  } else {
    console.log("🤝 Empatais");
  }
}

console.log("🎲 JUEGO DE DADOS");
jugarRonda();