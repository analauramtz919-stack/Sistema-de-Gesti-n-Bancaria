/* =========================================
IMPORTAMOS MODELOS DEL DOMINIO Y LOCALSTORAGE
// Importamos Banco porque será el objeto que coordinará usuarios, cuentas y
movimientos.
========================================= */
import {
Banco,
} from '../models/Banco.js';
import {
Usuario,
} from '../models/Usuario.js';
import {
Cuenta,
} from '../models/Cuenta.js';
import {
Movimiento,
} from '../models/Movimiento.js';
import {
STORAGE_KEYS,
storageService,
} from './StorageService.js';

/* =========================================
SERVICIO BANCARIO
// Guardará una instancia de Banco.
========================================= */
class BancoService {
constructor() {
this._banco = null;
}

cargarBanco() {
// Recupera los usuarios almacenados. Si todavía no existen, devuelve [].
const usuariosGuardados =
storageService.obtener(
STORAGE_KEYS.USUARIOS,
[],
);
// Recupera las cuentas almacenadas.
const cuentasGuardadas = storageService.obtener(
STORAGE_KEYS.CUENTAS,
[],
);
// Recupera los movimientos almacenados.
const movimientosGuardados =
storageService.obtener(
STORAGE_KEYS.MOVIMIENTOS,
[],
);
// Convierte cada objeto plano recuperado en una instancia real de Usuario.
const usuarios =
usuariosGuardados.map(
(usuario) =>
new Usuario(usuario),
);
// Reconstruye cada cuenta para recuperar también sus métodos
const cuentas =
cuentasGuardadas.map(
(cuenta) =>
new Cuenta(cuenta),
);
// Reconstruye los movimientos utilizando la clase Movimiento
const movimientos =
movimientosGuardados.map(
(movimiento) =>
new Movimiento(
movimiento,
),
);
//contruye una instancia de banco utilizando las colecciones reconstruidas.
this._banco =
new Banco({
usuarios,
cuentas,
movimientos,
});
return this._banco;

}
// Devuelve la instancia actual del Banco. Si todavía no existe, la carga primero.
obtenerInstanciaBanco() {
// Comprueba si _banco todavía es null. Reconstruye el Banco desde LocalStorage.
if (!this._banco) {
return this.cargarBanco();
}
// Si ya existe, reutiliza la instancia.
return this._banco;
}
// Obliga al servicio a reconstruir nuevamente el Banco utilizando la información persistida.
recargarBanco() {
// Elimina la referencia a la instancia actual.
this._banco = null;
return this.cargarBanco();
}

guardarBanco() {
// Obtiene la instancia actual.
const banco =
this.obtenerInstanciaBanco();
// Guarda los usuarios.
storageService.guardar(
STORAGE_KEYS.USUARIOS,
banco.usuarios,
);
storageService.guardar(
STORAGE_KEYS.CUENTAS,
banco.cuentas,
);
storageService.guardar(
STORAGE_KEYS.MOVIMIENTOS,
banco.movimientos,
);
// Indica que la operación terminó.
return true;
}

obtenerDatosUsuario(usuarioId,) {
// Obtiene la instancia actual del Banco.
const banco =
this.obtenerInstanciaBanco();
// Busca al usuario utilizando una regla que ya existe en Banco.js.
const usuario =
banco.buscarUsuarioPorId(
usuarioId,
);
// Si el usuario no existe detenemos la operación mediante una excepción.
if (!usuario) {
throw new Error(
'El usuario no existe.',
);
}
// Obtiene únicamente las cuentas pertenecientes al usuario.
const cuentas =
banco.obtenerCuentasDeUsuario(
    usuarioId,
);
// Recorre todas las cuentas del usuario y obtiene sus movimientos.
// Obtiene todos los movimientos relacionados con todas las cuentas del usuario.
const movimientosSinFiltrar =
cuentas.flatMap(
(cuenta) =>
banco.obtenerMovimientosDeCuenta(
cuenta.id,
),
);
// Elimina movimientos duplicados. filter() decide qué elementos conservar.
// findIndex() encuentra la primera posición donde aparece un movimiento con el
// mismo id.
const movimientos =
movimientosSinFiltrar.filter(
(
movimiento,
index,
array,
) =>
index ===
array.findIndex(
(item) =>
item.id ===
movimiento.id,

),
);

return {
usuario,
cuentas,
movimientos,
};
}

// Construye un resumen listo para ser consumido por el Dashboard.
obtenerResumenUsuario(usuarioId,) {
// Destructuring: extraemos directamente las propiedades que necesitamo del objeto retornado.
const { usuario,
cuentas,
movimientos,
} =
this.obtenerDatosUsuario(
usuarioId,
);

// Suma el saldo de todas las cuentas. El acumulador comienza en 0.
const saldoTotal =
cuentas.reduce(
(
acumulado,
cuenta,
) =>
acumulado +
Number(
cuenta.saldo,
),
0,
);

// Entrega al Dashboard tanto los datos originales como los indicadores
// calculados.
return {
usuario,
cuentas,
movimientos,
saldoTotal,
totalCuentas: cuentas.length,
totalMovimientos: movimientos.length,
};

}
}

// Crea y exporta una única instancia reutilizable de BancoService.
export const bancoService =
new BancoService();