/* =================================================================
    Este archivo contiene funciones que ayudan a dar formato a 
    fechas, cuentas y montos para que sean legibles para el usuario
================================================================== */

/* =====================================================
		FORMATEADOR DE MONEDA
        Funcion que cambia el formato de la moneda para que sea mas 
        entendible
====================================================== */

export function formatCurrency(valor) {
  //Number() convierte a numero
  const numero = Number(valor);
  //isFinite() comprueba si un numero es finito
  // el operador ! invierte el resultado
  if (!Number.isFinite(numero)) {
    return "$0.00";
  }

  //Se aplica formato de moneda
  return numero.toLocaleString("es-MX", {
    //Establece el estilo de formato como moneda
    style: "currency",
    //Establece pesos mexicanos como moneda a utilizar
    currency: "MXN",
  });
}

/* ========================================= 
			FORMATEAR FECHA 
========================================= */
/* Convierte una fecha a una representación más amigable utilizando la configuración regional de México. */
export function formatDate(fecha) {
  //Convierte el parametro fecha en un objeto de fecha para poder trabajar con el valor
  const fechaObjeto = new Date(fecha);

  //validaci{on para que no se muestre un valor incorrecto en caso de que la fecha no sea valida
  //esta validacion se hace con el metodo getTime() que devuelve el valor numerico de la fecha y si no es valida devuelve NaN
  if (Number.isNaN(fechaObjeto.getTime())) {
    return "";
  }

  //Formato de fecha para mexico en donde se muestra el dia, mes y año en formato corto
  return fechaObjeto.toLocaleDateString("es-MX");
}

/* ========================================= 
	    FORMATEAR NÚMERO DE CUENTA 
========================================= */

/*Funcion para dar formato al numero de cuenta */
export function formatAccountNumber(numeroCuenta) {
  /*Convierte el valor recibido en cadena de texto, si la variable 
    es null o undefined se utiliza la cadena vacia ""  */
  const numero = String(numeroCuenta ?? "");

  /* Capturar un grupos de 4 digitos */
  return numero.replace(/(\d{4})(?=\d)/g, "$1 ");
}
