import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const crearUsuarioPost = async (req, res) => {
   try {

      const { nombre, apellido, username, email, password, confirm_password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const connection = await pool.getConnection()

      const [result] = await connection.query(`INSERT INTO usuarios__usuarios (nombre,apellido,nombre_completo,username,email,password,rol_id) VALUES(?,?,?,?,?,?,?)`, [nombre, apellido, nombre + " " + apellido, username, email, hashedPassword, 2])

      connection.release()

      res.status(200).redirect('/login')

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}


export const iniciarSesionPost = async (req, res) => {
   try {
      const { username, password } = req.body;

      const connection = await pool.getConnection()
      const [user] = await connection.query('SELECT * FROM usuarios__usuarios WHERE username = ?', [username])
      connection.release()

      if (user.length == 0) {
         return res.status(401).json({ 'estado': 'error_username', 'mensaje': 'Nombre de usuario incorrecto' });
      }

      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
         req.session.autenticado = true;
         req.session.user = user[0];
         req.session.save((err) => {
            res.status(200).redirect('/inicio')
         })
      } else {
         res.status(401).json({ 'estado': 'error_password', 'mensaje': 'Contraseña incorrecta' });
      }
   } catch (error) {
      console.error(error.message)
      res.status(500).json({ 'estado': 'error', 'mensaje': 'Login fallido' })
   }
}


export const cambioPasswordPost = async (req, res) => {
   try {
      const { email, password, confirm_password } = req.body;

      const connection = await pool.getConnection()
      const [usuario] = await connection.query('SELECT * FROM usuarios__usuarios WHERE email = ?', [email])
      connection.release()

      if (usuario.length == 0) {
         return res.status(401).send('Usuario no encontrado');
      }

      if (password === confirm_password) {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         const connection = await pool.getConnection()

         const [result] = await connection.query(`UPDATE usuarios__usuarios SET password = ? WHERE email = ?`, [hashedPassword, email])

         if (result.affectedRows === 0) {
            res.status(500).json({ message: 'Usuario no encontrado' })
         } else {
            res.status(200).redirect('/login')
         }
      } else {
         res.status(401).send('Password no coinciden');
      }

   } catch (error) {
      console.error(error.message)
      res.status(500).send('Error en la consulta')
   }
}

export const logoutPost = async (req, res) => {
   req.session.destroy();
   res.redirect('login');
}