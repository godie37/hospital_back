let selectListaMedicos = document.getElementById("listarMedicos");
let fecha_turnos = document.getElementById("fecha_turnos");
let listaMedicos = [];
let btn_agenda = document.getElementById("btn_agenda");
let listar_agenda = document.getElementById("listar_agenda");
let tabla_turnos = document.getElementById("tabla_turnos");
let btn_volver = document.getElementById("btn_volver");
let cuerpo_tabla = document.getElementById("cuerpo_tabla");
let form_agenda = document.getElementById("form_agenda");
let dias_atencion = document.getElementById('tit_dias_atencion')

window.addEventListener("load", () => {
   OBTENER_MEDICOS();
});

// Recupero todos los médicos de la api
const OBTENER_MEDICOS = async () => {
   const RESP = await fetch("/api/medicos");
   const MEDICOS = await RESP.json();
   let especialidades = await OBTENER_ESPECIALIDADES()
   listarMedicos(MEDICOS, especialidades);
};

const OBTENER_ESPECIALIDADES = async () => {
   const RESP = await fetch("/api/especialidades");
   const ESPECIALIDADES = await RESP.json();
   return ESPECIALIDADES
};

// Armo el select con los médicos
function listarMedicos(medicos, especialidades) {
   listaMedicos = medicos;
   medicos.forEach((e) => {
      let especialidad_seleccionada;

      especialidades.find(especialidad => {
         if (especialidad.id == e.especialidad_id) {
            especialidad_seleccionada = especialidad.descripcion
         }
      })

      let option = document.createElement("option");
      option.value = e.id;
      option.text = e.nombre_completo + " || " + especialidad_seleccionada;
      selectListaMedicos.add(option);
   });
}

selectListaMedicos.addEventListener('change', e => {
   e.preventDefault();
   dias_atencion.innerHTML = ''

   let medico = listaMedicos.find(med => med.id == e.target.value)

   dias_atencion.setAttribute('class', 'dias_atencion')
   dias_atencion.removeAttribute('hidden')

   let formateo = JSON.parse(medico.dias_atencion)
   let dias = formateo.join(" || ")

   dias_atencion.innerHTML = `Días de atención: ` + dias

   form_agenda.after(dias_atencion);
})


form_agenda.addEventListener('submit', async e => {
   e.preventDefault()
   let turnosXFecha = []
   const DATA = Object.fromEntries(new FormData(e.target))


   const RESP = await fetch('/api/agenda/' + DATA.listarMedicos + '/' + DATA.fecha_turnos);
   const AGENDA = await RESP.json();

   if (AGENDA.estado == 'sinResultados') {
      const Toast = Swal.mixin({
         toast: true,
         position: "top-end",
         showConfirmButton: false,
         timer: 1500,
         timerProgressBar: true,
         didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
         },
      });
      Toast.fire({
         icon: "warning",
         title: `${AGENDA.mensaje}`,
      });
   } else {
      let fechaSinFormato = (fecha_turnos.value).split("-")
      let fechaElegida = fechaSinFormato[2] + '/' + fechaSinFormato[1] + '/' + fechaSinFormato[0]


      // Recupero solo los turnos utilizados
      AGENDA.resultado.forEach(asignado => {
         let formateo_fecha = (new Date(asignado.fecha_hora_turno).toLocaleDateString('es-es', { day: "numeric", month: "numeric", year: "numeric" })).split('/')

         let dia = formateo_fecha[0].length == 1 ? ('0' + formateo_fecha[0]) : formateo_fecha[0]
         let mes = formateo_fecha[1].length == 1 ? ('0' + formateo_fecha[1]) : formateo_fecha[1]
         let anio = formateo_fecha[2]
         let fecha_turno = dia + '/' + mes + '/' + anio

         if (fecha_turno == fechaElegida) {
            turnosXFecha.push(asignado)
         }
      })

      // Relleno la tabla con los campos correspondientes
      if (turnosXFecha.length > 0) {
         // Inhabilito los inputs y btn de buscar y muestro el de 'Nueva búsqueda'
         selectListaMedicos.setAttribute('disabled', true)
         fecha_turnos.setAttribute('disabled', true)
         btn_agenda.setAttribute('hidden', true)
         btn_volver.removeAttribute('hidden')
         btn_volver.setAttribute('class', 'btn_volver')
         tabla_turnos.removeAttribute('hidden')
         tabla_turnos.setAttribute('class', 'tabla_turnos')

         // Los ordeno por horario
         turnosXFecha = turnosXFecha.sort((a, b) => {
            if (a.fecha_hora_turno < b.fecha_hora_turno) {
               return -1
            } if (a.fecha_hora_turno > b.fecha_hora_turno) {
               return 1
            } else {
               return 0;
            }
         })

         turnosXFecha.forEach(turno => {
            let formateo_hora = (new Date(turno.fecha_hora_turno).toLocaleDateString('es-es', { hour: 'numeric', minute: 'numeric' })).split(',')
            
            let segmento = document.createElement("tr");
            segmento.setAttribute('class', 'bloque_horarios')
            segmento.innerHTML = `
            <td>${fechaElegida}</td>
            <td>${formateo_hora[1]} HS</td>
            <td class='datos_paciente'>
               <span><p class='pre_datos'>Nombre:</p> <p>${turno.nombre_paciente}</p></span>
               <span><p class='pre_datos'>DNI:</p> <p>${turno.dni_paciente}</p></span>
               <span><p class='pre_datos'>TEL:</p> <p>${turno.telefono_paciente}</p></span>
            </td>
         `
            cuerpo_tabla.appendChild(segmento)
         })

      }
   }
})


btn_volver.addEventListener('click', e => {
   e.preventDefault()

   selectListaMedicos.removeAttribute('disabled')
   fecha_turnos.removeAttribute('disabled')
   btn_agenda.removeAttribute('hidden')
   btn_volver.setAttribute('hidden', true)
   btn_volver.removeAttribute('class')

   tabla_turnos.removeAttribute('class')
   tabla_turnos.setAttribute('hidden', true)
   selectListaMedicos.value = ''
   fecha_turnos.value = ''
   cuerpo_tabla.innerHTML = ''
})