// const nombre = prompt("Cual es tu nombre: ");
// console.log(`Hola ${nombre} a contunuación carga sueldo`);

// let sueldo = parseInt(prompt("Ingreso: "));
// let sueldoInicial = sueldo;
// console.log(`Tu dinero actual es $${sueldo}`);

// let funcionando = true;

// // Verifica el tipo de gasto y evalua si es corectamente cargado y ejecuta el calculo para el resto
// function misGastos() {
//   const tipoGasto = ["Servicios", "Comida", "Alquiler", "Transporte"];
//   console.log("Define tu tipo de gasto: ");

//   let idx = 1;
//   for (let gasto of tipoGasto) {
//     console.log(idx + ". " + gasto);
//     idx++;
//   }
//   let definir;
//   while (true) {
//     definir = parseInt(
//       prompt("Ingresa el número que corresponda al tipo de gasto: ")
//     );

//     if (!isNaN(definir) && definir >= 1 && definir <= tipoGasto.length) {
//       break;
//     } else {
//       alert("El número ingresado no es valido, intenta de nuevo!!!");
//     }
//   }
//   let egreso = parseInt(prompt("Monto gastado: "));

//   let tipoSeleccionado = tipoGasto[definir - 1];
//   console.log(`Gasto cargado: ${tipoSeleccionado} - $${egreso}`);

//   function calcularResto() {
//     sueldo = sueldo - egreso;
//     console.log(`Su resto es $${sueldo}`);

//     if (sueldo <= 0) {
//       alert(
//         `Te quedaste sin dinero. Saldo actual es: $${sueldo}. El programa se cerrará.`
//       );
//       funcionando = false;
//       return;
//     }
//   }

//   calcularResto();
// }

// misGastos();

// // Funcion para ingrsos(Recordar que debe agregarse a su monto actual)

// // Esta porción de codigo verifica si quiere agregar más gastos o no
// function otroGasto() {
//   while (funcionando) {
//     let nuevoGasto = prompt("¿Desea agregar otro gasto?\n1 - Sí\n2 - No");

//     if (nuevoGasto === "1") {
//       misGastos();
//       if (funcionando) {
//         alert("Agregando otro gasto...");
//       }
//     } else if (nuevoGasto === "2") {
//       alert(`Programa finalizado. Sueldo final: $${sueldo}`);
//       funcionando = false;
//     } else {
//       alert("Opción no válida. El programa se cerrará.");
//       funcionando = false;
//     }
//   }
// }

// otroGasto();

// console.log("Programa finalizado!");

//const url = "https://dolarapi.com";

fetch("https://dolarapi.com/v1/dolares")
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
  });
