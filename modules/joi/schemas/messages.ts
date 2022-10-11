const messages = {
  recipe: {
    id: {
      "string.uuid": "El id debe ser una uuid.",
      "any.required": "Debe ingresar una id.",
    },
    title: {
      "string.min": "El titulo debe tener al menos 1 caracter",
      "any.required": "Debe ingresar un titulo.",
    },
    thumbnail: {
      "any.required": "Debe ingresar una foto.",
    },
    country: {
      "any.required": "Debe especificar un pais.",
    },
    content: {
      "string.min": "El contenido debe tener al menos 1 caracter.",
      "any.required": "Debe ingresar un contenido para la receta.",
    },
    portions: {
      "number.min": "La receta debe tener al menos 1 porcion.",
      "any.required": "Debe ingresar la cantidad de porciones.",
    },
    cooking_time: {
      "string.min": "La receta debe tener al menos 1 minuto de duracion.",
      "any.required": "Debe ingresar la duracion de la receta.",
    },
  },
};

export default messages;
