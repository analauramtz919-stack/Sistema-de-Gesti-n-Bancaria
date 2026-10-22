/* ========================================= 
			IMPORTAR STORAGE SERVICE 
========================================= */
import { STORAGE_KEYS, storageService } from "./StorageService.js";

/* ========================================= 
			SERVICIO DE AUTENTICACIÓN 
========================================= */
class AuthService {
  /* ===================================== 
				INICIAR SESIÓN 
	===================================== */
  login(email, password) {
    /* ================================= 
				RECUPERAR USUARIOS 
		================================= */
    const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

    /* ================================= 
					NORMALIZAR CORREO 
		================================= */
    const emailNormalizado = String(email).trim().toLowerCase();

    /* ================================= 
				BUSCAR USUARIO 
		================================= */
    const usuario = usuarios.find(
      (u) =>
        u.email.toLowerCase() === emailNormalizado &&
        u.password === password &&
        u.activo !== false,
    );

    /* ================================= 
				VALIDAR CREDENCIALES 
		================================= */
    if (!usuario) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    /* ================================= 
				CREAR SESIÓN 
	================================= */
    const sesion = {
      usuarioId: usuario.id,
      fechaInicio: new Date().toISOString(),
    };

    /* ================================= 
				GUARDAR SESIÓN 
		================================= */
    storageService.guardar(STORAGE_KEYS.SESION, sesion);

    /* ================================= 
				DEVOLVER USUARIO 
		================================= */
    return usuario;
  }

  /* ===================================== 
				CERRAR SESIÓN 
	===================================== */
  logout() {
    storageService.eliminar(STORAGE_KEYS.SESION);
  }

  /* ===================================== 
			OBTENER USUARIO ACTUAL 
	===================================== */
  getCurrentUser() {
    /* ================================= 
			    RECUPERAR SESIÓN 
		================================= */
    const sesion = storageService.obtener(STORAGE_KEYS.SESION, null);

    /* ================================= 
					VALIDAR SESIÓN 
		================================= */
    if (!sesion) {
      return null;
    }

    /* ================================= 
					RECUPERAR USUARIOS 
		================================= */
    const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

    /* ================================= 
					BUSCAR USUARIO 
		================================= */
    return usuarios.find((usuario) => usuario.id === sesion.usuarioId) || null;
  }

  /* ===================================== 
				PROTEGER RUTA 
	===================================== */
  protegerRuta() {
    /* ================================= 
					OBTENER USUARIO 
		================================= */
    const usuario = this.getCurrentUser();

    /* ================================= 
					SIN AUTENTICACIÓN 
		================================= */
    if (!usuario) {
      window.location.href = "index.html";

      return false;
    }

    /* ================================= 
					ACCESO PERMITIDO 
		================================= */
    return true;
  }
}

/* ========================================= 
			INSTANCIA AUTH SERVICE 
========================================= */
export const authService = new AuthService();