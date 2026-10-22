/* ========================================= 
		CLAVES DE ALMACENAMIENTO
    Centralizamos los nombres de todas las claves utilizadas por LocalStorage.
    Así evitamos escribir cadenas manualmente por todo el proyecto. 
========================================= */
export const STORAGE_KEYS = {
  //identifica la colección de usuarios
  USUARIOS: "usuarios",
  //identifica la colección de cuentas
  CUENTAS: "cuentas",
  //identifica el historial de movimientos
  MOVIMIENTOS: "movimientos",
  //identifica el historial de sesion
  SESION: "sesion",
};

/* Esta clase centralizará toda la comunicación con LocalStorage. 
La clase proporciona métodos para guardar(), obtener(), eliminar() y limpiar()
 */
class StorageService {
  /* ========================================= 
		GUARDAR INFORMACIÓN
    Recibe: 
    clave → dónde guardaremos la información. 
    valor → dato que queremos almacenar.
========================================= */
  guardar(clave, valor) {
    //Convierte el valor a JSON y lo almacena
    const valorJSON = JSON.stringify(valor);

    /* Guardamos el JSON utilizando la clave recibida. */
    localStorage.setItem(clave, valorJSON);
  }

  /* ========================================= 
		OBTENER INFORMACIÓN
clave: indica qué información queremos recuperar. v
alorPorDefecto: será retornado cuando no exista información almacenada. 
========================================= */

  /*Recibe dos argumentos:
clave o nombre que identifica el dato.
valorJSON o bien cadena que contiene los datos convertidos a formato JSON.*/
  obtener(clave, valorPorDefecto = null) {
    /* getItem() devuelve el contenido almacenado como texto. Si la clave no existe devuelve null. */
    const valor = localStorage.getItem(clave);

    // VALIDAR SI EXISTE INFORMACIÓN
    if (valor === null) {
      return valorPorDefecto;
    }

    // CONVERTIR JSON
    try {
      return JSON.parse(valor);
    } catch (error) {
      //Si el JSON almacenado es inválido, evitamos detener toda la aplicación.
      console.error(
        `No fue posible leer la clave "${clave}" de LocalStorage.`,
        error,
      );
      /* Si ocurre un error regresamos el valor predeterminado. */
      return valorPorDefecto;
    }
  }

  /* ========================================= 
		ELIMINAR INFORMACIÓN
Elimina únicamente la clave recibida sin afectar el resto de LocalStorage.
========================================= */
  eliminar(clave) {
    localStorage.removeItem(clave);
  }

  /* ========================================= 
		LIMPIAR LOCALSTORAGE 
========================================= */
  limpiar() {
    localStorage.clear();
  }
}

/* ========================================= 
		CREAR INSTANCIA DEL SERVICIO
Creamos una sola instancia que podrá reutilizarse desde diferentes módulos. 
========================================= */
export const storageService = new StorageService();
