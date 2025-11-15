// Espera a que todo el contenido del DOM est cargado
document.addEventListener('DOMContentLoaded', () => {

    // Instancia del rbol Binario de Bsqueda
    const bst = new ArbolBinarioBusqueda();

    // Referencias a los elementos del DOM
    const form = document.getElementById('libroForm');
    const idInput = document.getElementById('libroId');
    const tituloInput = document.getElementById('libroTitulo');
    const resultadoDiv = document.getElementById('resultado');

    const btnInOrder = document.getElementById('btnInOrder');
    const btnPreOrder = document.getElementById('btnPreOrder');
    const btnPostOrder = document.getElementById('btnPostOrder');

    // --- EVENT LISTENERS ---

    // 1. Manejar el envo del formulario para agregar un nuevo libro
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la pgina se recargue

        const id = parseInt(idInput.value, 10);
        const titulo = tituloInput.value;

        // Validacin simple
        if (isNaN(id) || titulo.trim() === '') {
            alert('Por favor, ingresa un ID numrico y un ttulo.');
            return;
        }

        bst.insertar(id, titulo);
        
        alert(`Libro "${titulo}" (ID: ${id}) agregado al catlogo.`);

        // Limpiar los campos del formulario
        form.reset();
        idInput.focus();
    });

    // 2. Manejar los clics en los botones de recorrido
    btnInOrder.addEventListener('click', () => {
        const resultado = bst.inOrder();
        mostrarResultado('Recorrido In-Order (ordenado por ID)', resultado);
    });

    btnPreOrder.addEventListener('click', () => {
        const resultado = bst.preOrder();
        mostrarResultado('Recorrido Pre-Order (estructura de registro)', resultado);
    });

    btnPostOrder.addEventListener('click', () => {
        const resultado = bst.postOrder();
        mostrarResultado('Recorrido Post-Order (hojas primero)', resultado);
    });

    // --- FUNCIN AUXILIAR ---

    // Funcin para mostrar los resultados en el div correspondiente
    function mostrarResultado(tituloRecorrido, datos) {
        if (datos.length === 0) {
            resultadoDiv.innerHTML = `<h3>${tituloRecorrido}</h3><p>El catlogo est vaco. Agrega algunos libros primero.</p>`;
            return;
        }
        
        // Crea una lista formateada
        const listaFormateada = datos.join('\n');
        
        resultadoDiv.innerHTML = `<h3>${tituloRecorrido}</h3><pre>${listaFormateada}</pre>`;
    }

    // --- DATOS DE EJEMPLO ---
    // Para que no tengas que empezar de cero cada vez
    bst.insertar(100, "El Principito");
    bst.insertar(50, "Cien Aos de Soledad");
    bst.insertar(150, "Don Quijote de la Mancha");
    bst.insertar(25, "Crnica de una Muerte Anunciada");
    bst.insertar(75, "La Sombra del Viento");
    bst.insertar(125, "Ficciones");
    bst.insertar(175, "Rayuela");
});
