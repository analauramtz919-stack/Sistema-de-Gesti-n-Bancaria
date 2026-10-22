/* ========================================= 
	IMPORTAR UTILIDADES 
========================================= */

// Importamos generarId() para poder asignar automáticamente un identificador a cada usuario que creemos.
//Esta importacion viene desde el archivo helpers.js
import { generarId } from "../utils/helpers.js";

/* ========================================= 
	MODELO USUARIO 
    La clase Usuario funciona como un molde para representar
    a las personas registradas dentro del sistema.
========================================= */
export class Usuario {
  // El constructor se ejecutará cada vez que creemos una nueva instancia mediante: new Usuario(...)
  constructor({
    id = generarId(),
    nombre,
    email,
    telefono = "",
    password,
    activo = true,
  }) {
    /* ================================= 
		ASIGNAR PROPIEDADES
	    this representa la instancia que estamos creando. 
        Permite almacenar los valores recibidos dentro del objeto.
	================================= */
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
    this.activo = activo;
  }
}
