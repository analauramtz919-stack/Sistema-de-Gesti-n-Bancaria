/* ========================================= 
	IMPORTAR UTILIDADES 
========================================= */

// Importamos generarId() para asignar automÃ¡ticamente un identificador interno a cada cuenta.
import { generarId } from "../utils/helpers.js";

/* ========================================= 
	MODELO CUENTA
    Representa una cuenta bancaria perteneciente a un usuario. 
========================================= */

export class Cuenta {
  //Inicializa una nueva instancia de la clase cuenta
  constructor({
    id = generarId(),
    numeroCuenta,
    /* Si no se indica otro tipo, utilizaremos Ahorro. */
    tipo = "Ahorro",
    saldo = 0,
    //Identificador del usuario propietario de la cuenta.
    usuarioId,
    fechaApertura = new Date().toISOString(),
    activa = true,
  }) {
    /* ================================= 
	    ASIGNAR PROPIEDADES 
    ================================= */
    this.id = id;
    this.numeroCuenta = numeroCuenta;
    this.tipo = tipo;
    this.saldo = Number(saldo);
    this.usuarioId = usuarioId;
    this.fechaApertura = fechaApertura;
    this.activa = activa;
  }

  /* ===================================== 
	DEPOSITAR 
    Incrementa el saldo actual de la cuenta utilizando el monto recibido.
    Convierte el monto a nÃºmero, lo suma al saldo existente y devuelve 
    el saldo actualizado.
===================================== */
  depositar(monto) {
    this.saldo += Number(monto);

    return this.saldo;
  }

  /* ===================================== 
	RETIRAR
    Convierte el monto a nÃºmero, lo resta del saldo existente y devuelve 
    el saldo actualizado.
===================================== */

  retirar(monto) {
    this.saldo -= Number(monto);

    return this.saldo;
  }
}