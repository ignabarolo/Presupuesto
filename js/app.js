const ingresos = [
//   new Ingreso("Salario", 80000),
//   new Ingreso("Venta Playstation", 20000)
];
const egresos = [
//   new Egreso("Alquiler Departamento", 25000),
//   new Egreso("Pago Luz", 30000)
];

//CARGA DE APLICACION
let cargarApp = () => {
  cargarCabecero();
  cargarIngreso();
  cargarEgreso();
};

//CABECERO
let totalIngresos = () => {
  let totalIngreso = 0;

  for (let auxIngreso of ingresos) {
    totalIngreso += auxIngreso.valor;
  }
  console.log("Total Ingresos: " + totalIngreso);
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;

  for (let auxEgreso of egresos) {
    totalEgreso += auxEgreso.valor;
  }

  console.log("Total Egresos: " + totalEgreso);
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuestoTotal = totalIngresos() - totalEgresos();
  if (presupuestoTotal > 0) {
    document.getElementById("presupuesto").innerHTML = `+ ${formatoMoneda(
      presupuestoTotal
    )}`;
  } else {
    document.getElementById("presupuesto").innerHTML =
      formatoMoneda(presupuestoTotal);
  }
  console.clear();

  let ingresosTotal = totalIngresos();
  document.getElementById("ingresos").innerHTML = `+ ${formatoMoneda(
    ingresosTotal
  )}`;

  let EgresosTotal = totalEgresos();
  document.getElementById("egresos").innerHTML = `- ${formatoMoneda(
    EgresosTotal
  )}`;

  if (egresos.length != 0) {
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("porcentajeEgresos").innerHTML =
      formatoPorcentaje(porcentajeEgreso);
  } else {
    document.getElementById("porcentajeEgresos").innerHTML = '&nbsp;';
  }
  
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngreso = () => {
  let ingresosHTML = "";

  for (let auxIngreso of ingresos) {
    ingresosHTML += crearIngresoHTML(auxIngreso);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline" onclick="eliminarIngreso(${
                  ingreso.id
                })"></ion-icon>
            </button>
        </div>
        </div>
    `;

  return ingresoHTML;
};

const cargarEgreso = () => {
  let egresosHTML = "";

  for (let auxEgreso of egresos) {
    egresosHTML += crearEgresoHTML(auxEgreso);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(
              egreso.valor / totalEgresos()
            )}</div>
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline" onclick="eliminarEgreso(${
                  egreso.id
                })"></ion-icon>
            </button>
        </div>
        </div>
    `;

  return egresoHTML;
};

const eliminarIngreso = (id) => {
  let indice = ingresos.findIndex((auxIngreso) => auxIngreso === id);
  ingresos.splice(indice, 1);

  cargarCabecero();
  cargarIngreso();
};
const eliminarEgreso = (id) => {
  let indice = egresos.findIndex((auxEgreso) => auxEgreso === id);
  egresos.splice(indice, 1);

  cargarCabecero();
  cargarEgreso();
};

const agregarDatos = () => {
  let forma = document.getElementById("forma");
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];

  if (descripcion.value != "" && valor.value != "") {
    if (tipo.value === "ingreso") {
      let ingreso = new Ingreso(descripcion.value, +valor.value);
      ingresos.push(ingreso);
    } else if (tipo.value === "egreso") {
      let egreso = new Egreso(descripcion.value, +valor.value);
      egresos.push(egreso);
    }

    cargarApp();
  }
};
