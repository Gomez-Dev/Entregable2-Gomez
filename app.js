const formIngreso = document.querySelector(".form-ingreso");
const formGasto = document.querySelector(".form-gasto");

// muestra los datos cargados
datosGuardados();

// formularios
formIngreso.addEventListener("submit", (e) => {
  e.preventDefault();

  const ingreso = {
    tipo: "Ingreso",
    nombre: document.getElementById("nombre-ingreso").value,
    monto: parseFloat(document.getElementById("monto-ingreso").value),
    fecha: document.getElementById("fecha-ingreso").value,
  };

  guardarEnLocalStorage("ingresos", ingreso);
  formIngreso.reset();
});

formGasto.addEventListener("submit", (e) => {
  e.preventDefault();

  const gasto = {
    tipo: "Gasto",
    nombre: document.getElementById("nombre-gasto").value,
    monto: parseFloat(document.getElementById("monto-gasto").value),
    fecha: document.getElementById("fecha-gasto").value,
  };

  guardarEnLocalStorage("gastos", gasto);
  formGasto.reset();
});

// guardar datos tabla
function guardarEnLocalStorage(clave, nuevoItem) {
  const listaActual = JSON.parse(localStorage.getItem(clave)) || [];
  listaActual.push(nuevoItem);
  localStorage.setItem(clave, JSON.stringify(listaActual));
  datosGuardados();
}

// mostrar tabla en pantalla
function datosGuardados() {
  const ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

  const tabla = document.getElementById("tabla-registros");
  if (!tabla)
    return console.error("No se encontró la tabla con id 'tabla-registros'");

  tabla.innerHTML = "";

  let contador = 1;

  [...ingresos, ...gastos].forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
          <th scope="row">${contador++}</th>
          <td>${item.tipo}</td>
          <td>${item.nombre}</td>
          <td>$${item.monto}</td>
          <td>${item.fecha}</td>
        `;
    tabla.appendChild(fila);
  });
}
