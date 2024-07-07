import { validacionBlur } from '../validaciones.js'

let selectEspecialidad = document.getElementById('especialidad')
let form_medicos = document.getElementById('form_medicos')
let error_dia_atencion = document.getElementById('error_dia_atencion')
let dias_seleccionados = document.getElementById('dias_seleccionados')
let tit_form = document.getElementById('tit_form')
let query = location.href.split("/");

window.addEventListener("load", () => {
   obtener_especialidades();

   query.find((q) => {
      if (q == 'crear') {
         tit_form.innerHTML = 'Nuevo médico'
      } else if (q == 'edit') {
         obtener_medico()
         tit_form.innerHTML = 'Editar médico'
      }
   })
});


const obtener_especialidades = async () => {
   const RESP = await fetch("/api/especialidades");
   const ESPECIALIDADES = await RESP.json();
   generarOpciones(ESPECIALIDADES);
};

const obtener_medico = async () => {
   let id = query[query.length - 1];
   const RESP = await fetch("/api/medico/" + id);
   const MEDICO = await RESP.json();
   recuperarDatosMedico(MEDICO[0]);
};

const generarOpciones = (espeacialidades) => {
   espeacialidades.forEach((e) => {
      let option = document.createElement("option");
      option.value = e.id;
      option.text = e.descripcion;
      selectEspecialidad.add(option);
   });

}

const recuperarDatosMedico = (medico) => {
   let hay_archivo = document.getElementById('existe_archivo')
   let horario_atencion = JSON.parse(medico.horario_atencion)

   document.getElementById('nombre').value = medico.nombre
   document.getElementById('apellido').value = medico.apellido
   document.getElementById('matricula').value = medico.matricula
   document.getElementById('especialidad').value = medico.especialidad_id
   document.getElementById('hora_inicio').value = horario_atencion[0]
   document.getElementById('hora_fin').value = horario_atencion[1]

   if (medico.foto_perfil != null && medico.foto_perfil != '') {
      hay_archivo.setAttribute('style', 'font-weight: 700; font-size:14px; margin-top:5px;')
      hay_archivo.innerHTML = '**Existe un archivo adjunto**'
      document.getElementById('foto_perfil').dataset.validacion = '[]'
      document.getElementById('foto_perfil_hidden').value = medico.foto_perfil
   } else {
      hay_archivo.setAttribute('class', 'hidden')
      document.getElementById('foto_perfil').dataset.validacion = '["required"]'
   }

   let checks = document.querySelectorAll('input[type="checkbox"]')
   checks.forEach(c => {
      JSON.parse(medico.dias_atencion).find(dia => {
         if (dia == c.value) {
            c.checked = true
         }
      })
   })
}

form_medicos.addEventListener('submit', async e => {
   e.preventDefault()
   let ruta
   let respuesta
   let dias_atencion = []

   query.find((q) => {
      if (q == 'crear') {
         ruta = '/medicos/crear'
      } else if (q == 'edit') {
         ruta = '/medicos/edit/' + query[query.length - 1]
      }
   })

   let claves_form = {
      'nombre': document.getElementById('nombre').value,
      'apellido': document.getElementById('apellido').value,
      'matricula': document.getElementById('matricula').value,
      'especialidad': document.getElementById('especialidad').value,
      'hora_inicio': document.getElementById('hora_inicio').value,
      'hora_fin': document.getElementById('hora_fin').value
   }

   let ids = document.querySelectorAll("input[name='dia_atencion[]']:checked");

   ids.forEach(id => dias_atencion.push(id.value))

   if (validacionBlur(claves_form)) {
      if (dias_atencion.length > 0) {
         error_dia_atencion.setAttribute('class', 'hidden')
         dias_seleccionados.value = JSON.stringify(dias_atencion)
         let arr_img_perfil = (document.getElementById('foto_perfil').value).split(["\\"])

         const DATA = Object.fromEntries(new FormData(e.target));

         // Formateo el campo foto_perfil, para que si es un edit y no se modifica la imagen guarda la que viene desde la DB. En caso del crear, se tiene en cuenta que no quede en "undefined" ya que sino no pasa al back
         DATA.foto_perfil = arr_img_perfil[2] != document.getElementById('foto_perfil_hidden').value && arr_img_perfil[2] != '' && arr_img_perfil[2] != undefined ? arr_img_perfil[2] : (ruta = '/medicos/crear' ? '' : document.getElementById('foto_perfil_hidden').value)

         let method = ruta == '/medicos/crear' ? 'POST' : 'PUT'
         
         const res_db = await fetch(`${ruta}`, {
            method: method,
            headers: {
               "Content-Type": 'application/json'
            },
            body: JSON.stringify(DATA)
         })
            .then(res => res.json())
            .then(data => respuesta = data)

         if (respuesta.estado != 'validacion') {
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

            if (respuesta.estado == 'success') {
               setTimeout(() => {
                  form_medicos.reset()
                  window.location.href = '/medicos'
               }, 1000);
            }
         } else {
            let msj_error = JSON.parse(respuesta.mensajes)
            // Muestro los errores del servidor
            Object.entries(msj_error).forEach(([key, value]) => {
               document.getElementById('error_' + key).innerHTML = value
               document.getElementById('error_' + key).setAttribute('style', 'color:red; font-weight: 700;')
            });
         }
      }

   } else {
      error_dia_atencion.innerHTML = 'Debe seleccionar como mínimo un día de atención'
      error_dia_atencion.setAttribute('style', 'color:red; font-weight: 700;')
   }
})