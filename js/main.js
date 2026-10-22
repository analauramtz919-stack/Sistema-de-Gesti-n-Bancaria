/* ========================================= 
			IMPORTACIONES 
========================================= */
import { Usuario } from "./models/Usuario.js";

import { Cuenta } from "./models/Cuenta.js";

import { generarNumeroCuenta } from "./utils/helpers.js";

import { validarCampoObligatorio } from "./utils/validators.js";

import { STORAGE_KEYS, storageService } from "./services/StorageService.js";

/* ========================================= 
		NUEVA IMPORTACION AUTH SERVICE
========================================= */
import { authService } from "./services/AuthService.js";

/* ========================================= 
			INICIALIZAR STORAGE 
========================================= */
function inicializarStorage() {
  /* ===================================== 
			RECUPERAR USUARIOS 
	===================================== */
  const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, null);

  /* ===================================== 
			RECUPERAR CUENTAS 
	===================================== */
  const cuentas = storageService.obtener(STORAGE_KEYS.CUENTAS, null);

  /* ===================================== 
			RECUPERAR MOVIMIENTOS 
	===================================== */
  const movimientos = storageService.obtener(STORAGE_KEYS.MOVIMIENTOS, null);

  /* ===================================== 
			INICIALIZAR USUARIOS 
	===================================== */
  if (usuarios === null) {
    storageService.guardar(STORAGE_KEYS.USUARIOS, []);
  }

  /* ===================================== 
			INICIALIZAR CUENTAS 
	===================================== */
  if (cuentas === null) {
    storageService.guardar(STORAGE_KEYS.CUENTAS, []);
  }

  /* ===================================== 
			INICIALIZAR MOVIMIENTOS 
	===================================== */
  if (movimientos === null) {
    storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, []);
  }
}

/* ========================================= 
			MANEJAR REGISTRO 
========================================= */
function manejarRegistro(event) {
  /* ===================================== 
			EVITAR ENVÍO TRADICIONAL 
	===================================== */
  event.preventDefault();

  /* ===================================== 
				OBTENER NOMBRE 
	===================================== */
  const nombre = document.querySelector("#registroNombre").value.trim();

  /* ===================================== 
				OBTENER EMAIL 
	===================================== */
  const email = document
    .querySelector("#registroEmail")
    .value.trim()
    .toLowerCase();

  /* ===================================== 
				OBTENER TELÉFONO 
	===================================== */
  const telefono = document.querySelector("#registroTelefono").value.trim();

  /* ===================================== 
				OBTENER CONTRASEÑA 
	===================================== */
  const password = document.querySelector("#registroPassword").value;

  /* ===================================== 
			CONFIRMAR CONTRASEÑA 
	===================================== */
  const confirmarPassword = document.querySelector(
    "#registroConfirmPassword",
  ).value;

  /* ===================================== 
				VALIDAR CAMPOS 
	===================================== */
  if (
    !validarCampoObligatorio(nombre) ||
    !validarCampoObligatorio(email) ||
    !validarCampoObligatorio(password)
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Completa los campos obligatorios.",
    });

    return;
  }

  /* ===================================== 
				VALIDAR LONGITUD 
	===================================== */
  if (password.length < 6) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña inválida",
      text: "La contraseña debe tener al menos 6 caracteres.",
    });

    return;
  }

  /* ===================================== 
				COMPARAR CONTRASEÑAS 
	===================================== */
  if (password !== confirmarPassword) {
    Swal.fire({
      icon: "warning",
      title: "Contraseñas diferentes",
      text: "Las contraseñas no coinciden.",
    });

    return;
  }

  /* ===================================== 
				RECUPERAR USUARIOS 
	===================================== */
  const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

  /* ===================================== 
				COMPROBAR EMAIL 
	===================================== */
  const emailExistente = usuarios.some(
    (usuario) => usuario.email.toLowerCase() === email,
  );

  /* ===================================== 
				EMAIL DUPLICADO 
	===================================== */
  if (emailExistente) {
    Swal.fire({
      icon: "error",
      title: "Correo registrado",
      text: "Ya existe un usuario con este correo.",
    });

    return;
  }

  /* ===================================== 
				CREAR USUARIO 
	===================================== */
  const nuevoUsuario = new Usuario({
    nombre,
    email,
    telefono,
    password,
  });

  /* ===================================== 
				GENERAR NÚMERO DE CUENTA 
	===================================== */
  let numeroCuenta;

  do {
    numeroCuenta = generarNumeroCuenta();
  } while (
    storageService
      .obtener(STORAGE_KEYS.CUENTAS, [])
      .some((cuenta) => cuenta.numeroCuenta === numeroCuenta)
  );

  /* ===================================== 
				CREAR CUENTA 
	===================================== */
  const nuevaCuenta = new Cuenta({
    numeroCuenta,
    tipo: "Ahorro",
    saldo: 0,
    usuarioId: nuevoUsuario.id,
  });

  /* ===================================== 
				RECUPERAR CUENTAS 
	===================================== */
  const cuentas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);

  /* ===================================== 
				AGREGAR USUARIO 
	===================================== */
  usuarios.push(nuevoUsuario);

  /* ===================================== 
				AGREGAR CUENTA 
	===================================== */
  cuentas.push(nuevaCuenta);

  /* ===================================== 
				GUARDAR USUARIOS 
	===================================== */
  storageService.guardar(STORAGE_KEYS.USUARIOS, usuarios);

  /* ===================================== 
				GUARDAR CUENTAS 
	===================================== */
  storageService.guardar(STORAGE_KEYS.CUENTAS, cuentas);

  /* ===================================== 
				REGISTRO EXITOSO 
	===================================== */
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Tu usuario y cuenta bancaria fueron creados correctamente.",
    confirmButtonText: "Continuar",
  }).then(() => {
    /* ================================= 
			    LIMPIAR FORMULARIO 
		================================= */
    document.querySelector("#formRegistro").reset();

    /* ================================= 
				COPIAR EMAIL AL LOGIN 
		================================= */
    document.querySelector("#loginEmail").value = email;
  });
}

/* ========================================= 
			MANEJAR LOGIN 
========================================= */
function manejarLogin(event) {
  /* ===================================== 
			EVITAR ENVÍO TRADICIONAL 
	===================================== */
  event.preventDefault();

  /* ===================================== 
				OBTENER EMAIL 
	===================================== */
  const email = document
    .querySelector("#loginEmail")
    .value.trim()
    .toLowerCase();

  /* ===================================== 
			OBTENER CONTRASEÑA 
	===================================== */
  const password = document.querySelector("#loginPassword").value;

  /* ===================================== 
				VALIDAR CAMPOS 
	===================================== */
  if (!validarCampoObligatorio(email) || !validarCampoObligatorio(password)) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Ingresa tu correo y contraseña.",
    });

    return;
  }

  /* ===================================== 
				INTENTAR LOGIN 
	===================================== */
  try {
    const usuario = authService.login(email, password);

    /* ================================= 
					LOGIN EXITOSO 
		================================= */
    Swal.fire({
      icon: "success",
      title: `Bienvenido, ${usuario.nombre}`,
      text: "Inicio de sesión correcto.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  } catch (error) {
    /* ===================================== 
				    ERROR DE LOGIN 
		===================================== */
    Swal.fire({
      icon: "error",
      title: "No fue posible iniciar sesión",
      text: error.message,
    });
  }
}

/* ========================================= 
			INICIALIZAR 
========================================= */
function init() {
  /* ===================================== 
				INICIALIZAR STORAGE
	===================================== */
  inicializarStorage();

  /* ===================================== 
				COMPROBAR SESIÓN 
	===================================== */
  if (authService.getCurrentUser()) {
    window.location.href = "dashboard.html";

    return;
  }

  /* ===================================== 
				OBTENER LOGIN 
	===================================== */
  const formLogin = document.querySelector("#formLogin");

  /* ===================================== 
				OBTENER REGISTRO 
	===================================== */
  const formRegistro = document.querySelector("#formRegistro");

  /* ===================================== 
				EVENTO LOGIN 
	===================================== */
  if (formLogin) {
    formLogin.addEventListener("submit", manejarLogin);
  }

  /* ===================================== 
				EVENTO REGISTRO 
	===================================== */
  if (formRegistro) {
    formRegistro.addEventListener("submit", manejarRegistro);
  }
}

/* ========================================= 
			EJECUTAR APLICACIÓN 
========================================= */
init();