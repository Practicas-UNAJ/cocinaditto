export const firebaseErrors: Record<string, any> = {
  "auth/user-not-found": [
    {
      field: `email`,
      message: `Email no registrado.`,
    },
  ],
  "auth/too-many-requests": [
    {
      field: `email`,
      message: `Hay muchas peticiones en este momento, intenta mas tarde.`,
    },
    {
      field: `password`,
      message: `Hay muchas peticiones en este momento, intenta mas tarde.`,
    },
  ],
  "auth/email-already-in-use": [
    {
      field: `email`,
      message: `El email ya esta en uso.`,
    },
  ],
  "auth/wrong-password": [
    {
      field: `email`,
      message: `Credenciales Invalidas.`,
    },
    {
      field: `password`,
      message: `Credenciales Invalidas.`,
    },
  ],
};

export const zodMessages = {
  INVALID_EMAIL: `Ingresa un email valido.`,
  PASSWORD_MIN_CHAR: `La contraseña debe tener al menos 6 caracteres.`,
  EMPTY_FIELD: `El campo no puede estar vacio.`,
  NO_ALPHANUM: `Solo puede contener caracteres [a-zA-Z0-9].`,
  PASSWORD_MISMATCHING: `Las contraseñas no coinciden.`,
  MIN_CHAR: `Debe tener al menos un caracter.`,
};
