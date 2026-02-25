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
  switch (carta) {
    case "J":
    case "Q":
    case "K":
      return 10;

    case "A":
      return 11;

    default:
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
    console.log("Te pasaste de 21. Pierdes ");
    rl.close();
    return;
  }

 rl.question("¿Pedir carta (p) o plantarse (s)? ", (respuesta) => {
  switch (respuesta) {
    case "p":
      let carta = sacarCarta();
      cartasJugador.push(carta);
      puntajeJugador = sumarPuntaje(puntajeJugador, carta);
      turnoJugador();
      break;

    case "s":
      console.log("Te plantas con", puntajeJugador);
      rl.close();
      turnoDealer();
      break;

    default:
      console.log("Opción no válida, escribe 'p' o 's'");
      turnoJugador();
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

 switch (true) {
  case puntajeDealer > 21:
    console.log("El dealer se pasó. ¡Ganaste!");
    break;

  case puntajeJugador > 21:
    console.log("Te pasaste. Pierdes");
    break;

  case puntajeJugador > puntajeDealer:
    console.log("¡Ganaste eres un duro!");
    break;

  case puntajeJugador < puntajeDealer:
    console.log("Perdiste valeee");
    break;

  default:
    console.log("Empate mmmm");
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