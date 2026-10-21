//Impoprtar utilidades
//importamos generarId() para asignar automaticamente un identificador interno a cada cuenta

import { generarId } from "../utils/helpers.js";

//modelo cuenta 
// representa una cuenta bancaria perteneciente a un usuario
export class Cuenta{
    constructor ({
        id = generarId(),
        numeroCuenta, 
        tipo = 'Ahorro', // si no se indic OTRO TIPO SE PONDRÁ AHORRO
        saldo = 0,
        usuarioId,
        fechaApertura = new Date().toISOString(),
        activa = true, 
    }){
        //asignar propiedades
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
Incrementa el saldo actual utilizando el monto recibido.
===================================== */
depositar(monto) {
this.saldo += Number(monto);
return this.saldo;
}
/* =====================================
RETIRAR
Disminuye el saldo actual utilizando el monto recibido.
===================================== */
retirar(monto) {
this.saldo -= Number(monto);
return this.saldo;
}
}