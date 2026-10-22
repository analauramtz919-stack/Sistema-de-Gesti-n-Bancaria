/* ========================================= 
			IMPORTAR UTILIDADES 
Importamos generarId() para asignar un identificador único a cada movimiento.
========================================= */
import { generarId } from "../utils/helpers.js";

/* ========================================= 
			MODELO MOVIMIENTO
    Con esta clase se representa una operación bancaria realizada dentro del sistema.
    Cada instancia de movimiento contiene informacion sobre una operacion
========================================= */
export class Movimiento {
  //inicializa una instancia de la clase movimiento.
  constructor({
    id = generarId(),
    tipo,
    monto,
    descripcion = "",
    cuentaOrigen = null,
    cuentaDestino = null,
    saldoResultante = null,
    fecha = new Date().toISOString(),
  }) {
    /* ================================= 
				ASIGNAR PROPIEDADES
        Recibe las información de recibida para almacenarla como propiedades del objeto
		================================= */
    this.id = id;
    this.tipo = tipo;
    this.monto = Number(monto);
    this.descripcion = descripcion;
    this.cuentaOrigen = cuentaOrigen;
    this.cuentaDestino = cuentaDestino;
    this.saldoResultante = saldoResultante;
    this.fecha = fecha;
  }
}
