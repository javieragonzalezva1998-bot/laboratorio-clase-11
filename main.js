const display = document.getElementById("display");
const historial = document.getElementById("historial");

function agregarNumero(valor) {
  const ultimo = display.value.slice(-1);

  // Evitar dos operadores seguidos
  if ("+-*/".includes(valor) && "+-*/".includes(ultimo)) {
    return;
  }

  // Evitar dos puntos seguidos en el mismo número
  if (valor === ".") {
    const partes = display.value.split(/[\+\-\*\/]/);
    const ultimoNumero = partes[partes.length - 1];
    if (ultimoNumero.includes(".")) {
      return;
    }
  }

  display.value += valor;
}

function limpiar() {
  display.value = "";
}

function borrarUltimo() {
  display.value = display.value.slice(0, -1);
}

function calcular() {
  try {
    if (display.value.trim() === "") return;

    const expresion = display.value;

    if (/\/0(?!\d)/.test(expresion)) {
      display.value = "Error";
      return;
    }

    const resultado = eval(expresion);
    historial.innerHTML = `<p>${expresion} = ${resultado}</p>` + historial.innerHTML;
    display.value = resultado;
  } catch {
    display.value = "Error";
  }
}

function toggleModo() {
  document.body.classList.toggle("oscuro");
  const modoOscuro = document.body.classList.contains("oscuro");
  localStorage.setItem("modoOscuro", modoOscuro);
}

// Cargar modo guardado
window.addEventListener("load", () => {
  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("oscuro");
  }
});

// Soporte con teclado
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
    agregarNumero(e.key);
  } else if (e.key === "Enter") {
    calcular();
  } else if (e.key === "Backspace") {
    borrarUltimo();
  } else if (e.key === "Escape") {
    limpiar();
  }
});