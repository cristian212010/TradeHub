import { getProductosUsuario, selectOne, updateUsuario, addImagenUsuario, deleteProducto, updateProducto, getCategorias, addImagenProducto, addProducto} from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    datosUsuario();
    injectadoSelectCategorias();
});

async function loadData() {
    const productos = await getProductosUsuario();
    console.log(productos);
    const contenedor = document.querySelector("#productosUsuario");
    const arrayProductos = productos.productos
    arrayProductos.forEach((producto) => {
        const { _id, nombre, marca, descripcion, categoria, stock, fecha_lanzamiento, imagen } = producto
        const imagenNombre = imagen.slice(25);
        contenedor.innerHTML+=`
        <div class="product-grid">

      <div class="showcase">

        <div class="showcase-banner">

          <img src="../../../backend/src/uploads/productos/${imagenNombre}" alt="Mens Winter Leathers Jackets" max-width="300" class="product-img default">
          <img src="./assets/images/products/jacket-4.jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover" >

          <div class="showcase-actions">

            <button class="btn-action">
              <ion-icon name="heart-outline"></ion-icon>
            </button>

            <button class="btn-action">
              <ion-icon name="eye-outline"></ion-icon>
            </button>

            <button class="btn-action">
              <ion-icon name="repeat-outline"></ion-icon>
            </button>

            <button class="btn-action">
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>


          </div>

        </div>

        <div class="showcase-content">

          <a href="#" class="showcase-category">${nombre} ${marca}</a>

          <a href="#">
            <h3 class="showcase-title">${descripcion}</h3>
          </a>

          <div class="price-box">
            <p class="price">${categoria.categoria}</p>
            <p class="showcase-title">${stock}</p>
          </div>

          <div class="showcase-rating">
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
          </div>

          <div class="botondesCard">
            <a href="#" class="banner-btn update" id="${_id}">EDITAR</a>
            <a href="#" class="banner-btn eliminarProducto eliminar" id="${_id}">BORRAR</a>
          </din>

        </div>

      </div>

      

    </div>
        `
    })
}


//Perfil
async function datosUsuario() {

    const usuario = await selectOne(); 

    const imagenNombre = (usuario.imagen).slice(25);

    const srcAvatar = document.querySelector('#avatar');
    srcAvatar.src = `../../backend/src/uploads/avatares/${imagenNombre}`;

    document.getElementById('nombreUser').textContent = `Nombre: ${usuario.nombre}`;
    document.getElementById('email').textContent = `Email: ${usuario.email}`;
    document.getElementById('rol').textContent = `Rol: ${usuario.rol}`;
}

//Update
const formEdit = document.querySelector("#editarPerfil");
formEdit.addEventListener('submit',actualizar)

function actualizar(e){
    e.preventDefault();
    const nombre = document.querySelector('#nombreUsuario').value;
    const apellido = document.querySelector('#apellidoUsuario').value;
    const edad = document.querySelector('#edadUsuario').value;
    const email = document.querySelector('#emailUsuario').value;
    const imagenInput = document.querySelector('#imagenUsuario');

    const imagenNombre = imagenInput.files[0].name;

    const currentDateTime = new Date().toISOString();
    const imagen = `${currentDateTime}-${imagenNombre}`;

    const datos ={
        nombre,
        apellido,
        edad,
        email,
        imagen
    }

    const formData = new FormData();
    formData.append("file", imagenInput.files[0]);
    addImagenUsuario(formData)

    alert('Datos editados correctamente');

    return updateUsuario(datos);
};


//Delete
const eliminarProducto = document.querySelector("#productosUsuario");
eliminarProducto.addEventListener("click",borrar);

function borrar(e){
    if (e.target.classList.contains("eliminar")) {
        const idProducto = e.target.getAttribute("id");
        const confir = confirm("Desea eliminar este Producto?");
        if (confir) {
            deleteProducto(idProducto);
        }
    }
}

//Modal editar producto
//Update
const contenedorCardProductos = document.querySelector("#productosUsuario");
contenedorCardProductos.addEventListener('click',actualizarProducto);
const modalEditProductos = document.querySelector('#modalEditProductos');

function actualizarProducto(e){
    if (e.target.classList.contains("update")) {
      modalEditProductos.classList.remove('closed')
      modalEditProductos.classList.add('abrirModal'); 

      const idProducto = e.target.getAttribute('id');

      const inputElement = document.querySelector('.idProducto');

      inputElement.setAttribute('id', idProducto);
    }
};

const closeEditProducto = document.querySelector("#closeEditProducto");
closeEditProducto.addEventListener('click', cerrarModal);

function cerrarModal() {
  modalEditProductos.classList.add('closed')
  modalEditProductos.classList.remove('abrirModal')
}

async function injectadoSelectCategorias() {
  const categorias = await getCategorias();
  const selectCategoria = document.querySelector('#selectCategoria');
  const selectCategoriaUpdate = document.querySelector('#selectCategoriaUpdate');
  const arrayCategorias = categorias.categorias;
  console.log(arrayCategorias);
  arrayCategorias.forEach((arrayCategoria)=>{
    const { _id, categoria } = arrayCategoria
    selectCategoria.innerHTML+=`
    <option value="${_id}">${categoria}</option>
    `
    selectCategoriaUpdate.innerHTML+=`
    <option value="${_id}">${categoria}</option>
    `
  })
}


//Formulario editar producto
const formEditarProducto = document.querySelector("#formularioUpdateProductos");
formEditarProducto.addEventListener('submit', editarInfoProducto);

function editarInfoProducto(e) {
    e.preventDefault();
    const id = document.querySelector('.idProducto').getAttribute('id'); 
    console.log(id);
    const nombre = document.querySelector('#nombreEdit').value;
    const marca = document.querySelector('#marcaEdit').value;
    const descripcion = document.querySelector('#descripcionEdit').value;
    const stock = document.querySelector('#stockEdit').value;
    const categoria = document.querySelector('#selectCategoriaUpdate').value;
    const imagenInput = document.querySelector('#imagenEdit'); 

    const imagenNombre = imagenInput.files[0].name;

    const currentDateTime = new Date().toISOString();
    const imagen = `${currentDateTime}-${imagenNombre}`;

    const datos = {
      nombre,
      marca,
      descripcion,
      stock,
      categoria,
      imagen 
    }

    const formData = new FormData();
    formData.append("file", imagenInput.files[0]);
    addImagenProducto(formData)

    alert('Datos editados correctamente');

    updateProducto(datos, id);
}

//Insert
const formulario = document.querySelector("#registrarProducto");
formulario.addEventListener("submit", insertProducto);

function insertProducto(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const marca = document.querySelector("#marca").value;
  const descripcion = document.querySelector("#descripcion").value;
  const stock = document.querySelector("#stock").value;
  const imagenInput = document.querySelector('#imagen');
  const categoria = document.querySelector('#selectCategoria').value;

  const imagenNombre = imagenInput.files[0].name;


  const currentDateTime = new Date().toISOString();
  const imagen = `${currentDateTime}-${imagenNombre}`;

  const registro = {
    nombre,
    marca,
    descripcion,
    stock,
    categoria,
    imagen
  };

  const formData = new FormData();
  formData.append("file", imagenInput.files[0]);
  addImagenProducto(formData)


  if (validation(registro)) {
    alert("Todos los datos son obligatorios");
  }
  alert("Datos guardados correctamente.");
  return addProducto(registro);
};

function validation(Objeto) {
  return !Object.values(Objeto).every((element) => element !== "");
};

