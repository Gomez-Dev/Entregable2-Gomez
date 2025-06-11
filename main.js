const nombre = prompt("Cual es tu nombre: ");
console.log(`Hola ${nombre} a contunuación carga sueldo`);

let sueldo = parseInt(prompt("Ingreso: "));
let sueldoInicial = sueldo;
console.log(`Tu dinero actual es $${sueldo}`);

let funcionando = true;

function misGastos() {
  const tipoGasto = ["Servicios", "Comida", "Alquiler", "Transporte"];
  console.log("Define tu tipo de gasto: ");

  let idx = 1;
  for (let gasto of tipoGasto) {
    console.log(idx + ". " + gasto);
    idx++;
  }
  let definir;
  while (true) {
    definir = parseInt(
      prompt("Ingresa el número que corresponda al tipo de gasto: ")
    );

    if (!isNaN(definir) && definir >= 1 && definir <= tipoGasto.length) {
      break;
    } else {
      alert("El número ingresado no es valido, intenta de nuevo!!!");
    }
  }
  let egreso = parseInt(prompt("Monto gastado: "));

  let tipoSeleccionado = tipoGasto[definir - 1];
  console.log(`Gasto cargado: ${tipoSeleccionado} - $${egreso}`);

  function calcularResto() {
    sueldo = sueldo - egreso;
    console.log(`Su resto es $${sueldo}`);

    if (sueldo <= 0) {
      alert(
        `Te quedaste sin dinero. Saldo actual es: $${sueldo}. El programa se cerrará.`
      );
      funcionando = false;
      return;
    }
  }
  //alert("Agregando otro gasto...");
  calcularResto();
}

misGastos();

function otroGasto() {
  while (funcionando) {
    let nuevoGasto = prompt("¿Desea agregar otro gasto?\n1 - Sí\n2 - No");

    if (nuevoGasto === "1") {
      misGastos();
      if (funcionando) {
        alert("Agregando otro gasto...");
      }
    } else if (nuevoGasto === "2") {
      alert(`Programa finalizado. Sueldo final: $${sueldo}`);
      funcionando = false;
    } else {
      alert("Opción no válida. El programa se cerrará.");
      funcionando = false;
    }
  }
}

//misGastos();
otroGasto();

console.log("Programa finalizado!");
