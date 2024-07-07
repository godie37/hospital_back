let bloque_personal = document.getElementById('bloque_personal')

window.addEventListener("load", () => {
   obtener_medicos();
});

// Recupero todos los médicos de la api
const obtener_medicos = async () => {
   const RESP = await fetch("/api/medicos");
   const MEDICOS = await RESP.json();
   let especialidades = await obtener_especialidades()
   generarCard(MEDICOS, especialidades);
};

const obtener_especialidades = async () => {
   const RESP = await fetch("/api/especialidades");
   const ESPECIALIDADES = await RESP.json();
   return ESPECIALIDADES
};

function generarCard(medicos, especialidades) {
   medicos.forEach(medico => {
      let especialidad_seleccionada;

      especialidades.find(e => {
         if (e.id == medico.especialidad_id) {
            especialidad_seleccionada = e.descripcion
         }
      })

      let dias = JSON.parse(medico.dias_atencion)
      let horario = JSON.parse(medico.horario_atencion)

      let card_personal = document.createElement('div')
      card_personal.setAttribute('class', 'card_personal')

      card_personal.innerHTML = `
         <div class="card_contenido">
            <h3 class='nombre_personal'>${medico.nombre_completo} - MP ${medico.matricula}</h3>
               <img src="../../img/${medico.foto_perfil}" alt="foto_perfil" class='foto_perfil'>
               <h4 class='especialidad_personal'>${especialidad_seleccionada}</h4>
               <span class="h5"><b>Atención</b></span>
               <p class='matricula_personal'><strong>Días: </strong>${dias.join(", ")}</p>              
               <p class='matricula_personal'><strong>Horario: </strong>${horario[0]}hs a ${horario[1]}hs</p>
         </div>
         <div class="card_btn">
            <a href="/medicos/edit/${medico.id}" title="Editar médico">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="btn_ico_edit">
                     <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path>
                  </svg>
               </a>
               <form action="/medicos/delete/${medico.id}" method="post">
                  <button title="Eliminar médico" type="submit">
                     <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" class="btn_ico_delete">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                     </svg>
                  </button>
               </form>
         </div>
         
      `;

      bloque_personal.appendChild(card_personal)
   });
}