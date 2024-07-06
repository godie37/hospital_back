export const validacionMedico = (req, res, next) => {
   let erroresValidacion = [];

   const { nombre, apellido, foto_perfil, foto_perfil_hidden, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

   if (nombre == '') {
      erroresValidacion.push('El campo nombre es requerido')
   }
   if (apellido == '') {
      erroresValidacion.push('El campo apellido es requerido')
   }
   if (foto_perfil == '' && foto_perfil_hidden == '') {
      erroresValidacion.push('El campo foto de perfil es requerido')
   }
   if (matricula == '') {
      erroresValidacion.push('El campo matricula es requerido')
   }
   if (matricula.length < 4) {
      erroresValidacion.push('El campo matricula debe tener como mínimo 4 caracteres')
   }
   if (especialidad == '') {
      erroresValidacion.push('El campo especialidad es requerido')
   }
   if (dias_seleccionados.length == 0) {
      erroresValidacion.push('Debe seleccionar aun que sea un día de atención')
   }
   if (hora_inicio == '') {
      erroresValidacion.push('El campo hora_inicio es requerido')
   }
   if (hora_fin == '') {
      erroresValidacion.push('El campo hora_fin es requerido')
   }

   if (erroresValidacion.length > 0) {
      res.status(500).json(JSON.stringify(erroresValidacion))
   } else {
      next()
   }
}