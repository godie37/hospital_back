// ************     Listar usuarios.    ************     - OK -
async function listarUsuarios() {
  try {
    const respuesta = await fetch("http://localhost:3000/api/usuarios");
    const datos = await respuesta.json();

    const usuarios = datos.body;
    const contenedorUsuarios = document.querySelector("#user tbody"); // Selecciona el cuerpo de la tabla

    contenedorUsuarios.innerHTML = ""; // Limpia el contenido existente

    usuarios.forEach((usuario) => {
      const fila = document.createElement("tr"); // Crea una fila de la tabla

      const celdaId = document.createElement("td");
      celdaId.textContent = usuario.id;
      fila.appendChild(celdaId);

      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = usuario.nombre;
      fila.appendChild(celdaNombre);

      const celdaApell = document.createElement('td');
      celdaApell.textContent = usuario.apellido;
      fila.appendChild(celdaApell);

      const celdaNomApell = document.createElement('td');
      celdaNomApell.textContent = usuario.nombre_completo;
      fila.appendChild(celdaNomApell);

      const celdaUsername = document.createElement('td');
      celdaUsername.textContent = usuario.username;
      fila.appendChild(celdaUsername);

      const celdaEmail = document.createElement('td');
      celdaEmail.textContent = usuario.email;
      fila.appendChild(celdaEmail);

      const celdaRol = document.createElement('td');
      celdaRol.textContent = usuario.rol_id;
      fila.appendChild(celdaRol);

      contenedorUsuarios.appendChild(fila); 
    });
  } catch (error) {
    console.error(error);
  }
}

listarUsuarios();

