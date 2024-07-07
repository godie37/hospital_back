let form_register = document.getElementById('form_register')
let form_login = document.getElementById('form_login')
let form_reset_pass = document.getElementById('form_reset_pass')


let bloque_errores = document.getElementById('bloque_errores')

if (form_register != null) {
   form_register.addEventListener('submit', async e => {
      e.preventDefault()
      let respuesta
      const DATA = Object.fromEntries(new FormData(e.target));

      const res_db = await fetch('/register', {
         method: 'post',
         headers: {
            "Content-Type": 'application/json'
         },
         body: JSON.stringify(DATA)
      })
         .then(res => res.json())
         .then(data => respuesta = data)

      Object.entries(DATA).forEach(([key, value]) => {
         if (value != '') {
            document.getElementById('error_' + key).setAttribute('hidden', 'true')
         }
      });

      if (respuesta.estado == 'success') {
         const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
            }
         });
         Toast.fire({
            icon: `${respuesta.estado}`,
            title: `${respuesta.mensaje}`
         });

         setTimeout(() => {
            location.href = '/login'
         }, 1000);
      } else {
         if (respuesta.estado == 'validacion') {
            bloque_errores.setAttribute('class', "flex flex-col text-white")
            bloque_errores.removeAttribute('hidden')
            let errores = JSON.parse(respuesta.mensajes)
            Object.entries(errores).forEach(([key, value]) => {
               document.getElementById('error_' + key).innerHTML = value
               document.getElementById('error_' + key).setAttribute('class', 'text-red-500 font-semibold text-sm')
            });
         } else if (respuesta.estado == 'error') {
            bloque_errores.setAttribute('class', "flex flex-col text-white")
            bloque_errores.removeAttribute('hidden')
            bloque_errores.innerHTML = `<p class="text-red-500 text-sm font-semibold">${respuesta.mensaje}</p>`
         } else {
            bloque_errores.innerHTML = ''
            bloque_errores.setAttribute('hidden', true)
         }
      }
   })
}

if (form_login != null) {
   form_login.addEventListener('submit', async e => {
      e.preventDefault()
      let respuesta
      const DATA = Object.fromEntries(new FormData(e.target));

      const res_db = await fetch('/login', {
         method: 'post',
         headers: {
            "Content-Type": 'application/json'
         },
         body: JSON.stringify(DATA)
      })
         .then(res => res.json())
         .then(data => respuesta = data)

      Object.entries(DATA).forEach(([key, value]) => {
         if (value != '') {
            document.getElementById('error_' + key).setAttribute('hidden', 'true')
         }
      });
      if (respuesta.estado == 'success') {
         window.location.href = '/inicio'
      } else if (respuesta.estado == 'validacion') {
         bloque_errores.setAttribute('class', "flex flex-col text-white")
         bloque_errores.removeAttribute('hidden')
         let errores = JSON.parse(respuesta.mensajes)
         Object.entries(errores).forEach(([key, value]) => {
            document.getElementById('error_' + key).innerHTML = value
            document.getElementById('error_' + key).setAttribute('class', 'text-red-500 font-semibold text-sm')
         });
      } else if (respuesta.estado == 'error') {
         bloque_errores.setAttribute('class', "flex flex-col text-white")
         bloque_errores.removeAttribute('hidden')
         bloque_errores.innerHTML = `<p class="text-red-500 text-sm font-semibold">${respuesta.mensaje}</p>`
      } else {
         bloque_errores.innerHTML = ''
         bloque_errores.setAttribute('hidden', true)
      }
   })
}

if (form_reset_pass != null) {
   form_reset_pass.addEventListener('submit', async e => {
      e.preventDefault()
      let respuesta
      const DATA = Object.fromEntries(new FormData(e.target));

      const res_db = await fetch('/reset_password', {
         method: 'post',
         headers: {
            "Content-Type": 'application/json'
         },
         body: JSON.stringify(DATA)
      })
         .then(res => res.json())
         .then(data => respuesta = data)

      Object.entries(DATA).forEach(([key, value]) => {
         if (value != '') {
            document.getElementById('error_' + key).setAttribute('hidden', 'true')
         }
      });

      if (respuesta.estado == 'success') {
         const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
            }
         });
         Toast.fire({
            icon: `${respuesta.estado}`,
            title: `${respuesta.mensaje}`
         });

         setTimeout(() => {
            location.href = '/login'
         }, 1000);

      } else {
         if (respuesta.estado == 'validacion') {
            bloque_errores.setAttribute('class', "flex flex-col text-white")
            bloque_errores.removeAttribute('hidden')
            let errores = JSON.parse(respuesta.mensajes)
            Object.entries(errores).forEach(([key, value]) => {
               document.getElementById('error_' + key).innerHTML = value
               document.getElementById('error_' + key).setAttribute('class', 'text-red-500 font-semibold text-sm')
            });
         } else if (respuesta.estado == 'error') {
            bloque_errores.setAttribute('class', "flex flex-col text-white")
            bloque_errores.removeAttribute('hidden')
            bloque_errores.innerHTML = `<p class="text-red-500 text-sm font-semibold">${respuesta.mensaje}</p>`
         } else {
            bloque_errores.innerHTML = ''
            bloque_errores.setAttribute('hidden', true)
         }
      }
   })
}