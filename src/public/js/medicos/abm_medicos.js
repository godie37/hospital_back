import { validacionBlur } from '../validaciones.js'

let selectEspecialidad = document.getElementById('especialidad')
let form_medicos = document.getElementById('form_medicos')
let btn_form_medicos = document.getElementById('btn_form_medicos')
let error_dia_atencion = document.getElementById('error_dia_atencion')
let dias_seleccionados = document.getElementById('dias_seleccionados')
let tit_form = document.getElementById('tit_form')
let query = location.href.split("/");

window.addEventListener("load", () => {
   obtener_especialidades();

   query.find((q) => {
      if (q == 'crear') {
         form_medicos.setAttribute('action', '/medicos/crear')
         tit_form.innerHTML = 'Nuevo médico'
      } else if (q == 'edit') {
         obtener_medico()
         form_medicos.setAttribute('action', '/medicos/edit/' + query[query.length - 1])
         tit_form.innerHTML = 'Editar médico'
      }
   })

   
});

const menejoErrores = async () => {
   const RESP = await fetch('medicos/edit/' + query[query.length - 1]);
   const ERRORES = await RESP.json();
   console.log(ERRORES)
}

const obtener_especialidades = async () => {
   const RESP = await fetch("/api/especialidades");
   const ESPECIALIDADES = await RESP.json();
   generarOpciones(ESPECIALIDADES);
};

const obtener_medico = async () => {
   menejoErrores()
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

btn_form_medicos.addEventListener('click', e => {
   e.preventDefault()
   let dias_atencion = []
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
         let pregunta = ''
         query.find((q) => {
            if (q == 'crear') {
               pregunta = "Crear médico?"
            } else if (q == 'edit') {
               pregunta = "Editar médico?"
            }
         })

         Swal.fire({
            title: `${pregunta}`,
            icon: "question",
            showConfirmButton: true,
            confirmButtonColor: "#379237",
            confirmButtonText: "Confirmar",
            showCancelButton: true,
            cancelButtonColor: "#FF1E1E",
            cancelButtonText: `Cancelar`,
         }).then((result) => {
            if (result.isConfirmed) {
               error_dia_atencion.setAttribute('class', 'hidden')
               dias_seleccionados.value = JSON.stringify(dias_atencion)

               form_medicos.submit()
            }
         })
      } else {
         error_dia_atencion.innerHTML = 'Debe seleccionar como mínimo un día de atención'
         error_dia_atencion.setAttribute('style', 'color:red; font-weight: 700;')
      }
   }
})