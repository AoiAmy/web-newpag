// Validación para formulario de contacto — basada en formulario.js
(function(){
  const form = document.getElementById('contactoForm');
  if(!form) return;

  const nombre = document.getElementById('nombre');
  const asunto = document.getElementById('asunto');
  const mensaje = document.getElementById('mensaje');
  const mensajeCounter = document.getElementById('mensajeCounter');
  const successEl = document.getElementById('contactoSuccess');

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras y espacios, hasta 40
    asunto: /^.{1,60}$/, // al menos 1 caracter, hasta 60
    mensaje: /^.{10,300}$/ // 10 a 300 caracteres
  };

  const validarCampo = (expresion, input) => {
    if(expresion.test(input.value)){
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return false;
    }
  };

  // Actualizar contador de caracteres
  const updateCounter = () => {
    const len = mensaje.value.length;
    mensajeCounter.textContent = len;
  };

  // Listeners
  nombre.addEventListener('input', () => validarCampo(expresiones.nombre, nombre));
  asunto.addEventListener('input', () => validarCampo(expresiones.asunto, asunto));
  mensaje.addEventListener('input', () => {
    updateCounter();
    validarCampo(expresiones.mensaje, mensaje);
  });

  // Validación al submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const okNombre = validarCampo(expresiones.nombre, nombre);
    const okAsunto = validarCampo(expresiones.asunto, asunto);
    const okMensaje = validarCampo(expresiones.mensaje, mensaje);

    if(okNombre && okAsunto && okMensaje){
      // Mostrar success
      if(successEl) successEl.classList.remove('d-none');

      // Simular envío y limpiar campos automáticamente
      setTimeout(() => {
        form.reset();
        // limpiar estados visuales
        [nombre, asunto, mensaje].forEach(i => {
          i.classList.remove('is-valid');
          i.classList.remove('is-invalid');
        });
        updateCounter();
        if(successEl) successEl.classList.add('d-none');
      }, 1400);
    } else {
      // forzar mostrar feedback para campos invalidos
      if(!okNombre) nombre.classList.add('is-invalid');
      if(!okAsunto) asunto.classList.add('is-invalid');
      if(!okMensaje) mensaje.classList.add('is-invalid');
    }
  });

  // inicializar contador
  updateCounter();
})();
