document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, imagen: "https://www.gamerscolombia.com/img/Mouse-Logitech-G502-KDA/img_5524_2_1641221831.png", precio: 249.00 , descripcion: "Mouse Logitech G502 KDA" },
        { id: 2, imagen: "https://www.gamerscolombia.com/img/Mouse-Gamer-Logitech-G203-LIGHTSYNC-NEGRO/img_217__1591650955.png", precio: 130.00, descripcion: "Mouse Gamer Logitech G203 LIGHTSYNC NEGRO" },
        { id: 3, imagen: "https://www.gamerscolombia.com/img/products/Monitor-LG-27GR75Q-B-Gamer-UltraGear-QHD-27-165-Hz-1-ms-GtG-HDR10-sRGB99/LG-27GR75Q-B16859827381.jpg", precio: 20 , descripcion: "Monitor LG 27GR75Q-B Gamer UltraGear™ QHD 27” 165 Hz 1 ms GtG HDR10 sRGB99%"},
        { id: 4, imagen: "https://www.gamerscolombia.com/img/Astro-A50-Inalmbricos-y-Estacin-Base-PS4/img_35__1600193811.png", precio: 1100.00, descripcion: "Astro A50 Inalámbricos y Estación Base PS4" },
        { id: 5, imagen: "https://www.gamerscolombia.com/img/Teclado-Quasar-TKL-RGB-Blanco-o-Negro/img_5522_3_1640189052.png", precio: 239.00, descripcion: "Teclado Quasar TKL RGB Blanco o Negro" },

        
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
                    <h5 class="card-title">Articulo ${producto.id}</h5>
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
