class Carrito {
    // Añadir el producto al carrito
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            Swal.fire({
                icon: 'success',
                title: 'COMPRA EXITOSA',
                text: 'El producto fue agregado al carrito de compras.'
            })
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProductos(producto);
        }
    }

    // Leer datos del producto
    leerDatosProductos(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if (productosLS === infoProducto.id) {
            Swal.fire({
                icon: 'warning',
                title: 'Lo sentimos...',
                text: 'El producto ya esta agregado!',
                timer: 2000,
                showConfirmButton: false
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }

    // Muestra producto seleccionado en carrito
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>S/.${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}">
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    //Eliminar el producto del carrito en el DOM
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    // Elimina todos los productos
    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    // Almacenar en el LocalStorage
    guardarProductosLocalStorage(producto) {
        let productos;
        // Toma valor de un arreglo con datos del LocalStorage
        productos = this.obtenerProductosLocalStorage();
        // Agregar el producto al carrito
        productos.push(producto);
        // Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LocalStorage
    obtenerProductosLocalStorage() {
        let productoLS;

        //Comprobar si hay algo en LocalStorage
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    // Mostrar los productos guardados en el LocalStorage
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            // Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>S/.${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}">
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    // Mostrar los productos guardados en el LocalStorage en compra.html
    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>S/. ${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" style="width: 70px;" value=${producto.cantidad}>
                </td>
                <td id="subtotales">S/. ${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}">
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Eliminar producto por ID del LocalStorage
    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        // Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        // Comparar el id del producto borrado con LS
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1)
            }
        });
        // Añadimos el arreglo actual al LocalStorage
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Eliminar todos los datos del LocalStorage
    vaciarLocalStorage() {
        localStorage.clear();
    }

    //Procesar pedido
    procesarPedido(e) {
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0) {
            Swal.fire(
                'Necesitas agregar productos',
                'Ningun producto comprado',
                'error'
            )
        } else {
            location.href = "compra.html";
        }
    }

    //Calcular montos
    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total += element;
        }
        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total - igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = `S/. ${subtotal}`;
        document.getElementById('igv').innerHTML = `S/. ${igv}`;
        document.getElementById('total').value = `S/. ${total.toFixed(2)}`;
    }

    obtenerEvento(e) {
        e.preventDefault();

        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    actualizarMontos[index].innerHTML = "S/. " + Number(cantidad * productosLS[index].precio);
                }
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));

        }
        else {
            console.log("click afuera");
        }
    }
}