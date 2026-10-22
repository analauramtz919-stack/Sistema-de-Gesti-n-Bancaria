/* =========================================
                VALIDACIONES
    Este archivo tiene funciones que validan
    datos que serán usados por el sistema
==========================================*/

/* ========================================= 
		VALIDACIONES GENERALES
        Comprueba que un valor obligatorio realmente contenga información. 
======================================== */

/* Se valida que el campo se llene por medio de una funcion en donde el parametro es valor */
export function validarCampoObligatorio(valor) {
  /* ===================================== 
		VALIDAR EXISTENCIA DEL VALOR 
	===================================== */
  return (
    // El valor no debe ser undefined NI null NI una cadena vacía
    valor !== undefined &&
    valor !== null &&
    //Strig(valor) convierte el valor a cadena de texto
    //.trim() elimina los espacios en blanco al inicio y al final de la cadena
    String(valor).trim() !== ""
  );
}

/* ========================================= 
		VALIDAR MONTO 
========================================= */
export function validarMonto(monto) {
  //Convertimos el monto a un número para poder compararlo
  const montoNumerico = Number(monto);

  return (
    //se comprueba que el valor sea finito y sea numerico para poder trabajar sobre el valor
    Number.isFinite(montoNumerico) && montoNumerico > 0
  );
}