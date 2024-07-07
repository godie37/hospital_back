// ************     CREAR USUARIO.    ************     - OK -
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

// ************     BUSCAR POR USERNAME.    ************     - OK -
const usernameInput = document.getElementById('usernameInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async () => {
  const userName = usernameInput.value;   
  
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
    const userData = await response.json();
    
    if (userData) {
      const result= mostrarResultadosBusqueda(userData);
    } else {
      alert('Usuario no encontrado.');
    }
  } catch (error) {
    console.error('Input en blanco. No se escribio ningun username', error);
    alert('Ingrese un nombre de usuario valido.');
  }
});

// ************     MOSTRA RESULTADO BUSQUEDA.    ************     - OK -
function mostrarResultadosBusqueda(userData) {
  const [usuario] = userData.body[0];
  
  const contenedorSearchUsuarios = document.querySelector("#searchUsername tbody");
  contenedorSearchUsuarios.innerHTML = "";
  
  const filaSearch = document.createElement("tr"); 
  
  for (const propiedad in usuario) {
    if (usuario.hasOwnProperty(propiedad)) {
      const valor = usuario[propiedad];
      
      const celdaSearch = document.createElement("td");
      celdaSearch.textContent = valor;
      filaSearch.appendChild(celdaSearch);
    }
  }
  
  contenedorSearchUsuarios.appendChild(filaSearch);
  
}


// ************     ELIMINAR POR ID.    ************     - OK -

const botonEliminar= document.getElementById('eliminarUser');
botonEliminar.addEventListener('click', async ()=>{
  const deleteUserName= prompt("Ingrese el ID del usuario que desea eliminar:")
  if(deleteUserName){
    const result= eliminarUsuario(deleteUserName);
  }
  
})

async function eliminarUsuario(data) {  
  if (confirm("¿Está seguro de eliminar el usuario?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/eliminar/${data}`, {
          method: 'DELETE',
          });
          if (response.ok) {
            console.log('Usuario eliminado correctamente.');
            alert('Usuario eliminado.');
            
          } else {
            console.error('Error al eliminar usuario:', response.statusText);
            alert('Error al eliminar usuario.');
          }
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario.');
        }
   }
}


//**************************************************************/
//**************************************************************/
//**************************************************************/
    
const editarButton= document.getElementById('EditarUser');
editarButton.addEventListener('click', async ()=> {
  const editUsername= prompt("Ingrese username del usuario para editar:")
  if(editUsername){
    const result= editarUsuario(editUsername);
  }
})

async function editarUsuario(userName) {

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userName}`);
    const userData = await response.json();
    
    if (userData) {
      const result= mostrarResultadosEditable(userData);
    } else {
      alert('Usuario no encontrado.');
    }
  } catch (error) {
    console.error('Input en blanco. No se escribio ningun username', error);
    alert('Ingrese un nombre de usuario valido.');
  }
}

function mostrarResultadosEditable(userData) {
  const [usuario] = userData.body[0];
  
  const contenedorSearchUsuarios = document.querySelector("#editId tbody");
  contenedorSearchUsuarios.innerHTML = "";
  
  const filaSearch = document.createElement("tr"); 
  
  for (const propiedad in usuario) {
    if (usuario.hasOwnProperty(propiedad)) {
      const valor = usuario[propiedad];
      
      const celdaSearch = document.createElement("td");
      celdaSearch.textContent = valor;
      filaSearch.appendChild(celdaSearch);
    }
  }
  
  contenedorSearchUsuarios.appendChild(filaSearch);
  
}

// function mostrarResultadosEditable(datosUsuario) {
//   const [usuario] = datosUsuario.body;
  
//   const contenedorTablaBusqueda = document.querySelector("#editId #editTbody");
//   contenedorTablaBusqueda.innerHTML = ""; 

//   const filaBusqueda = document.querySelector("#editId tr"); // Seleccionar fila de tabla existente

//   const idUsuario = filaBusqueda.querySelector("td:nth-child(1)"); // Seleccionar primera celda (ID)
//   idUsuario.textContent = usuario.id;

//   const inputNombre = filaBusqueda.querySelector("#newNombreEdit"); // Seleccionar entrada existente
//   inputNombre.value = usuario.nombre;

//   const inputApellido = filaBusqueda.querySelector("#newApellEdit"); // Seleccionar entrada existente
//   inputApellido.value = usuario.apellido;

//   const inputEmail = filaBusqueda.querySelector("#newEmailEdit"); // Seleccionar entrada existente
//   inputEmail.value = usuario.email;

//   contenedorTablaBusqueda.appendChild(filaBusqueda); // No es necesario aquí, ya se ha añadido
// }






// // ************    EDITAR USUARIO    ************     - OK -
// async function editarUsuario(usuario) {

//   try {
//     const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`);
//     const userData = await response.json();

//     if (userData) {
//       mostrarResultadosEditable(userData);
//     } else {
//       alert('Usuario no encontrado.');
//     }

//   } catch (error) {
//     console.error('Error al buscar usuario:', error);
//     alert('Usuario no encontrado.');
//   }
// }

// function mostrarResultadosEditable(datosUsuario) {
//   const [usuario] = datosUsuario.body;
  
//   const contenedorTablaBusqueda = document.querySelector("#editId #editTbody");
//   contenedorTablaBusqueda.innerHTML = ""; 

//   const filaBusqueda = document.querySelector("#editId tr"); // Seleccionar fila de tabla existente

//   const idUsuario = filaBusqueda.querySelector("td:nth-child(1)"); // Seleccionar primera celda (ID)
//   idUsuario.textContent = usuario.id;

//   const inputNombre = filaBusqueda.querySelector("#newNombreEdit"); // Seleccionar entrada existente
//   inputNombre.value = usuario.nombre;

//   const inputApellido = filaBusqueda.querySelector("#newApellEdit"); // Seleccionar entrada existente
//   inputApellido.value = usuario.apellido;

//   const inputEmail = filaBusqueda.querySelector("#newEmailEdit"); // Seleccionar entrada existente
//   inputEmail.value = usuario.email;

//   contenedorTablaBusqueda.appendChild(filaBusqueda); // No es necesario aquí, ya se ha añadido
// }

// guardarUserEdit.addEventListener('click', async (event) => {
//   event.preventDefault();

//   const userEditado = {
//     id: document.querySelector("#newIdEdit").value,
//     nombre: document.querySelector("#newNombreEdit").value,
//     apellido: document.getElementById('newApellEdit').value,
//     email: document.querySelector("#newEmailEdit").value,
//     // ... actualizar otras propiedades con selectores
//   };

//   try {
//     const response = await fetch(`http://localhost:3000/api/usuarios/${userEditado.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userEditado)
//     });

//     const data = await response.json();

//     if (data) {
//       alert('Usuario actualizado.');
//       buscarUsuario(); // Actualizar resultados de búsqueda
//     } else {
//       alert('Error al actualizar usuario.');
//     }
//   } catch (error) {
//     console.error('Error al actualizar usuario:', error);
//     alert('Error al actualizar usuario.');
//   }
// });

