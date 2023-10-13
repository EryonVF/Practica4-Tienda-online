# Practica 4 Tienda Online 

## Explique cada una de las funciones definidas por el usuario en el código JavaScript presentado en el paso 2. 
El código JavaScript presentado en el paso 2 del proyecto incluye varias funciones definidas por el usuario. A continuación, se proporciona una explicación de cada una de estas funciones:

1. **`document.addEventListener("DOMContentLoaded", function () { ... })`**: Esta es una función anónima que se ejecuta cuando el documento HTML ha sido completamente cargado en el navegador. Se utiliza para asegurarse de que el código JavaScript se ejecute después de que el DOM esté listo.

2. **`const catalogo = [ ... ]`**: Aquí se define un arreglo llamado `catalogo` que contiene objetos que representan productos disponibles para comprar. Cada objeto tiene un id (identificador único), una imagen (URL de la imagen del producto) y un precio (precio del producto).

3. **`const catalogoContainer = document.getElementById("catalogo")`**: Esta línea busca el elemento HTML con el ID "catalogo" y lo almacena en la variable `catalogoContainer`. Se utiliza posteriormente para agregar tarjetas de productos al catálogo.

4. **`const resumenCompra = document.getElementById("resumenCompra")`**: Similar al caso anterior, esta línea busca el elemento con el ID "resumenCompra" y lo almacena en la variable `resumenCompra`. Se utiliza para mostrar un resumen de la compra al usuario.

5. **`const total = document.getElementById("total")`**: Similar al caso anterior, esta línea busca el elemento con el ID "total" y lo almacena en la variable `total`. Se utiliza para mostrar el costo total de la compra al usuario.

6. **Generación de Tarjetas de Productos**: El código se encarga de generar tarjetas de productos para cada elemento en el catálogo. Esto se realiza mediante un bucle `forEach` que recorre el arreglo `catalogo`. Cada producto se presenta al usuario con una imagen, un título, un precio y un campo para agregar la cantidad deseada.

7. **`botonAgregar.addEventListener("click", function () { ... })`**: Esto agrega un controlador de eventos clic al botón "Agregar al Carrito" en cada tarjeta de producto. Cuando el usuario hace clic en este botón, se ejecuta la función anónima que permite agregar el producto al carrito con la cantidad especificada.

8. **`const carrito = []`**: Se crea un arreglo vacío llamado `carrito` para almacenar los productos seleccionados por el usuario y la cantidad de cada uno.

9. **`agregarProductoAlCarrito(producto, cantidad)`**: Esta función permite agregar un producto al carrito. Comprueba si el producto ya está en el carrito y, si es así, actualiza la cantidad. Si el producto no está en el carrito, se agrega como un nuevo elemento.

10. **`actualizarResumenCompra()`**: Esta función actualiza el resumen de compra en la página. Limpia la tabla de resumen de compra, luego recorre los productos en el carrito para calcular el costo subtotal de cada producto y mostrarlo al usuario.


## En el código js, ¿qué tipo de variable es "catalogo"? ¿Como se manipula?

En el código JavaScript, la variable "catalogo" es un arreglo (array). En JavaScript, un arreglo es un tipo de variable que puede contener múltiples valores en una estructura de lista ordenada. En este caso, el arreglo "catalogo" almacena una lista de objetos que representan productos disponibles para la compra.

Cada elemento dentro del arreglo es un objeto que tiene propiedades como "id" (un identificador único), "imagen" (una URL de la imagen del producto) y "precio" (el precio del producto). Los objetos dentro del arreglo "catalogo" representan los diferentes productos que los usuarios pueden comprar en la tienda en línea.

Para manipular el arreglo "catalogo", se pueden realizar diversas operaciones, como agregar nuevos productos, eliminar productos, modificar propiedades de los productos existentes, entre otras. En el código proporcionado, el arreglo "catalogo" se utiliza para generar dinámicamente tarjetas de productos en la página web, permitiendo a los usuarios ver los productos disponibles y agregarlos al carrito de compra al hacer clic en el botón "Agregar al Carrito".

## ¿Qué hace `const card = document.createElement("div")`?
La línea `const card = document.createElement("div")` crea un nuevo elemento HTML del tipo "div". Este nuevo elemento servirá como una tarjeta para representar un producto en la página web. La variable "card" almacena esta tarjeta, que se configurará con información del producto, como imagen, título, precio y botón "Agregar al Carrito", antes de ser agregada a la página.

## ¿Qué hace `card.innerHTML`?
`card.innerHTML` es una propiedad que permite modificar o acceder al contenido HTML dentro del elemento HTML "card". En el contexto del código proporcionado, se utiliza para establecer el contenido HTML de la tarjeta "card". Se asigna una cadena de texto que contiene etiquetas HTML y contenido de texto, lo que permite crear la estructura de la tarjeta de producto con imagen, título, precio, campo de cantidad y botón "Agregar al Carrito".

## ¿Qué hace `catalogoContainer.appendChild(card)`?
`catalogoContainer.appendChild(card)` es una línea de código que agrega el elemento "card" (una tarjeta de producto) como un hijo del elemento con el ID "catalogoContainer". Esto significa que la tarjeta de producto se inserta como un nuevo elemento dentro del contenedor de catálogo en la página HTML.
