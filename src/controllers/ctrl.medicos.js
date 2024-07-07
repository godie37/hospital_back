import pool from '../config/db.js';
// import multer from 'multer';

// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       console.log('file', file)
//       cb(null, '../public/img/foto_perfil')
//    },
//    filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`)
//    }
// })

// const upload = multer({ storage: storage });


export const mostrarMedicosGet = async (req, res) => {
   try {
      const connection = await pool.getConnection()

      const [rows] = await connection.query('SELECT m.*, e.descripcion FROM medicos__medicos m INNER JOIN medicos__especialidades e on m.especialidad_id = e.id')
      connection.release()
      res.json(rows)
   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}

export const mostrarEspecialidadesGet = async (req, res) => {
   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query('SELECT * FROM medicos__especialidades')
      connection.release()
      res.json(rows)
   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}

export const crearMedicoPost = async (req, res) => {
   try {
      const { nombre, apellido, foto_perfil, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      let nombre_completo = nombre + " " + apellido
      let horario = JSON.stringify([hora_inicio, hora_fin])


      const consulta = await pool.getConnection()
      const [rows] = await consulta.query('SELECT * FROM medicos__medicos WHERE matricula = ?', [matricula])
      consulta.release()

      if (rows.length === 0) {
         const connection = await pool.getConnection()
         const [result] = await connection.query(`INSERT INTO medicos__medicos (nombre,apellido,nombre_completo,matricula,especialidad_id,dias_atencion,horario_atencion,foto_perfil) VALUES(?,?,?,?,?,?,?,?)`, [nombre, apellido, nombre_completo, matricula, especialidad, dias_seleccionados, horario, foto_perfil])
         connection.release()

         if (result.affectedRows === 0) {
            res.status(401).json({ 'estado': 'error', mensaje: 'No se pudo crear médico' })
         } else {
            res.status(200).json({ 'estado': 'success', mensaje: 'Médico Creado' })
         }

      } else {
         res.status(401).json({ 'estado': 'error', mensaje: 'La matricula ingresada ya existe en el sistema' })
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).json({ 'estado': 'error', mensaje: error.message })
   }
}

export const medicoByIdGet = async (req, res) => {
   const medico_id = req.params.id
   const connection = await pool.getConnection()
   const [rows] = await connection.query('SELECT * FROM medicos__medicos WHERE id = ?', [medico_id])
   connection.release()
   res.json(rows)
}

export const editarMedicoPost = async (req, res) => {
   try {
      const medico_id = req.params.id
      const connection = await pool.getConnection()
      const { nombre, apellido, foto_perfil, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      let nombre_completo = nombre + " " + apellido
      let horario = JSON.stringify([hora_inicio, hora_fin])

      const consulta = await pool.getConnection()
      const [rows] = await consulta.query('SELECT * FROM medicos__medicos WHERE matricula = ? AND id != ?', [matricula, medico_id])
      consulta.release()


      if (rows.length === 0) {
         const [result] = await connection.query(`UPDATE medicos__medicos SET nombre = ?, apellido = ?, nombre_completo = ?, matricula = ?, especialidad_id = ?, dias_atencion = ?, horario_atencion = ?, foto_perfil = ? WHERE id = ?`, [nombre, apellido, nombre_completo, matricula, especialidad, dias_seleccionados, horario, foto_perfil, medico_id])
         connection.release()

         if (result.affectedRows === 0) {
            res.status(401).json({ 'estado': 'error', mensaje: 'No se pudo actualizar el médico' })
         } else {
            res.status(200).json({ 'estado': 'success', mensaje: 'Médico editado' })
         }
      } else {
         res.status(401).json({ 'estado': 'error', mensaje: 'La matricula ingresada pertenece a otro médico' })
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).json({ 'estado': 'error', mensaje: 'No se pudo actualizar el médico' })
   }
}

export const eliminarMedicoPost = async (req, res) => {
   try {
      const medico_id = req.params.id
      const connection = await pool.getConnection()
      const [result] = await connection.query('DELETE FROM medicos__medicos WHERE id = ?', [medico_id])
      connection.release()

      res.status(200).redirect('/medicos')

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al eliminar el médico')
   }
}

export const solicitarTurnoPost = async (req, res) => {
   try {
      const { medico_id, usuario_id, nombre_completo, dni, telefono, es_obra_social, derivacion, adjunto_derivacion, horario_turno } = req.body

      let img_derivacion = adjunto_derivacion != '' ? adjunto_derivacion : null

      const connection = await pool.getConnection()
      const [result] = await connection.query(`INSERT INTO medicos__agenda (medico_id, usuario_id, nombre_paciente, dni_paciente, telefono_paciente, fecha_hora_turno, obra_social, es_derivacion, adjunto_derivacion) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [medico_id, usuario_id, nombre_completo, dni, telefono, horario_turno, es_obra_social, derivacion, img_derivacion])
      connection.release()

      if (result.affectedRows === 0) {
         res.status(401).json({ 'estado': 'error', mensaje: 'No se logró guardar el turno' })
      } else {
         res.status(200).json({ 'estado': 'success', mensaje: 'Turno agendado' })
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).json({ 'estado': 'error', mensaje: 'Error al generar el turno' })
   }
}

export const buscarAgendaGet = async (req, res) => {
   try {
      const { medico, turno } = req.params

      const connection = await pool.getConnection()
      const [result] = await connection.query('SELECT * FROM medicos__agenda WHERE medico_id = ? AND fecha_hora_turno LIKE CONCAT( ?, "%")', [medico, turno])
      connection.release()

      if (result.length === 0) {
         res.status(401).json({ estado: 'sinResultados', mensaje: 'No hay turnos en la fecha solicitada' })
      } else {
         res.status(200).json({ estado: 'success', resultado: result })
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error consultar agenda')
   }
}