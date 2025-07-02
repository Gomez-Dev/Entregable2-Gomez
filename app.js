const formIngreso = document.querySelector(".form-ingreso");
const formGasto = document.querySelector(".form-gasto");

// mostrar lo datos cargados
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
