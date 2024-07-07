export const validacionMedico = (req, res, next) => {
   let erroresValidacion = {};

   const { nombre, apellido, foto_perfil, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

   if (nombre == '') {
      erroresValidacion.nombre = 'El campo nombre es requerido'
   }
   if (apellido == '') {
      erroresValidacion.apellido = 'El campo apellido es requerido'
   }
   if (foto_perfil == '') {
      erroresValidacion.foto_perfil = 'El campo foto de perfil es requerido'
   }
   if (matricula.length < 4) {
      erroresValidacion.matricula = 'El campo matricula debe tener como mínimo 4 caracteres'
   }
   if (matricula == '') {
      erroresValidacion.matricula = 'El campo matricula es requerido'
   }
   if (especialidad == '') {
      erroresValidacion.especialidad = 'El campo especialidad es requerido'
   }
   if (dias_seleccionados.length == 0) {
      erroresValidacion.dias_seleccionados = 'Debe seleccionar aun que sea un día de atención'
   }
   if (hora_inicio == '') {
      erroresValidacion.hora_inicio = 'El campo hora_inicio es requerido'
   }
   if (hora_fin == '') {
      erroresValidacion.hora_fin = 'El campo hora_fin es requerido'
   }


   if (Object.keys(erroresValidacion).length > 0) {
      return res.status(500).json({ 'estado': 'validacion', mensajes: JSON.stringify(erroresValidacion) })
   } else {
      next()
   }
}

export const validacionTurno = (req, res, next) => {
   let erroresValidacion = {};

   const { nombre_completo, dni, telefono, derivacion, adjunto_derivacion, horario_turno } = req.body

   if (nombre_completo == '') {
      erroresValidacion.nombre_completo = 'El campo nombre completo es requerido'
   }
   if (dni == '') {
      erroresValidacion.dni = 'El campo dni es requerido'
   }
   if (telefono == '') {
      erroresValidacion.telefono = 'El campo telefono es requerido'
   }
   if (telefono.length < 7) {
      erroresValidacion.telefono = 'El campo telefono debe tener como mínimo 7 caracteres'
   }
   if (telefono.length > 10) {
      erroresValidacion.telefono = 'El campo telefono debe tener como máximo 10 caracteres'
   }
   if (derivacion == 'Si' && adjunto_derivacion == '') {
      erroresValidacion.adjunto_derivacion = 'El campo adjunto_derivacion es requerido'
   }
   if (horario_turno == '') {
      erroresValidacion.horario_turno = 'El campo horario_turno es requerido'
   }
   
   if (Object.keys(erroresValidacion).length > 0) {
      return res.status(500).json({ 'estado': 'validacion', mensajes: JSON.stringify(erroresValidacion) })
   } else {
      next()
   }
}