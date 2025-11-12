// js/bst.js
// ------------------------------------------------------------
// Implementación de un Árbol Binario de Búsqueda (BST) con:
//  - insertar(clave)
//  - buscar(clave)
//  - bfs()       -> recorrido por niveles (anchura)
//  - preorden()  -> profundidad (Nodo, Izq, Der)
//  - inorden()   -> profundidad (Izq, Nodo, Der)  [en BST: orden ascendente]
//  - postorden() -> profundidad (Izq, Der, Nodo)
// ------------------------------------------------------------

/**
 * Nodo para BST: almacena la clave (entero) y referencias a hijo izquierdo y derecho.
 */
export class Nodo {
  constructor(clave) {
    /** @type {number} */
    this.clave = clave;
    /** @type {Nodo|null} */
    this.izq = null;
    /** @type {Nodo|null} */
    this.der = null;
  }
}

/**
 * Árbol Binario de Búsqueda – operaciones básicas y recorridos.
 */
export class BST {
  constructor() {
    /** @type {Nodo|null} */
    this.raiz = null;
  }

  /**
   * Inserta una clave en el BST respetando la propiedad de orden.
   * - Si la clave ya existe, no se inserta (evita duplicados).
   * - Complejidad promedio: O(log n) si el árbol se mantiene relativamente balanceado.
   * @param {number} clave
   */
  insertar(clave) {
    const _ins = (u, k) => {
      if (u === null) return new Nodo(k);       // Caso base: insertar aquí
      if (k < u.clave) u.izq = _ins(u.izq, k);  // Ir al subárbol izquierdo
      else if (k > u.clave) u.der = _ins(u.der, k); // Ir al subárbol derecho
      // Si k == u.clave, no hace nada (convención: conjunto sin duplicados)
      return u;
    };
    this.raiz = _ins(this.raiz, clave);
  }

  /**
   * Busca una clave en el árbol.
   * @param {number} clave
   * @returns {boolean} true si existe; false en caso contrario.
   */
  buscar(clave) {
    let u = this.raiz;
    while (u) {
      if (clave === u.clave) return true;
      u = (clave < u.clave) ? u.izq : u.der;
    }
    return false;
  }

  /**
   * Recorrido en anchura (BFS / por niveles).
   * Algoritmo:
   *  1) Si árbol está vacío => []
   *  2) Encolar la raíz.
   *  3) Mientras la cola no esté vacía:
   *       - Desencolar u; visitar u.clave
   *       - Encolar u.izq si existe
   *       - Encolar u.der si existe
   * @returns {number[]} lista de claves en orden por niveles.
   */
  bfs() {
    const salida = [];
    if (!this.raiz) return salida;
    const q = [this.raiz]; // Usamos un arreglo como cola simple
    while (q.length) {
      const u = q.shift();         // desencolar
      salida.push(u.clave);        // visita
      if (u.izq) q.push(u.izq);    // encolar hijo izq
      if (u.der) q.push(u.der);    // encolar hijo der
    }
    return salida;
  }

  /**
   * Recorrido en profundidad: Preorden (Nodo, Izq, Der).
   * @returns {number[]} lista de claves en orden preorden.
   */
  preorden() {
    const salida = [];
    const _pre = (u) => {
      if (!u) return;
      salida.push(u.clave); // N
      _pre(u.izq);          // I
      _pre(u.der);          // D
    };
    _pre(this.raiz);
    return salida;
  }

  /**
   * Recorrido en profundidad: Inorden (Izq, Nodo, Der).
   * En un BST devuelve los valores en orden ascendente.
   * @returns {number[]} lista de claves en orden inorden.
   */
  inorden() {
    const salida = [];
    const _in = (u) => {
      if (!u) return;
      _in(u.izq);            // I
      salida.push(u.clave);  // N
      _in(u.der);            // D
    };
    _in(this.raiz);
    return salida;
  }

  /**
   * Recorrido en profundidad: Postorden (Izq, Der, Nodo).
   * @returns {number[]} lista de claves en orden postorden.
   */
  postorden() {
    const salida = [];
    const _post = (u) => {
      if (!u) return;
      _post(u.izq);          // I
      _post(u.der);          // D
      salida.push(u.clave);  // N
    };
    _post(this.raiz);
    return salida;
  }

  /**
   * Inserta varias claves desde un arreglo.
   * @param {number[]} valores
   */
  cargar(valores) {
    valores.forEach(v => this.insertar(v));
  }
}
