//Entrada de usurio
let user = prompt("Ingresa tu nombre");
let edad = prompt("Ingresa tu edad");


if (edad>18) {
alert("Bienvenido a la Tienda, usted tiene la edad necesaria para comprar.")
// definición de variables:
 // Hago uso del DOM para obtener los valores.
let list = document.getElementById("carrito");
let cantidad = document.getElementById("title");
let total = document.getElementById("total");

// CLASE CARRITO y constructor
 // El array 

class Carrito {
    constructor() {
        this.productos = new Array();
    }

    // metodos de Carrito:

    add(producto) {
        let p = new Producto(producto.children[1].innerHTML, producto.children[2].innerHTML, producto.children[3].innerHTML, producto.children[0].src)
        this.productos.push(p);
        list.innerHTML = "";
        this.escribir();
    }

    remove(producto) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].nombre == producto.children[1].innerHTML) {
                this.productos.splice(i, 1);
                break;
            }
        }
        this.escribir();

    }

    escribir() {
        list.innerHTML = "";
        this.productos.forEach(element => {
            list.innerHTML += `<div class="item"><img class="producto__img" src="${element.imagen}" alt="" width="300">
            <p class="producto__title">${element.nombre}</p>
            <p class="producto__subtitle">${element.detalle}</p>
            <p class="producto__subtitle precio">${element.precio}</p></div>`;
        });
        this.calcular();
    }
    calcular() {
        let suma = 0;
        this.productos.forEach(element => {
            suma += Number(element.precio)
        });
        cantidad.innerText = `${this.productos.length} Items en el carrito`;
        total.innerText = `Costo total $${suma}`;
        alert('Actualmente vas sumando: '+ suma + ' y ' +this.productos.length + ' productos en tu carrito') ;
    }
}


// CLASE PRODUCTO y su constructor
class Producto {
    constructor(nombre, detalle, precio, imagen) {
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
        this.imagen = imagen;
    }
}


// INICIALIZO CARRITO
let carro = new Carrito();
// ASIGNA ONCLICK A TODOS LOS BOTONES CON CLASE ADD O REMOVE
let adds = Array.from(document.getElementsByClassName("btn_add"));
let rms = Array.from(document.getElementsByClassName("btn_rm"));
adds.forEach(element => {
    element.addEventListener("click", function() {
        addElement(element.parentNode.parentNode);
    });
});
rms.forEach(element => {
    element.addEventListener("click", function() {
        removeElement(element.parentNode.parentNode);
    });
});

// FUNCION PARA AGREGAR UN ELEMENTO AL CARRO
function addElement(element) {
    carro.add(element);
}
// FUNCION PARA ELIMINAR UN ELEMENTO AL CARRO
function removeElement(element) {
    carro.remove(element);
}
}
else{
    alert("Usted no es mayor de edad para comprar en esta tienda")
}