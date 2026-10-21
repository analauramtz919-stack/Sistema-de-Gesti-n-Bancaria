/* =========================================
VALIDACIONES GENERALES
Comprueba que un valor obligatorio realmente contenga información.
======================================== */

export function validarCampoObligatorio(valor){
    /* =====================================
    VALIDAR EXISTENCIA DEL VALOR
    ===================================== */
    return(
        //el valor no deb ser undefined ni null
         valor !== undefined &&
         valor !== null &&
         String(valor).trim() !== ''
    );

}

//Validar monto
export function validarMonto(monto){
    const montoNumerico = Number(monto);

    return(
    Number.isFinite(montoNumerico) &&
    montoNumerico > 0
    );
}