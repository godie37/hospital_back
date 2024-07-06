import pool from '../config/db.js';
import multer from 'multer';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      console.log('file', file)
      cb(null, 'public/img/foto_perfil')
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
   }
})

const upload = multer({ storage: storage });


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
      const { nombre, apellido, foto_perfil, foto_perfil_hidden, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      let img_perfil = foto_perfil != foto_perfil_hidden && foto_perfil_hidden != '' ? foto_perfil_hidden : foto_perfil
      
      const connection = await pool.getConnection()
      const [result] = await connection.query(`INSERT INTO medicos__medicos (nombre,apellido,nombre_completo,matricula,especialidad_id,dias_atencion,horario_atencion,foto_perfil) VALUES(?,?,?,?,?,?,?,?)`, [nombre, apellido, nombre + " " + apellido, matricula, especialidad, dias_seleccionados, JSON.stringify([hora_inicio, hora_fin]), img_perfil])
      connection.release()

      res.status(200).redirect('/medicos')

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al crear el médico')
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
      const { nombre, apellido, foto_perfil, foto_perfil_hidden, matricula, especialidad, dias_seleccionados, hora_inicio, hora_fin } = req.body

      let img_perfil = foto_perfil != foto_perfil_hidden && foto_perfil_hidden != '' ? foto_perfil : foto_perfil_hidden

      const [result] = await connection.query('UPDATE medicos__medicos SET nombre = ?, apellido = ?, nombre_completo = ?, matricula = ?, especialidad_id = ?, dias_atencion = ?, horario_atencion = ?, foto_perfil = ? WHERE id = ?', [nombre, apellido, nombre + " " + apellido, matricula, especialidad, dias_seleccionados, JSON.stringify([hora_inicio, hora_fin]), img_perfil, medico_id])
      connection.release()

      if (result.affectedRows === 0) {
         res.status(500).json({ message: 'Médico no encontrado' })
      } else {
         res.status(200).redirect('/medicos')
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al editar el médico')
   }
}

export const eliminarMedicoPost = async (req, res) => {
   try {
      const medico_id = req.params.id
      const connection = await pool.getConnection()
      const [result] = await connection.query('DELETE FROM medicos__medicos WHERE id = ?', [medico_id])
      connection.release()
      if (result.affectedRows === 0) {
         res.status(500).json({ message: 'Médico no encontrado' })
      } else {
         res.status(200).redirect('/medicos')

      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al eliminar el médico')
   }
}

export const solicitarTurnoPost = async (req, res) => {
   try {
      const connection = await pool.getConnection()
      console.log(req.body)
      connection.release()
   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error al editar el médico')
   }
}

export const buscarAgendaPost = async (req, res) => {
   try {

      const { listar_medicos, fecha_turno } = req.body
      const connection = await pool.getConnection()
      const [result] = await connection.query('SELECT * FROM medicos__agenda WHERE medico_id = ? AND fecha_hora_turno = ?', [listar_medicos, fecha_turno])
      connection.release()
      if (result.affectedRows === 0) {
         res.status(500).json({ message: 'Turno no encontrado' })
      } else {
         // res.status(200).redirect('/medicos')

      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error consultar agenda')
   }
}