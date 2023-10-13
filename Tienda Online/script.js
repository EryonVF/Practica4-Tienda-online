document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, imagen: "https://img2.gratispng.com/20180621/igi/kisspng-computer-mouse-computer-keyboard-gamer-mouse-mats-5b2c65fcd880c6.8251180415296363488868.jpg", precio: 4900.00, descripcion: "PIKACHU EX 001/030 - YOKOHAMA EXCLUSIVE" },
        { id: 2, imagen: "https://w7.pngwing.com/pngs/784/537/png-transparent-computer-keyboard-razer-blackwidow-chroma-v2-razer-blackwidow-ultimate-2016-gaming-keypad-game-peripherals-electronics-computer-keyboard-razer-blackwidow-chroma-v2.png", precio: 15 },
        { id: 3, imagen: "https://www.masgamers.com/wp-content/uploads/2022/02/ROG-Fusion-II-500-01.jpg", precio: 20 }
        // Agrega más productos aquí
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");
    const ticketBody = document.getElementById("ticketBody");
    const totalAmount = document.getElementById("totalAmount");

    // Carrito de compra
    const carrito = [];

    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">Producto ${producto.id}</h5>
                    <p class="card-text">${producto.descripcion ? producto.descripcion : ''}</p>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <label for="cantidadProducto${producto.id}">Cantidad:</label>
                    <input type="number" id="cantidadProducto${producto.id}" class="form-control">
                    <button class="btn btn-primary mt-2" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        catalogoContainer.appendChild(card);

        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    function agregarProductoAlCarrito(producto, cantidad) {
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ producto, cantidad });
        }

        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.producto.descripcion ? item.producto.descripcion : `Producto ${item.producto.id}`}
                </td>
                <td>${item.cantidad}</td>
                <td>$${(item.producto.precio * item.cantidad).toFixed(2)}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        total.textContent = `$${subtotalTotal.toFixed(2)}`;
    }

    // Actualiza el ticket cuando preciono "Finalizar Compra"
    const finalizarCompra = document.getElementById("finalizarCompra");

    finalizarCompra.addEventListener("click", () => {
        const ticketContenido = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ticket de Compra</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="Ticket/style.css">
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center my-4"> <!-- Aplicamos la clase 'my-4' para agregar margen en la parte superior e inferior -->
                        <h1 class="bg-primary text-white p-3 rounded">Ticket de Venta</h1> <!-- Clases de Bootstrap para el diseño -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th class="border-start">Cantidad</th>
                                    <th class="border-start">Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="ticketBody">
                                <!-- Los detalles de la compra se generarán dinámicamente con JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-end">
                        <div class="total">
                            <span>Total:</span>
                            <span id="totalAmount"></span>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const nuevaVentana = window.open("", "Ticket de Compra", "width=400,height=400");
        nuevaVentana.document.write(ticketContenido);

        // Borra el contenido anterior del ticket
        const ticketBody = nuevaVentana.document.getElementById("ticketBody");
        ticketBody.innerHTML = "";

        // Agrega los productos al ticket en la nueva ventana
        carrito.forEach((item) => {
            const row = nuevaVentana.document.createElement("tr");
            row.innerHTML = `
                <td>${item.producto.descripcion ? item.producto.descripcion : `Producto ${item.producto.id}`}</td>
                <td>${item.cantidad}</td>
                <td>$${item.producto.precio.toFixed(2)}</td>
                <td>$${(item.producto.precio * item.cantidad).toFixed(2)}</td>
            `;
            ticketBody.appendChild(row);
        });

        // Calcula y muestra el total en la nueva ventana
        const subtotalTotal = carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
        const totalAmount = nuevaVentana.document.getElementById("totalAmount");
        totalAmount.textContent = `$${subtotalTotal.toFixed(2)}`;
    });
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 10) {
            navbar.classList.add("is-sticky");
        } else {
            navbar.classList.remove("is-sticky");
        }
    });
});
