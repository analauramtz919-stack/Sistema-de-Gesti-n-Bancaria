/* =========================================
PUNTO DE ENTRADA DE LA APLICACIÓN
Mostramos en la consola un mensaje que nos permite comprobar que main.js se
está cargando correctamente desde nuestro index.html
========================================= */
console.log('Sistema de Gestión Bancaria - v0.3.0');

/* =========================================
IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
========================================= */
// Importamos las funciones encargadas de validar información.
import {
validarCampoObligatorio,
validarMonto,
} from './utils/validator.js';
// Importamos nuestra función auxiliar encargada de generar identificadores.
import {
generarId,
} from './utils/helpers.js';
// Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {
    formatCurrency,
formatDate,
formatAccountNumber,
} from './utils/formatters.js';
/* =========================================
PUNTO DE ENTRADA DE LA APLICACIÓN
========================================= */
// Mostramos la versión actual del proyecto
console.log('Sistema de Gestión Bancaria - v0.2.0');
// Validación de campo debe mostrar true
console.log(
'Campo obligatorio:',
validarCampoObligatorio('Banco Digital'),
);
// Probar validación del monto debe regresar True
console.log(
'Monto válido:',
validarMonto(1000),
);
// Generamos un identificador dinámico
console.log(
'ID generado:',
generarId(),
);
// Convertimos 1500 a formato monetario MXN
console.log(
'Monto formateado:',
formatCurrency(1500),
);
// Formateamos la fecha actual
console.log(
'Fecha formateada:',
formatDate(new Date()),
);
// Separamos visualmente cada cuatro dígitos
console.log(
'Número de cuenta:',
formatAccountNumber('123456789012'),
);

// importar modelo Ususario, cuenta y movimiento
import { Usuario } from './models/Usuario.js';  
import {Cuenta} from './models/Cuenta.js';
import { Movimiento } from './models/Movimiento.js';

//Usuario 
//creacionde nuestra primera instancia de la clase usuario
const usuarioDemo = new Usuario ({
    nombre: 'Ana Martinez',
    email: 'analaura@gmail.com',
    telefono: '5545075455',
    password: '1234566',
});

console.log('Usuario:', usuarioDemo);

/* ==========================================
CUENTA
Creamos una cuenta y la asociamos al usuario utilizando su ID
========================================== */
const cuentaDemo = new Cuenta({
numeroCuenta: '123456789012',
usuarioId: usuarioDemo.id,
});

// Mostramos la cuenta creada
console.log(
'Cuenta:',
cuentaDemo,
);

/* ==========================================
DEPÓSITO DE DEMOSTRACIÓN
Utilizamos el método depositar() de nuestra instancia de Cuenta.
========================================== */
cuentaDemo.depositar(1000);

/* Mostramos el nuevo saldo utilizando formatCurrency() desarrollado en
v0.2.0. */
console.log(
'Saldo después del depósito:',
formatCurrency(cuentaDemo.saldo),
);

/* ==========================================
MOVIMIENTO
Representamos manualmente el depósito mediante una instancia de Movimiento
========================================== */
const movimientoDemo = new Movimiento({
tipo: 'DEPOSITO',
monto: 1000,
descripcion: 'Depósito inicial',
/* Asociamos el movimiento con la cuenta creada. */
cuentaOrigen: cuentaDemo.id,
saldoResultante: cuentaDemo.saldo,
});

// Mostramos el movimiento creado
console.log(
'Movimiento:',
movimientoDemo,
);