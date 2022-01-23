const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

const $buscador = document.querySelector("#buscador");


let carrito = {}

// Eventos

document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
    // creo la key "carrito", si existe lo almaceno en la colección carrito
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }

});

cards.addEventListener('click', e => { addCarrito(e) });

items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('api.json');
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h3').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('img').setAttribute("src", item.thumbnailUrl)
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    // console.log(item)
    const producto = {
        title: item.querySelector('h3').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    // guardamos nuestra colección de objetos para guardarlo como un string plano con la key 'carrito'
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        
        /*
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        */

        $(document).ready(function () {
            $('#footer').html('Carrito vacío: Usando HTML Jquery');
        });

        
        return


    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)
    
    // Evento para vaciar el carrito:
    const boton = document.querySelector('#vaciar-carrito')
    
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()

        $(document).ready(function () {

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se limpió el carrito',
            showConfirmButton: false,
            timer: 1500
          });
        });

    })

    // Evento comprar carrito

    const $btnComprar = document.querySelector(".realizar");
    $btnComprar.addEventListener("click", (e) => {
      const okCompra = confirm("Confirma Compra?");
      if (okCompra) {
        alert("Gracias! Por su compra");
      }
    });



}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}


$buscador.addEventListener("keyup", (e) => {
    document.querySelectorAll(".productos-ind").forEach((el) => {
      el.textContent.toLowerCase().includes(e.target.value)
        ? el.classList.remove("filter")
        : el.classList.add("filter");
    });
  });


  /* Filtros */

  $(document).ready(function () {
    $("#Todos").click(function() {
        $(".Electronico").fadeIn();
        $(".Cocina").fadeIn();
        $(".Animales").fadeIn();
        $(".total--color").text(`${productoHTML.length} productos`);
    });
  });


$(document).ready(function () {

    $("#Todos").click(function() {
        $(".Electronico").fadeIn();
        $(".Cocina").fadeIn();
        $(".Animales").fadeIn();
        $(".total--color").text(`${productoHTML.length} productos`);
    });

});    
    
$(document).ready(function () {    
    $("#Electronico").click(function() {
        $(".maceta").fadeOut();
        $(".sustrato").fadeOut();
        $(".Electronico").fadeOut().fadeIn("slow");
        $(".total--color").text(`${Electronico.length} productos`);
    });
});     
    
$(document).ready(function () { 
    $("#Cocina").click(function() {
        $(".Cocina").fadeOut().fadeIn("slow");
        $(".planta").fadeOut();
        $(".sustrato").fadeOut();
        $(".total--color").text(`${Cocina.length} productos`);
    });
});    
    
$(document).ready(function () {     
    $("#Animales").click(function() {
        $(".maceta").fadeOut();
        $(".planta").fadeOut();
        $(".Animales").fadeOut().fadeIn("slow");
        $(".total--color").text(`${Animales.length} productos`);
    });
});


