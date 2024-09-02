const carritoDeCompras = [];
const carritoDiv = document.getElementById("carrito");

// Cargar carrito desde localStorage al iniciar
window.onload = cargarCarrito;

if (carritoDeCompras.length === 0) {
    carritoDiv.innerHTML = "<p>Tu carrito de compras está vacío</p>";
} else {
    mostrarProductos();
}

let botonagregar = document.getElementById("bagregar");
botonagregar.addEventListener("click", agregarProducto);

let botoneliminar = document.getElementById("beliminar");
botoneliminar.addEventListener("click", eliminarProducto);

let botonvaciar = document.getElementById("bvaciar");
botonvaciar.addEventListener("click", vaciarcarrito);

let botonbuscar = document.getElementById("bbuscar");
botonbuscar.addEventListener("click", buscarencarrito);

let botonfiltrar = document.getElementById("bfiltrar");
botonfiltrar.addEventListener("click", filtrarencarrito);

let botonmostrar = document.getElementById("bmostrar");
botonmostrar.addEventListener("click", mostrarProductos);

function agregarProducto() {
    let idinv = tomaridinv();
    let nombinv = tomarnombinv();
    if ((nombinv != "") && (idinv != "")) {
        const producto = { id: idinv, nombre: nombinv };
        carritoDeCompras.push(producto);
        mensajeresultado("<h3>Articulo agregado</h3>");
        guardarCarrito();
    } else {
        mensajeresultado("<h3>Debes completar ambos campos para agregar el articulo</h3>");
    }
    mostrarProductos();
    limpiarcampos();
}

function eliminarProducto() {
    let idinv = tomaridinv();
    let nombinv = tomarnombinv().toLowerCase().trim();
    if ((nombinv != "") && (idinv == "")) {
        let indice = -1;
        for (let i = 0; i < carritoDeCompras.length; i++) {
            if (carritoDeCompras[i].nombre === nombinv) {
                indice = i;
                break;
            }
        }
        if (indice !== -1) {
            carritoDeCompras.splice(indice, 1);
            mensajeresultado("<h3>Articulo eliminado</h3>");
            guardarCarrito();
        } else {
            mensajeresultado("<h3>El articulo ingresado no existe</h3>");
        }
    }
    if ((nombinv == "") && (idinv != "")) {
        let indice = -1;
        for (let i = 0; i < carritoDeCompras.length; i++) {
            if (carritoDeCompras[i].id === idinv) {
                indice = i;
                break;
            }
        }
        if (indice !== -1) {
            carritoDeCompras.splice(indice, 1);
            mensajeresultado("<h3>Articulo eliminado</h3>");
            guardarCarrito();
        } else {
            mensajeresultado("<h3>El articulo ingresado no existe</h3>");
        }
    }
    if ((nombinv != "") && (idinv != "")) {
        let indice = -1;
        for (let i = 0; i < carritoDeCompras.length; i++) {
            if (carritoDeCompras[i].id === idinv && carritoDeCompras[i].nombre === nombinv) {
                indice = i;
                break;
            }
        }
        if (indice !== -1) {
            carritoDeCompras.splice(indice, 1);
            mensajeresultado("<h3>Articulo eliminado</h3>");
            guardarCarrito();
        } else {
            mensajeresultado("<h3>El articulo ingresado no existe</h3>");
        }
    }
    if ((nombinv == "") && (idinv == "")) {
        mensajeresultado("<h3>Debes ingresar al menos un parametro para encontrar el articulo a eliminar</h3>");
    }
    mostrarProductos();
    limpiarcampos();
}

function mostrarProductos() {
    const carritoDiv = document.getElementById("carrito");
    if (carritoDeCompras.length === 0) {
        carritoDiv.innerHTML = "<p>Tu carrito de compras está vacío</p>";
    } else {
        let mensaje = `<h3>Tu carrito de compras tiene ${carritoDeCompras.length} articulos: </h3>`;
        mensaje += "<p>ID - Nombre</p>";
        mensaje += "<ul>";
        for (const art of carritoDeCompras) {
            mensaje += `<li>${art.id} - ${art.nombre}</li>`;
        }
        mensaje += "</ul>";
        carritoDiv.innerHTML = mensaje;
    }
}

function limpiarcampos() {
    let idin = document.getElementById("ID");
    let nombin = document.getElementById("nombre");
    idin.value = "";
    nombin.value = "";
}

function vaciarcarrito() {
    limpiarcampos();
    carritoDeCompras.length = 0;
    mostrarProductos();
    mensajeresultado("");
    guardarCarrito();
}

let mensajeresultado = parametro => {
    const errores = document.getElementById("errores");
    errores.innerHTML = parametro;
}

function tomaridinv() {
    let idin = document.getElementById("ID");
    let idinv = idin.value;
    return idinv;
}

function tomarnombinv() {
    let nombin = document.getElementById("nombre");
    let nombinv = nombin.value;
    return nombinv;
}

function buscarencarrito() {
    const nombinv = tomarnombinv();
    const busc = carritoDeCompras.find(el => el.nombre.toLowerCase().trim() === nombinv);
    const carritoDiv = document.getElementById("carrito");
    
    if (busc === undefined) {
        carritoDiv.innerHTML = "<p>No se encontraron coincidencias</p>";
    } else {
        let mensaje = `<h3>Se encontraron coincidencias:</h3>`;
        mensaje += "<p>ID - Nombre</p>";
        mensaje += `<ul><li>${busc.id} - ${busc.nombre}</li></ul>`;
        carritoDiv.innerHTML = mensaje;
    }
    mensajeresultado("");
}

function filtrarencarrito() {
    const nombinv = tomarnombinv();
    const busc = carritoDeCompras.filter(el => el.nombre.toLowerCase().trim().includes(nombinv));
    const carritoDiv = document.getElementById("carrito");

    if (busc.length === 0) {
        carritoDiv.innerHTML = "<p>No se encontraron coincidencias</p>";
    } else {
        let mensaje = `<h3>Se encontraron ${busc.length} coincidencias: </h3>`;
        mensaje += "<p>ID - Nombre</p>";
        mensaje += "<ul>";
        for (const art of busc) {
            mensaje += `<li>${art.id} - ${art.nombre}</li>`;
        }
        mensaje += "</ul>";
        carritoDiv.innerHTML = mensaje;
    }
    mensajeresultado("");
}
function guardarCarrito() {
    localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras));
}
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carritoDeCompras");
    if (carritoGuardado) {
        carritoDeCompras.push(...JSON.parse(carritoGuardado));
    }
    mostrarProductos();
}