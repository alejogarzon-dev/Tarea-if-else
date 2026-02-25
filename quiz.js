const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const preguntas = [
  {
    pregunta: "¿Cómo se dice 'perro' en inglés?",
    opciones: ["a) Cat", "b) Dog", "c) Bird", "d) Fish"],
    correcta: "b"
  },
  {
    pregunta: "¿Cómo se dice 'casa' en inglés?",
    opciones: ["a) Car", "b) Tree", "c) House", "d) Door"],
    correcta: "c"
  },
  {
    pregunta: "¿Cómo se dice 'agua' en inglés?",
    opciones: ["a) Milk", "b) Juice", "c) Water", "d) Coffee"],
    correcta: "c"
  },
  {
    pregunta: "¿Cómo se dice 'libro' en inglés?",
    opciones: ["a) Book", "b) Pen", "c) Table", "d) Chair"],
    correcta: "a"
  },
  {
    pregunta: "¿Cómo se dice 'rojo' en inglés?",
    opciones: ["a) Blue", "b) Green", "c) Yellow", "d) Red"],
    correcta: "d"
  }
];

let indicePregunta = 0;
let puntaje = 0;

function hacerPregunta() {
  if (indicePregunta === preguntas.length) {
    mostrarResultado();
    rl.close();
    return;
  }

  const p = preguntas[indicePregunta];

  console.log(`\nPregunta ${indicePregunta + 1}`);
  console.log(p.pregunta);

  p.opciones.forEach(opcion => console.log(opcion));

  rl.question("Tu respuesta (a, b, c o d): ", (respuesta) => {
    if (respuesta === p.correcta) {
      console.log(" Correcto");
      puntaje++;
    } else {
      console.log("Incorrecto");
    }

    indicePregunta++;
    hacerPregunta();
  });
}

function mostrarResultado() {
  console.log("\n RESULTADO FINAL");
  console.log(`Respuestas correctas: ${puntaje} de 5`);
  console.log(`Nota final: ${puntaje}`);
}

console.log(" QUIZ DE TRADUCCIÓN ESPAÑOL → INGLÉS");
hacerPregunta();