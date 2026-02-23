
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

function sacarCarta() {
  let indice = Math.floor(Math.random() * cartas.length);
  return cartas[indice];
}

function valorCarta(carta) {
  if (carta === "J" || carta === "Q" || carta === "K") {
    return 10;
  } else if (carta === "A") {
    return 11;
  } else {
    return carta;
  }
}

function sumarPuntaje(puntaje, carta) {
  return puntaje + valorCarta(carta);
}

let cartasJugador = [];
let puntajeJugador = 0;

let cartasDealer = [];
let puntajeDealer = 0;

for (let i = 0; i < 2; i++) {
  let cartaJugador = sacarCarta();
  cartasJugador.push(cartaJugador);
  puntajeJugador = sumarPuntaje(puntajeJugador, cartaJugador);
  puntajeJugador = ajustarAs(cartasJugador, puntajeJugador);

  let cartaDealer = sacarCarta();
  cartasDealer.push(cartaDealer);
  puntajeDealer = sumarPuntaje(puntajeDealer, cartaDealer);
  puntajeDealer = ajustarAs(cartasDealer, puntajeDealer);
}

function turnoJugador() {
  console.log("\n--- Turno del jugador ---");
  console.log("Tus cartas:", cartasJugador);
  console.log("Tu puntaje:", puntajeJugador);

  if (puntajeJugador > 21) {
    console.log("Te pasaste de 21. Pierdes ❌");
    rl.close();
    return;
  }

  rl.question("¿Pedir carta (p) o plantarse (s)? ", (respuesta) => {
    if (respuesta === "p") {
      let carta = sacarCarta();
      cartasJugador.push(carta);
      puntajeJugador = sumarPuntaje(puntajeJugador, carta);
      turnoJugador();
    } else {
      console.log("Te plantas con", puntajeJugador);
      rl.close();
      turnoDealer();
    }
  });
}

function turnoDealer() {
  console.log("\n--- Turno del dealer ---");

  while (puntajeDealer < 17) {
    let carta = sacarCarta();
    cartasDealer.push(carta);
    puntajeDealer = sumarPuntaje(puntajeDealer, carta);
  }

  console.log("Cartas del dealer:", cartasDealer);
  console.log("Puntaje del dealer:", puntajeDealer);

  determinarGanador();
}

function determinarGanador() {
  console.log("\n--- Resultado final ---");

  if (puntajeDealer > 21) {
    console.log("El dealer se pasó. ¡Ganaste! 🎉");
  } else if (puntajeJugador > 21) {
    console.log("Te pasaste. Pierdes ❌");
  } else if (puntajeJugador > puntajeDealer) {
    console.log("¡Ganaste eres un duro! 🎉");
  } else if (puntajeJugador < puntajeDealer) {
    console.log("Perdiste valeee 😢");
  } else {
    console.log("Empate mmmm 🤝");
  }
}
function ajustarAs(cartas, puntaje) {
  let cantidadAs = cartas.filter(carta => carta === "A").length;

  while (puntaje > 21 && cantidadAs > 0) {
    puntaje -= 10; // el As pasa de 11 a 1
    cantidadAs--;
  }

  return puntaje;
}
turnoJugador();