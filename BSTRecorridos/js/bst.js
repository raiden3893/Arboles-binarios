// Definición del Nodo del Árbol
class Nodo {
    constructor(id, titulo) {
        this.id = id;         // El ID del libro (número para ordenar)
        this.titulo = titulo; // El título del libro
        this.izquierda = null; // Hijo izquierdo
        this.derecha = null;   // Hijo derecho
    }
}

// Definición del Árbol Binario de Búsqueda (BST)
class ArbolBinarioBusqueda {
    constructor() {
        this.raiz = null; // El árbol empieza vacío
    }

    // Método para insertar un nuevo libro (nodo)
    insertar(id, titulo) {
        const nuevoNodo = new Nodo(id, titulo);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this.insertarNodo(this.raiz, nuevoNodo);
        }
    }

    // Función auxiliar recursiva para insertar un nodo
    insertarNodo(nodo, nuevoNodo) {
        // Si el ID del nuevo libro es menor, va a la izquierda
        if (nuevoNodo.id < nodo.id) {
            if (nodo.izquierda === null) {
                nodo.izquierda = nuevoNodo;
            } else {
                this.insertarNodo(nodo.izquierda, nuevoNodo);
            }
        } 
        // Si el ID es mayor, va a la derecha
        else {
            if (nodo.derecha === null) {
                nodo.derecha = nuevoNodo;
            } else {
                this.insertarNodo(nodo.derecha, nuevoNodo);
            }
        }
    }

    // --- MÉTODOS DE RECORRIDO ---

    // Recorrido In-Order (Izquierda, Raíz, Derecha) -> Ordena los elementos
    inOrder(callback) {
        const resultado = [];
        this.inOrderRecursivo(this.raiz, (nodo) => {
            resultado.push(`ID: ${nodo.id}, Título: "${nodo.titulo}"`);
        });
        return resultado;
    }

    inOrderRecursivo(nodo, callback) {
        if (nodo !== null) {
            this.inOrderRecursivo(nodo.izquierda, callback);
            callback(nodo);
            this.inOrderRecursivo(nodo.derecha, callback);
        }
    }

    // Recorrido Pre-Order (Raíz, Izquierda, Derecha) -> Útil para copiar árboles
    preOrder(callback) {
        const resultado = [];
        this.preOrderRecursivo(this.raiz, (nodo) => {
            resultado.push(`ID: ${nodo.id}, Título: "${nodo.titulo}"`);
        });
        return resultado;
    }

    preOrderRecursivo(nodo, callback) {
        if (nodo !== null) {
            callback(nodo);
            this.preOrderRecursivo(nodo.izquierda, callback);
            this.preOrderRecursivo(nodo.derecha, callback);
        }
    }

    // Recorrido Post-Order (Izquierda, Derecha, Raíz) -> Útil para eliminar nodos
    postOrder(callback) {
        const resultado = [];
        this.postOrderRecursivo(this.raiz, (nodo) => {
            resultado.push(`ID: ${nodo.id}, Título: "${nodo.titulo}"`);
        });
        return resultado;
    }

    postOrderRecursivo(nodo, callback) {
        if (nodo !== null) {
            this.postOrderRecursivo(nodo.izquierda, callback);
            this.postOrderRecursivo(nodo.derecha, callback);
            callback(nodo);
        }
    }
}