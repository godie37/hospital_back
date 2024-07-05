// ************     Crear usuario.    ************     - OK -
const guardarUser = document.getElementById('guardarUser');

guardarUser.addEventListener('click', async (event) => {
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
    console.log('Usuario creado:::::::::::::::');
    alert('Usuario creado correctamente.');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    alert('Hubo un error al crear el usuario.');
  }
});



// ************     Buscar x username.    ************     - OK -
const usernameInput = document.getElementById('usernameInput');
const searchButton = document.getElementById('searchButton');
let userName = null;

searchButton.addEventListener('click', async () => {
  userName = usernameInput.value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
    const userData = await response.json();
    

    if (userData) {
      mostrarResultadosBusqueda(userData);
    } else {
      alert('Usuario no encontrado. Perrrrrro');
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
    console.error('Error al eliminar usuario:', error);
  }
  document.getElementById("demo").innerHTML = text;
}



// ************    EDITAR USUARIO    ************     - OK -
async function editarUsuario(){
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
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

  const filaBusqueda = document.createElement("tr");

  const idUsuario = document.createElement("td");
  idUsuario.textContent = usuario.id;
  filaBusqueda.appendChild(idUsuario);

  const inputNombre=document.createElement("input");
  inputNombre.id = "newNombreEdit";
  inputNombre.type = "text";
  inputNombre.value = usuario.nombre;
  inputNombre.addEventListener('input', () => {
    // Actualizar los datos del usuario con el nuevo valor
    usuario.nombre = inputNombre.value;
  });
    
  const apellidoUsuario = document.createElement("td");
  const inputApellido = document.createElement("input");
  inputApellido.type = "text";
  inputApellido.value = usuario.apellido;
  inputNombre.id = "newApellEdit";
  apellidoUsuario.appendChild(inputApellido);
  filaBusqueda.appendChild(apellidoUsuario);

  
  const nombreCompletoUsuario = document.createElement("td");
  const inputNombreCompleto = document.createElement("input");
  inputNombreCompleto.type = "text";
  inputNombreCompleto.value = usuario.nombre_completo;
  inputNombre.id = "newNomCompEdit";
  nombreCompletoUsuario.appendChild(inputNombreCompleto);
  filaBusqueda.appendChild(nombreCompletoUsuario);

  
  const nombreUsuarioUsuario = document.createElement("td");
  const inputNombreUsuarioInput = document.createElement("input");
  inputNombreUsuarioInput.type = "text";
  inputNombreUsuarioInput.value = usuario.username;
  inputNombre.id = "newUsernameEdit";
  nombreUsuarioUsuario.appendChild(inputNombreUsuarioInput);
  filaBusqueda.appendChild(nombreUsuarioUsuario);

  
  const emailUsuario = document.createElement("td");
  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.value = usuario.email;
  inputNombre.id = "newEmailEdit";
  emailUsuario.appendChild(inputEmail);
  filaBusqueda.appendChild(emailUsuario);

  
  const contrasenaUsuario = document.createElement("td");
  const inputContrasena= document.createElement("input");
  contrasenaUsuario.textContent = '***********';
  inputContrasena.type="password"
  inputContrasena.value=usuario.password;
  inputNombre.id = "newPassEdit";
  filaBusqueda.appendChild(contrasenaUsuario);

  
  const idRolUsuario = document.createElement("td");
  const inputIdRol = document.createElement("input");
  inputIdRol.type = "number"; 
  inputIdRol.value = usuario.rol_id;
  inputIdRol.id="newRolEdit";
  idRolUsuario.appendChild(inputIdRol);
  filaBusqueda.appendChild(idRolUsuario);

  contenedorTablaBusqueda.appendChild(filaBusqueda);
}



guardarUserEdit.addEventListener('click', async (event) => {
  event.preventDefault();

  const userEditado = {
    nombre: document.getElementById("newNombreEdit").value,
    apellido: document.getElementById('newApellEdit').value,
    nombre_completo: document.getElementById('newNomCompEdit').value,
    username: document.getElementById('newUsernameEdit').value,
    email: document.getElementById('newEmailEdit').value,
    password: document.getElementById('newPassEdit').value,
    rol_id: document.getElementById('newRolEdit').value,
  };

  try {

    const response = await fetch('http://localhost:3000/api/usuarios/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userEditado),
    });
    const responseData = await response.json();
    console.log('Usuario editado:::::::::::::::');
    alert('Usuario editado correctamente.');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    alert('Hubo un error al crear el usuario.');
  }
});