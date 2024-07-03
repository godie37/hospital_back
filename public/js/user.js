// ************     Crear usuario.    ************     - OK -
const button = document.getElementById('enviarUser');

button.addEventListener('click', async (event) => {
  event.preventDefault();

  const user = {
    nombre: document.getElementById("new-nombre").value,
    apellido: document.getElementById('new-apellido').value,
    nombre_completo: document.getElementById('new-nombre_completo').value,
    username: document.getElementById('new-username').value,
    email: document.getElementById('new-mail').value,
    password: document.getElementById('new-pass').value,
    rol_id: document.getElementById('new-rolid').value,
  };

  try {

    const response = await fetch('http://localhost:3000/api/usuarios/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.json();
    console.log('Usuario creado:::::::::::::::  --> ', responseData);
    alert('Usuario creado correctamente.');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    alert('Hubo un error al crear el usuario.');
  }
});



// ************     Buscar x username.    ************     - OK -
const usernameInput = document.getElementById('usernameInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async () => {
  const userName = usernameInput.value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
    const userData = await response.json();

    if (userData) {
      mostrarResultadosBusqueda(userData);
    } else {
      alert('Usuario no encontrado.');
    }
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    alert('Error al buscar usuario.');
  }
});

function mostrarResultadosBusqueda(userData) {
  const [usuario] = userData.body;
  
  const contenedorSearchUsuarios = document.querySelector("#searchId tbody"); // Seleccionar el cuerpo de la tabla
  contenedorSearchUsuarios.innerHTML = ""; // Limpiar el contenido existente

  const filaSearch = document.createElement("tr"); // Crear una fila de tabla

  const searchId = document.createElement("td");
  searchId.textContent = usuario.id;
  filaSearch.appendChild(searchId);

  const searchName = document.createElement("td");
  searchName.textContent = usuario.nombre;
  filaSearch.appendChild(searchName);

  const searchApell = document.createElement("td");
  searchApell.textContent = usuario.apellido;
  filaSearch.appendChild(searchApell);

  const searchNomApell = document.createElement("td");
  searchNomApell.textContent = usuario.nombre_completo;
  filaSearch.appendChild(searchNomApell);

  const searchUsername = document.createElement("td");
  searchUsername.textContent = usuario.username;
  filaSearch.appendChild(searchUsername);

  const searchEmail = document.createElement("td");
  searchEmail.textContent = usuario.email;
  filaSearch.appendChild(searchEmail);

  const searchPass = document.createElement("td");
  searchPass.textContent = '***********';
  filaSearch.appendChild(searchPass);

  const searchRol = document.createElement("td");
  searchRol.textContent = usuario.rol_id;
  filaSearch.appendChild(searchRol);


  contenedorSearchUsuarios.appendChild(filaSearch); // Agregar la fila al cuerpo de la tabla

}





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

      contenedorUsuarios.appendChild(fila); // Agrega la fila al cuerpo de la tabla
    });
  } catch (error) {
    console.error(error);
  }
}

listarUsuarios();

