let datos_user

window.addEventListener("DOMContentLoaded", () => {
   obtenerSession();
});


const obtenerSession = async () => {
   const RESP = await fetch("/api/session");
   const SESSION = await RESP.json();
   rutasProtegidas(SESSION.session)
}

const rutasProtegidas = (session) => {
   let menu = document.querySelectorAll('.enlaces')
   let ruta = ''
   menu.forEach(m => {
      let query_actual = window.location.href.split("/");
      let ruta_actual = query_actual[query_actual.length - 1];

      if (m.type != 'submit') {
         let query = m.href.split("/");
         ruta = query[query.length - 1];
      }

      if (session.autenticado) {
         document.getElementById('form_logout').removeAttribute('hidden')

         if (ruta == 'login' && m.type != 'submit') {
            m.setAttribute('hidden', true)
            m.removeAttribute('class')
         } else if (ruta == 'medicos' || ruta == 'agenda') {
            if (session.user.rol_id != 1) {
               m.setAttribute('hidden', true)
               m.removeAttribute('class')
            } else {
               m.removeAttribute('hidden')
               m.setAttribute('class', `nav-link enlaces text-uppercase ${ruta_actual == ruta ? 'activo' : ''}`)
            }
         } else if (ruta == 'turnero') {
            if (session.user.rol_id != 2) {
               m.setAttribute('hidden', true)
               m.removeAttribute('class')
            } else {
               m.removeAttribute('hidden')
               m.setAttribute('class', `nav-link enlaces text-uppercase ${ruta_actual == ruta ? 'activo' : ''}`)
            }
         }
         datos_user = session.user
      } else {
         document.getElementById('form_logout').setAttribute('hidden', true)

         if (ruta == 'medicos' || ruta == 'agenda' || ruta == 'turnero') {
            m.setAttribute('hidden', true)
            m.removeAttribute('class')
         }

      }
   })

}

export const recuperarUser = () => {
   return datos_user.id
}