/* ========================================= 
IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
========================================= */
// Importamos las funciones encargadas de validar información.
import { validarCampoObligatorio, validarMonto } from "./utils/validators.js";

// Importamos nuestra función auxiliar encargada de generar identificadores.
import { generarId } from "./utils/helpers.js";

// Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {
  formatCurrency,
  formatDate,
  formatAccountNumber,
} from "./utils/formatters.js";

//Importamos las clases que representan las principales entidades del sistema.
import { Usuario } from "./models/Usuario.js";
import { Cuenta } from "./models/Cuenta.js";
import { Movimiento } from "./models/Movimiento.js";
import { Banco } from "./models/Banco.js";

/* ========================================= 
		IMPORTAR SERVICIO DE PERSISTENCIA
STORAGE_KEYS: contiene las claves oficiales. 
storageService: permite guardar y recuperar los datos.
========================================= */
import { STORAGE_KEYS, storageService } from "./services/StorageService.js";

//window representa el objeto global de la página web en el navegador.
//window.storageService = storageService;

//Mensaje que muestra en pantalla la version que se esta ejecutando
console.log("Sistema de Gestión Bancaria - v0.5.0");

/* ========================================= 
		GUARDAR ESTADO DEL BANCO
Recibe una instancia de Banco y persiste sus tres colecciones.
========================================= */

/*Utiliza storageService para almacenar usuarios, 
cuentas y movimientos dentro de LocalStorage.*/

function guardarBanco(banco) {
  /* ===================================== 
			GUARDAR USUARIOS 
	===================================== */
  //Internamente, guardar() utiliza JSON.stringify() y localStorage.setItem().
  storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);

  /* ===================================== 
		    GUARDAR CUENTAS 
	===================================== */
  storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);

  /* ===================================== 
			GUARDAR MOVIMIENTOS 
	===================================== */
  storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);
}

/* ========================================= 
			CARGAR BANCO
Recupera la información persistida, reconstruye cada instancia y finalmente crea nuevamente el Banco.
========================================= */

function cargarBanco() {
  // RECUPERAR USUARIOS
  /*Declara una variable llamada usuariosGuardados, que almacenará el resultado de la recuperación.
  storageService es la instancia que importamos desde StorageService.js
  Esta instancia contiene los métodos guardar(), obtener(), eliminar() y limpiar() */

  const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

  // RECUPERAR CUENTAS
  const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);

  // RECUPERAR MOVIMIENTOS
  const movimientosGuardados = storageService.obtener(
    STORAGE_KEYS.MOVIMIENTOS,
    [],
  );

  // RECONSTRUIR USUARIOS
  // map() recorre cada elemento y crea una nueva instancia de Usuario.
  const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));

  // RECONSTRUIR CUENTAS
  // Reconstruimos Cuenta para recuperar también sus métodos
  const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta(cuenta));

  // RECONSTRUIR MOVIMIENTOS
  const movimientos = movimientosGuardados.map(
    (movimiento) => new Movimiento(movimiento),
  );

  // CREAR NUEVAMENTE EL BANCO
  // Utilizamos las colecciones reconstruidas como estado inicial del Banco
  return new Banco({
    usuarios,
    cuentas,
    movimientos,
  });
}

/* ========================================= 
	PRUEBAS DE UTILIDADES
========================================= */

// Validación de campo debe mostrar true
console.log("Campo obligatorio:", validarCampoObligatorio("Banco Digital"));

// Probar validación del monto debe regresar True
console.log("Monto válido:", validarMonto(1000));

// Generamos un identificador dinámico
console.log("ID generado:", generarId());

// Convertimos 1500 a formato monetario MXN
console.log("Monto formateado:", formatCurrency(1500));

// Formateamos la fecha actual
console.log("Fecha formateada:", formatDate(new Date()));

// Separamos visualmente cada cuatro dígitos
console.log("Número de cuenta:", formatAccountNumber("123456789012"));

//=============================================
//CARGAR BANCO PERSISTIDO
//CargarBanco() primero busca información guardada antes de crear la instancia.
//=============================================

const bancoDemo = cargarBanco();

// ==========================================
// DATOS INICIALES
// VALIDAR SI EL BANCO ESTÁ VACÍO
// ==========================================

if (bancoDemo.usuarios.length === 0) {
  // CREAR USUARIO INICIAL DEMO
  const usuarioDemo = new Usuario({
    nombre: "Rosa Andrade",
    email: "rosa123@correo.com",
    telefono: "4666672453",
    password: "123456",
  });

  // REGISTRAR USUARIO
  bancoDemo.agregarUsuario(usuarioDemo);

  // CREAR CUENTA INICIAL DEMO
  const cuentaDemo = new Cuenta({
    numeroCuenta: "123456789012",
    usuarioId: usuarioDemo.id,
  });

  // REGISTRAR CUENTA
  bancoDemo.agregarCuenta(cuentaDemo);

  // REALIZAR DEPÓSITO INICIAL DEMO
  bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: 1000,
    descripcion: "Depósito inicial",
  });

  // GUARDAR BANCO DEMO
  guardarBanco(bancoDemo);

  console.log("Datos iniciales creados y guardados.");
}

// ==========================================
// COMPROBAR DATOS RECUPERADOS
// ==========================================

console.log("Banco recuperado:", bancoDemo);

console.log("Usuarios almacenados:", bancoDemo.usuarios);

console.log("Cuentas almacenadas:", bancoDemo.cuentas);

console.log("Movimientos almacenados:", bancoDemo.movimientos);

// ==========================================
// OBTENER PRIMERA CUENTA
// ==========================================
const cuentaPrincipal = bancoDemo.cuentas[0] || null;

/* ========================================= 
	SI EXISTE MOSTRAR SALDO PERSISTIDO 
    comprueba que hay una cuenta disponible, muestra su saldo 
    y verifica que la reconstrucción de las instancias realizada 
    por cargarBanco() permite seguir utilizando 
    los métodos definidos en la clase Cuenta
========================================= */
if (cuentaPrincipal) {
  console.log("Saldo persistido:", formatCurrency(cuentaPrincipal.saldo));

  console.log(
    "¿La cuenta recuperada sigue siendo una instancia de Cuenta?",
    cuentaPrincipal instanceof Cuenta,
  );

  console.log("Tipo de depositar:", typeof cuentaPrincipal.depositar);
}