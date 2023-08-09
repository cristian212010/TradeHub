import { getChats, selectOne, getMensajes, addMensaje } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    loadAvatar();
});

async function loadData() {
    const chats = await getChats();
    const contenedorChats = document.querySelector("#contenedorChats");
    const arrayChats = chats.chats;
    console.log(arrayChats);
    console.log(localStorage.getItem('id'));
    arrayChats.forEach((chat) => {
      if (localStorage.getItem('id')==chat.usuario1._id) {
        const { _id } = chat
        const { nombre, apellido, imagen} = chat.usuario2
        const imagenNombre = imagen.slice(25);
        contenedorChats.innerHTML+=`
        <div class="block active mensajeria" id="${_id}">
              <div class="imgbx">
                <img src="../../../backend/src/uploads/avatares/${imagenNombre}" class="cover mensajeria" id="${_id}" />
              </div>
              <div class="details ">
                <div class="listHead mensajeria" id="${_id}">
                  <h4 class='mensajeria' id="${_id}">${nombre} ${apellido}</h4>
                  <p class="time " style="visibility: hidden; ">
                    Hora en 2da versión.
                  </p>
                </div>
                <div class="message_p ">
                  <p class='mensajeria' id="${_id}">Recuerda, respetar a los demás usuarios.</p>
                </div>
              </div>
        </div>
        `;
      }else{
        const { _id } = chat
        const { nombre, apellido, imagen} = chat.usuario1
        const imagenNombre = imagen.slice(25);
        contenedorChats.innerHTML+=`
        <div class="block active mensajeria" id="${_id}">
              <div class="imgbx">
                <img src="../../../backend/src/uploads/avatares/${imagenNombre}" class="cover mensajeria" id="${_id}" />
              </div>
              <div class="details ">
                <div class="listHead mensajeria" id="${_id}">
                  <h4 class='mensajeria' id="${_id}">${nombre} ${apellido}</h4>
                  <p class="time " style="visibility: hidden; ">
                    Hora en 2da versión.
                  </p>
                </div>
                <div class="message_p ">
                  <p class='mensajeria' id="${_id}">Recuerda, respetar a los demás usuarios.</p>
                </div>
              </div>
        </div>
        `;
      }
        
    });
};

//Avatar usuario
async function loadAvatar() {
    const avatarUsuario = document.querySelector('#avatarPersonal');
    const avatar = await selectOne();
    const imagenNombre = (avatar.imagen).slice(25);
    avatarUsuario.src=`../../../backend/src/uploads/avatares/${imagenNombre}`;
}

//Injectando mensajes al chat
const chatBox = document.querySelector('#chatBox');
const contenedorChats = document.querySelector('#contenedorChats');
contenedorChats.addEventListener('click', abrirChats);

async function abrirChats(e) {
  e.preventDefault();
  if (e.target.classList.contains('mensajeria')) {
    const id = e.target.getAttribute('id');
    const idUsuario1 = localStorage.getItem('id')
    const mensajes = await getMensajes(id);
    console.log(mensajes);
    const arrayMensajes = mensajes.mensajes;
    const inputMensaje = document.querySelector('.nuevoMensaje');
    inputMensaje.removeAttribute('id');
    chatBox.innerHTML=``;
    console.log(arrayMensajes);
    arrayMensajes.forEach((mensajes)=>{
      const { mensaje } = mensajes
      inputMensaje.setAttribute('id',mensajes.chat._id)
      chatBox.innerHTML+=`
      <div class="message" id="${mensajes.usuario}">
        <p>${mensaje}</p>
      </div>
      `;
    });
    const idMensaje = document.querySelectorAll('.message');
      idMensaje.forEach((mens)=>{
        if (idUsuario1===mens.getAttribute('id')) {
          mens.classList.add('my_message')
        }
      })
  }
}


//Nuevo mensaje
const nuevoMensaje = document.querySelector('.nuevoMensaje');
nuevoMensaje.addEventListener('keydown', crearMensaje)

async function crearMensaje(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const id = e.target.getAttribute('id');
    const mensaje = {mensaje:nuevoMensaje.value};
    addMensaje(mensaje, id);
  }
}

