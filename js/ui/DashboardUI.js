/* ========================================= 
			IMPORTAR AUTH SERVICE 
========================================= */
import { authService } from "../services/AuthService.js";

/* ========================================= 
			MOSTRAR USUARIO 
========================================= */
function mostrarUsuario() {
  /* ===================================== 
				OBTENER USUARIO ACTUAL 
	===================================== */
  const usuario = authService.getCurrentUser();

  /* ===================================== 
				VALIDAR USUARIO 
	===================================== */
  if (!usuario) {
    return;
  }

  /* ===================================== 
				OBTENER ELEMENTO 
	===================================== */
  const nombreUsuario = document.querySelector("#nombreUsuario");

  /* ===================================== 
				MOSTRAR NOMBRE 
	===================================== */
  if (nombreUsuario) {
    nombreUsuario.textContent = `Sesión iniciada como ${usuario.nombre}`;
  }
}

/* ========================================= 
			INICIALIZAR LOGOUT 
========================================= */
function inicializarLogout() {
  /* ===================================== 
				OBTENER BOTÓN 
	===================================== */
  const logoutBtn = document.querySelector("#logoutBtn");

  /* ===================================== 
				VALIDAR BOTÓN 
	===================================== */
  if (!logoutBtn) {
    return;
  }

  /* ===================================== 
					EVENTO CLICK 
	===================================== */
  logoutBtn.addEventListener("click", () => {
    /* ================================= 
				        CONFIRMAR SALIDA 
			================================= */
    Swal.fire({
      icon: "question",
      title: "Cerrar sesión",
      text: "¿Seguro que deseas salir?",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* ================================= 
				            CANCELAR SALIDA 
				================================= */
      if (!result.isConfirmed) {
        return;
      }

      /* ================================= 
							CERRAR SESIÓN 
				================================= */
      authService.logout();

      /* ================================= 
							REDIRIGIR 
				================================= */
      window.location.href = "index.html";
    });
  });
}

/* ========================================= 
			INICIALIZAR DASHBOARD 
========================================= */
function init() {
  /* ===================================== 
				PROTEGER RUTA 
	===================================== */
  const accesoPermitido = authService.protegerRuta();

  /* ===================================== 
				DETENER SIN ACCESO 
	===================================== */
  if (!accesoPermitido) {
    return;
  }

  /* ===================================== 
				MOSTRAR USUARIO 
	===================================== */
  mostrarUsuario();

  /* ===================================== 
			    ACTIVAR LOGOUT 
	===================================== */
  inicializarLogout();
}

/* ========================================= 
			EJECUTAR DASHBOARD 
========================================= */
init();