// js/app.js (módulo ES)
// ------------------------------------------------------------
// Conecta la UI del index.html con la implementación de BST.
// - Carga de ejemplos (Árbol A y B)
// - Construcción desde texto
// - Render de recorridos
// - Pruebas automáticas con aserciones (evidencia para el instrumento)
// ------------------------------------------------------------
import { BST } from './bst.js';

// ---------------------- ASCII de “imágenes con datos” ----------------------
const ASCII = {
  A: `
             8
           /   \\
          3     10
         / \\      \\
        1   6      14
           / \\     /
          4   7   13
  `,
  B: `
            5
          /   \\
         2     9
        / \\   / \\
       1  3  7  12
             / \\
            6   8
  `
};

// Valores que replican los árboles ASCII anteriores (orden de inserción)
const VALORES_A = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const VALORES_B = [5, 2, 9, 1, 3, 7, 12, 6, 8];

// ------------------------------ DOM refs ----------------------------------
const txtValores = document.getElementById('txtValores');
const btnConstruir = document.getElementById('btnConstruir');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnArbolA = document.getElementById('btnArbolA');
const btnArbolB = document.getElementById('btnArbolB');
const btnProbar = document.getElementById('btnProbar');

const ascii = document.getElementById('ascii');
const outBFS = document.getElementById('outBFS');
const outPre = document.getElementById('outPre');
const outIn  = document.getElementById('outIn');
const outPost= document.getElementById('outPost');

// BST “activo” que se muestra en la interfaz
let bst = new BST();

// ---------------------------- Helpers de UI -------------------------------

/**
 * Dibuja los recorridos del árbol activo en la sección de resultados.
 * - BFS (por niveles)
 * - Preorden
 * - Inorden
 * - Postorden
 */
function renderRecorridos(t) {
  outBFS.textContent  = safeJoin(t.bfs());
  outPre.textContent  = safeJoin(t.preorden());
  outIn.textContent   = safeJoin(t.inorden());
  outPost.textContent = safeJoin(t.postorden());
}

/**
 * Convierte un arreglo a cadena "a, b, c". Si está vacío, muestra "—".
 */
function safeJoin(arr) {
  return Array.isArray(arr) && arr.length ? arr.join(', ') : '—';
}

/**
 * Limpia salidas y estado mínimo.
 */
function limpiarSalidas() {
  ascii.textContent = '';
  outBFS.textContent = outPre.textContent = outIn.textContent = outPost.textContent = '';
}

/**
 * Construye un BST a partir de una lista de enteros separados por coma.
 * - Valida entradas numéricas
 * - Inserta en orden
 * - Muestra recorridos
 */
function construirDesdeTexto() {
  const texto = (txtValores.value || '').trim();
  if (!texto) {
    alert('Escribe algunos valores separados por coma.');
    return;
  }

  // Parseo de números; se ignoran tokens no numéricos
  const piezas = texto.split(',').map(s => s.trim()).filter(Boolean);
  const nums = [];
  for (const p of piezas) {
    const n = Number(p);
    if (Number.isFinite(n)) nums.push(n);
  }
  if (!nums.length) {
    alert('No se encontraron números válidos.');
    return;
  }

  bst = new BST();
  bst.cargar(nums);
  ascii.textContent = '(árbol generado desde tu lista; la forma depende del orden de inserción)';
  renderRecorridos(bst);
}

/** Carga el Árbol A (valores fijos) y muestra su ASCII. */
function cargarA() {
  bst = new BST();
  bst.cargar(VALORES_A);
  txtValores.value = VALORES_A.join(', ');
  ascii.textContent = ASCII.A;
  renderRecorridos(bst);
}

/** Carga el Árbol B (valores fijos) y muestra su ASCII. */
function cargarB() {
  bst = new BST();
  bst.cargar(VALORES_B);
  txtValores.value = VALORES_B.join(', ');
  ascii.textContent = ASCII.B;
  renderRecorridos(bst);
}

/**
 * Ejecuta pruebas (aserciones) para Árbol A y B.
 * - Si todo pasa, muestra un alert de éxito.
 * - Si alguna falla, lanza un error con detalle (visible en consola).
 * Esto sirve como “evidencia” objetiva para el reporte.
 */
function correrPruebas() {
  // Comparación de arreglos estricta
  const assertArrayEq = (actual, esperado, etiqueta) => {
    const ok = Array.isArray(actual)
      && Array.isArray(esperado)
      && actual.length === esperado.length
      && actual.every((v, i) => v === esperado[i]);
    if (!ok) {
      console.error(`[${etiqueta}] Esperado: [${esperado}] — Obtenido: [${actual}]`);
      throw new Error(`Fallo ${etiqueta}`);
    }
  };

  // --- Árbol A ---
  let t = new BST(); t.cargar(VALORES_A);
  assertArrayEq(t.bfs(),      [8, 3, 10, 1, 6, 14, 4, 7, 13], 'A-BFS');
  assertArrayEq(t.preorden(), [8, 3, 1, 6, 4, 7, 10, 14, 13], 'A-Preorden');
  assertArrayEq(t.inorden(),  [1, 3, 4, 6, 7, 8, 10, 13, 14], 'A-Inorden');
  assertArrayEq(t.postorden(),[1, 4, 7, 6, 3, 13, 14, 10, 8], 'A-Postorden');

  // --- Árbol B ---
  t = new BST(); t.cargar(VALORES_B);
  assertArrayEq(t.bfs(),      [5, 2, 9, 1, 3, 7, 12, 6, 8], 'B-BFS');
  assertArrayEq(t.preorden(), [5, 2, 1, 3, 9, 7, 6, 8, 12], 'B-Preorden');
  assertArrayEq(t.inorden(),  [1, 2, 3, 5, 6, 7, 8, 9, 12], 'B-Inorden');
  assertArrayEq(t.postorden(),[1, 3, 2, 6, 8, 7, 12, 9, 5], 'B-Postorden');

  alert('✔ Todas las pruebas pasaron para Árbol A y Árbol B.');
}

// ----------------------------- Listeners ----------------------------------
btnConstruir.addEventListener('click', construirDesdeTexto);
btnLimpiar.addEventListener('click', () => {
  txtValores.value = '';
  limpiarSalidas();
  bst = new BST();
});
btnArbolA.addEventListener('click', cargarA);
btnArbolB.addEventListener('click', cargarB);
btnProbar.addEventListener('click', correrPruebas);

// Estado inicial
limpiarSalidas();
