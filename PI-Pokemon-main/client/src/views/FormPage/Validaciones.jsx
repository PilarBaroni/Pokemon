// Esta función toma un objeto input como argumento y realiza la validación en sus campos.
const validate = (input) => {
    let errors = {}; // Inicializa un objeto vacío para almacenar los errores.
    let regexImage = /^(http|https):\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif)$/; // Expresión regular para validar URLs de imágenes.
    
    // Validación del campo 'name':
    if (!input.name) {
      errors.name = "Se requiere un nombre";
    } else if (input.name.length > 20) {
      errors.name = "Debe ser menor a 20 caracteres";
    } else if (/\s/.test(input.name)) {
      errors.name = "No debe contener espacios";
    }

    // Validación del campo 'image' (URL de imagen):
    if (!regexImage.test(input.image)) errors.image = "Ingresa una URL válida"; // Si la URL de la imagen no cumple con el patrón definido, se agrega un mensaje de error.
    

    // Validación del campo 'hp' (puntos de vida):
    if (input.hp <= 0) {
      errors.hp = "No puede ser menor o igual a 0"; // Si el campo 'hp' es menor o igual a 0, se agrega un mensaje de error.
    } else if (input.hp >= 150){
      errors.hp = "No puede ser mayor a 150";
    }

     // Validación del campo 'attack':
     if (!input.attack) {
      errors.attack = "No puede estar vacío";
    } else if (input.attack <= 0) {
      errors.attack = "No puede ser menor o igual a 0";
    } else if (input.attack >= 150){
      errors.attack = "Debe ser menor a 150";
    }

     // Validación del campo 'defense':
     if (!input.defense) {
      errors.defense = "No puede estar vacío";
    } else if (input.defense <= 0) {
      errors.defense = "No puede ser menor o igual a 0";
    } else if (input.defense >= 150){
      errors.defense = "Debe ser menor a 150";
    }

     // Validación del campo 'speed':
    if (input.speed < 0) {
      errors.speed = "No puede ser menor a 0";
    }
     // Validación del campo 'weight':
    if (input.weight < 0) {
      errors.weight = "No puede ser menor a 0";
    }

    // Finalmente, se verifica la cantidad de tipos seleccionados en el campo 'types':
    if (input.types?.length <= 0) {
      errors.types = "Debes elegir al menos 1 tipo"; // Si no se han seleccionado al menos 1 tipo, se agrega un mensaje de error.
    }
    

    if (!errors.types) errors.types = []; // Si no hay errores en 'types', se inicializa como un array vacío.

    return errors; // Retorna el objeto 'errors' que contiene los mensajes de error.
};

export default validate; // Exporta la función 'validate' para su uso en otros archivos.