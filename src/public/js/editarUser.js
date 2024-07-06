// ************     Crear usuario.    ************     - OK -
const button = document.getElementById('guardarUser');

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
    console.log('Usuario creado:', responseData);
    alert('Usuario creado correctamente.');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    alert('Hubo un error al crear el usuario.');
  }
});


//************     Buscar x username.    ************     - OK -
const usernameInput = document.getElementById('usernameInput');
const searchButton = document.getElementById('searchButton');
let userName = null;
let userData = null;

searchButton.addEventListener('click', async () => {
  userName = usernameInput.value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
    userData = await response.json();
    

    if (userData) {
      mostrarResultadosBusqueda(userData);
    } else {
      alert('Usuario no encontrado.');
    }

  } catch (error) {
    console.error('Error al buscar usuario:', error);
    alert('Usuario no encontrado.');
  }

});

function mostrarResultadosBusqueda(userData) {
  const [usuario] = userData.body;
  
  const contenedorSearchUsuarios = document.querySelector("#searchId #searchTbody"); // Seleccionar el cuerpo de la tabla
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
//*--------------------------------------------------------------------------------------------*/
//*--------------------------------------------------------------------------------------------*/
//*--------------------------------------------------------------------------------------------*/
//  ****   ELIMINAR USUARIO   ****   - OK -

async function eliminarUsuario() {
  
  if (confirm("¿Esta seguro?") == true) {
    try {
      await fetch(`http://localhost:3000/api/usuarios/eliminar/${userName}`, { method: 'DELETE' });
      
      console.log('Usuario eliminado corectamnte....');
      alert('Usuario eliminado.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario.');
    }
  } else {
    alert('Operacion cancelada.');
  }
}

//*-------------------------------  GEMINI  -------------------------------------------------------------*/
//*-------------------------------  GEMINI  -------------------------------------------------------------*/
//*-------------------------------  GEMINI  -------------------------------------------------------------*/


// async function buscarUsuario() {
//   const userName = document.querySelector("#userName").value;

//   try {
//     const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
//     const userData = await response.json();

//     if (userData) {
//       mostrarResultados(userData);
//     } else {
//       alert('Usuario no encontrado.');
//     }

//   } catch (error) {
//     console.error('Error al buscar usuario:', error);
//     alert('Usuario no encontrado.');
//   }
// }

const editarButton= document.getElementById("editarButton");

editarButton.addEventListener('click', async () => {
    if (userData) {
      mostrarResultadosEditable(userData);
    } else {
      alert('Usuario no encontrado. Perrrrrro');
    }
});


function mostrarResultadosEditable(datosUsuario) {
  const [usuario] = datosUsuario.body;
  
  const contenedorTablaBusqueda = document.querySelector("#editId #editTbody");
  contenedorTablaBusqueda.innerHTML = ""; 

  const filaBusqueda = document.querySelector("#editId tr"); // Seleccionar fila de tabla existente

  const idUsuario = filaBusqueda.querySelector("td:nth-child(1)"); // Seleccionar primera celda (ID)
  idUsuario.textContent = usuario.id;

  const inputNombre = filaBusqueda.querySelector("#newNombreEdit"); // Seleccionar entrada existente
  inputNombre.value = usuario.nombre;

  const inputApellido = filaBusqueda.querySelector("#newApellEdit"); // Seleccionar entrada existente
  inputApellido.value = usuario.apellido;

  const inputEmail = filaBusqueda.querySelector("#newEmailEdit"); // Seleccionar entrada existente
  inputEmail.value = usuario.email;

  contenedorTablaBusqueda.appendChild(filaBusqueda); // No es necesario aquí, ya se ha añadido
}






// ************    EDITAR USUARIO    ************     - OK -
async function editarUsuario(usuario) {

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`);
    const userData = await response.json();

    if (userData) {
      mostrarResultadosEditable(userData);
    } else {
      alert('Usuario no encontrado.');
    }

  } catch (error) {
    console.error('Error al buscar usuario:', error);
    alert('Usuario no encontrado.');
  }
}

function mostrarResultadosEditable(datosUsuario) {
  const [usuario] = datosUsuario.body;
  
  const contenedorTablaBusqueda = document.querySelector("#editId #editTbody");
  contenedorTablaBusqueda.innerHTML = ""; 

  const filaBusqueda = document.querySelector("#editId tr"); // Seleccionar fila de tabla existente

  const idUsuario = filaBusqueda.querySelector("td:nth-child(1)"); // Seleccionar primera celda (ID)
  idUsuario.textContent = usuario.id;

  const inputNombre = filaBusqueda.querySelector("#newNombreEdit"); // Seleccionar entrada existente
  inputNombre.value = usuario.nombre;

  const inputApellido = filaBusqueda.querySelector("#newApellEdit"); // Seleccionar entrada existente
  inputApellido.value = usuario.apellido;

  const inputEmail = filaBusqueda.querySelector("#newEmailEdit"); // Seleccionar entrada existente
  inputEmail.value = usuario.email;

  contenedorTablaBusqueda.appendChild(filaBusqueda); // No es necesario aquí, ya se ha añadido
}

guardarUserEdit.addEventListener('click', async (event) => {
  event.preventDefault();

  const userEditado = {
    id: document.querySelector("#newIdEdit").value,
    nombre: document.querySelector("#newNombreEdit").value,
    apellido: document.getElementById('newApellEdit').value,
    email: document.querySelector("#newEmailEdit").value,
    // ... actualizar otras propiedades con selectores
  };

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userEditado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userEditado)
    });

    const data = await response.json();

    if (data) {
      alert('Usuario actualizado.');
      buscarUsuario(); // Actualizar resultados de búsqueda
    } else {
      alert('Error al actualizar usuario.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    alert('Error al actualizar usuario.');
  }
});

