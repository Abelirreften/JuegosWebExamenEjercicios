// Por: Abel Ahimsa Martín Crego, 30/03/2025
// Actividad 1, Juegos para la Web, Diseño y Desarrollo de Videojuegos, UNIR

const maquina = {
    // Variables globales
    saldo: 0,
    productos: [
        { nombre: "Takis", precio: 1.5, stock: 4 },
        { nombre: "Doritos", precio: 2, stock: 4 },
        { nombre: "Oreo", precio: 2.75, stock: 5 },
        { nombre: "KitKat", precio: 1.75, stock: 5 },
        { nombre: "Coca-Cola", precio: 2.5, stock: 7 }
    ],

    // Método para introducir la moneda
    introducirMoneda(cantidad) {
        this.saldo += cantidad;
        this.actualizarInterfaz();
    },

    // Metodo para comprar productos usando alertas del navegador que indican el estado de la acción
    comprarProducto(indice) {
        let producto = this.productos[indice];
        if (producto.stock > 0 && this.saldo >= producto.precio) {
            this.saldo -= producto.precio;
            producto.stock--;
            abrirMensaje(`Has comprado ${producto.nombre}`);
            //alert(`Has comprado ${producto.nombre}`);
        } else if (producto.stock === 0) {
            abrirMensaje("No hay más stock disponible.");
            //alert("No hay más stock disponible.");
        } else {
            abrirMensaje("Saldo insuficiente.");
            //alert("Saldo insuficiente.");
        }
        this.actualizarInterfaz();
    },

    // Método para devolver las monedas
    devolverMonedas() {
        this.saldo = 0;
        this.actualizarInterfaz();
    },

    // Método para mostrar en la interfaz todos los cambios realizados
    actualizarInterfaz() {
        document.getElementById("saldo").innerText = this.saldo.toFixed(2);
        this.productos.forEach((producto, index) => {
            document.querySelector(`#producto-${index} .stock`).innerText = producto.stock;
        });
    }
      
};

function abrirMensaje(contenido){
    document.querySelector("#dialog").showModal();
    document.querySelector("#dialogContenido").innerHTML = contenido;
}

function cerrarMensaje(){
    document.querySelector("#dialog").close();
}

// Método para separar las palabras usando símbolos de puntuación
function wrapTextNodes(element) {
    const words = element.textContent.match(/\b\w+\b|\S+/g) || [];
    element.textContent = "";
  
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + (index < words.length - 1 ? " " : "");
  
      // Calcula el delay dinámico
      span.style.animationDelay = `${0.1 * (index + 1)}s`;
  
      element.appendChild(span);
    });
  }
  
  // Aplica la animación a todo el texto que sea de la clase word-reveal
  document.querySelectorAll(".word-reveal").forEach(wrapTextNodes);