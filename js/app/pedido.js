const carro = new Carrito();
const listaProductos = document.querySelector('#lista-carrito tbody');

cargarEventos();

function cargarEventos() {

    //Se ejecuta cuando se presiona agregar carrito
    $('#lista-productos').click ((e) => {
        carro.comprarProducto(e);
    });

    //Cuando se elimina productos del carrito
    $('#carrito').click((e) => {
        carro.eliminarProducto(e)
    });

    //Al vaciar carrito
    $('#vaciar-carrito').click((e)=> {
        carro.vaciarCarrito(e)
    });

    //Al cargar documento se muestra lo almacenado en LocalStorage
    $(document).ready(() => {
        carro.leerLocalStorage();
        fetchProductos();
    });

    //Enviar pedido a otra pagina
    $('#procesar-pedido').click((e)=> {
        carro.procesarPedido(e)
    });
}

async function fetchProductos() {
    let res = await fetch("../db/productos.json");
    let data = await res.json();
    let html ="";
    data.forEach((producto, index) => {
        productos = `
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-bold">${producto.marca}</h4>
                </div>
                <div class="card-body">
                    <img src=${producto.imagen} class="card-img-top" alt=${producto.marca}>
                    <h1 class="card-title pricing-card-title precio">S/. <span class="">${producto.precio}</span></h1>

                    <ul class="list-unstyled mt-3 mb-4">
                        ${producto.detalles.map((ele) => `
                            <li>${ele}</li>
                                `).join("")}
                    </ul>
                    <a href="" class="btn btn-2 btn-block agregar-carrito" data-id=${producto.id}>Comprar</a>
                </div>
            </div>
        `;
        if (index === 0) {
            html += `<div class="card-deck mb-3 text-center md:w-10">${productos}`
        } else if (index % 3 === 0 && index !== 0){
            html += `</div><div class="card-deck mb-3 text-center md:w-10">${productos}`
        } else {
            html += productos
        }
    });
    $("#lista-productos").html(html);
}