// Validación simple para modal de login basada en formulario.js
(function(){
  const loginForm = document.getElementById('loginForm');
  if(!loginForm) return;

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');

  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // contraseña: 8-12 caracteres, al menos una letra y un número
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,12}$/
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

  emailInput.addEventListener('input', () => validarCampo(expresiones.correo, emailInput));
  passwordInput.addEventListener('input', () => validarCampo(expresiones.password, passwordInput));

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailOk = validarCampo(expresiones.correo, emailInput);
    const passOk = validarCampo(expresiones.password, passwordInput);

    if(emailOk && passOk){
      // Mostrar mensaje de éxito dentro del modal
      const successEl = document.getElementById('loginSuccess');
      if(successEl){
        successEl.classList.remove('d-none');
      }

      // Aquí podrías enviar los datos al servidor (fetch/ajax). Simulamos éxito:
      console.log('Login válido:', { email: emailInput.value });

      // Después de un breve delay ocultar mensaje, cerrar modal y limpiar formulario
      setTimeout(() => {
        const modalEl = document.getElementById('loginModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();

        if(successEl){
          successEl.classList.add('d-none');
        }

        loginForm.reset();
        emailInput.classList.remove('is-valid');
        passwordInput.classList.remove('is-valid');
      }, 1800);
    } else {
      // Forzar mostrar mensajes de error si hay campos inválidos
      if(!emailOk) emailInput.classList.add('is-invalid');
      if(!passOk) passwordInput.classList.add('is-invalid');
    }
  });
})();
