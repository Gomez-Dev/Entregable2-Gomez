const formIngreso = document.getElementById("agregar-ingreso");
const formGasto = document.getElementById("agregar-gasto");
const nombreIngreso = document.getElementById("nombre-ingreso");
const montoIngreso = document.getElementById("monto-ingreso");
const fechaIngreso = document.getElementById("fecha-ingreso");
const nombreGasto = document.getElementById("nombre-gasto");
const montoGasto = document.getElementById("monto-gasto");
const fechaGasto = document.getElementById("fecha-gasto");
const saldoActual = document.getElementById("saldo-actual");
const gastoTotal = document.getElementById("gasto-total");
const tablaRegistros = document.getElementById("tabla-registros");
const contenedorDolar = document.getElementById("carousel-dolares");

let transacciones = [];

function mostrarAlerta(tipo, mensaje) {
  const iconos = {
    exito: "success",
    error: "error",
    advertencia: "warning",
    info: "info",
  };

  Swal.fire({
    icon: iconos[tipo] || "info",
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
}

function validarTransaccion(nombre, monto) {
  if (!nombre || nombre.trim() === "") {
    mostrarAlerta("error", "El nombre no puede estar vacío");
    return false;
  }
  if (isNaN(monto) || monto <= 0) {
    mostrarAlerta("error", "El monto debe ser un número mayor que 0");
    return false;
  }
  return true;
}

function formatearMonto(monto) {
  return monto.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  const dia = String(fechaObj.getDate()).padStart(2, "0");
  const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const anio = fechaObj.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function agregarTransaccion(tipo, nombre, monto, fecha) {
  const nuevaTransaccion = {
    id: Date.now(),
    tipo,
    nombre,
    monto: parseFloat(monto),
    fecha,
  };
  transacciones.push(nuevaTransaccion);
  guardarTransacciones();
  mostrarAlerta("exito", `${tipo} agregado correctamente`);
  renderizarTabla();
  actualizarBalances();
}

function eliminarTransaccion(id) {
  transacciones = transacciones.filter((trans) => trans.id !== id);
  guardarTransacciones();
  mostrarAlerta("exito", "Registro eliminado");
  renderizarTabla();
  actualizarBalances();
}

function guardarTransacciones() {
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

function cargarTransacciones() {
  const datos = localStorage.getItem("transacciones");
  if (datos) {
    transacciones = JSON.parse(datos);
  }
}

function actualizarBalances() {
  const ingresos = transacciones
    .filter((t) => t.tipo === "Ingreso")
    .reduce((acc, curr) => acc + curr.monto, 0);
  const gastos = transacciones
    .filter((t) => t.tipo === "Gasto")
    .reduce((acc, curr) => acc + curr.monto, 0);

  saldoActual.textContent = formatearMonto(ingresos - gastos);
  gastoTotal.textContent = formatearMonto(gastos);
}

function renderizarTabla() {
  tablaRegistros.innerHTML = "";

  transacciones.forEach(({ id, tipo, nombre, monto, fecha }, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${tipo}</td>
      <td>${nombre}</td>
      <td>${formatearMonto(monto)}</td>
      <td>${formatearFecha(fecha)}</td>
      <td>
        <button class="btn btn-danger btn-sm eliminar-btn" data-id="${id}">
          Eliminar
        </button>
      </td>
    `;

    tablaRegistros.appendChild(fila);
  });

  const botonesEliminar = document.querySelectorAll(".eliminar-btn");
  botonesEliminar.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      confirmarEliminacion(id);
    })
  );
}

function confirmarEliminacion(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarTransaccion(id);
    }
  });
}

formIngreso.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreIngreso.value.trim();
  const monto = parseFloat(montoIngreso.value);
  const fecha = fechaIngreso.value;

  if (!validarTransaccion(nombre, monto)) return;

  agregarTransaccion("Ingreso", nombre, monto, fecha);

  formIngreso.reset();
});

formGasto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreGasto.value.trim();
  const monto = parseFloat(montoGasto.value);
  const fecha = fechaGasto.value;

  if (!validarTransaccion(nombre, monto)) return;

  agregarTransaccion("Gasto", nombre, monto, fecha);

  formGasto.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  cargarTransacciones();
  renderizarTabla();
  actualizarBalances();
  cargarCotizacionDolar();
});

async function cargarCotizacionDolar() {
  try {
    const respuesta = await fetch("https://api.bluelytics.com.ar/v2/latest");
    if (!respuesta.ok) throw new Error("Error al obtener cotización");

    const data = await respuesta.json();

    contenedorDolar.innerHTML = "";

    for (const tipo in data) {
      if (data.hasOwnProperty(tipo)) {
        const cotizacion = data[tipo];
        if (
          cotizacion.value_buy !== undefined &&
          cotizacion.value_sell !== undefined
        ) {
          const div = document.createElement("div");
          div.classList.add("cotizacion-item");
          div.innerHTML = `
            <strong>Dólar ${
              tipo.charAt(0).toUpperCase() + tipo.slice(1)
            }</strong>: 
            Compra: ${cotizacion.value_buy.toFixed(2)} - 
            Venta: ${cotizacion.value_sell.toFixed(2)}
          `;
          contenedorDolar.appendChild(div);
        }
      }
    }
  } catch (error) {
    contenedorDolar.textContent = "No se pudo cargar la cotización del dólar.";
    console.error(error);
  }
}
