import { getCategorias, getProductos, addProducto, addImagenProducto, searchProducto, selectOne, addNewChats } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    loadProductos();
    loadAvatar();
});

async function loadData() {
    const categorias = await getCategorias();
    const contenedor = document.querySelector("#contenedorCategorias");
    const arrayCategorias = categorias.categorias;
    arrayCategorias.forEach((categoriaData) => {
        const { _id, categoria, descripcion, imagen } = categoriaData
        contenedor.innerHTML+=`
        <div class="category-item">

            <div class="category-img-box">
              <img src="../assets/img/${imagen}" alt="dress & frock" width="30">
            </div>

            <div class="category-content-box">

              <div class="category-content-flex">
                <h3 class="category-item-title">${categoria}</h3>

                <p class="category-item-amount">(53)</p>
              </div>

              <a href="#" class="category-btn">Show all</a>

            </div>

        </div>
        `;
        const contenedorSideBar = document.querySelector("#sideBarCategorias");
        contenedorSideBar.innerHTML+=`
        <button class="sidebar-accordion-menu" data-accordion-btn>

            <div class="menu-title-flex">
            <img src="../assets/img/${imagen}" alt="clothes" width="20" height="20"
                class="menu-title-img">

            <p class="menu-title">${categoria}</p>
            </div>

            <div>
            <ion-icon name="add-outline" class="add-icon"></ion-icon>
            <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
            </div>

        </button>
        `;
        //Select categoria
        const selectCategoria = document.querySelector('#selectCategoria');
        selectCategoria.innerHTML+=`
        <option value="${_id}">${categoria}</option>
        `
    });
};

async function loadProductos() {
  const productos = await getProductos();
    const contenedorProductos = document.querySelector('#cardContainer');
    const arrayProductos = productos.productos
    arrayProductos.forEach((producto)=>{
      const { _id,nombre, marca, descripcion, categoria, stock, fecha_lanzamiento, imagen, usuario, calificacion } = producto
      const imagenNombre = imagen.slice(25);
      contenedorProductos.innerHTML+=`
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

          <a href="#" class="banner-btn trueque" id="${usuario._id}">TRUEQUE</a>

        </div>

      </div>

      

    </div>
      `
    })
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


//Search

const inputSearch = document.querySelector('#inputSearch');
inputSearch.addEventListener("input", buscar);

async function buscar() {
  const valorBusqueda = inputSearch.value;
  const contenedorProductos = document.querySelector('#cardContainer');
  try {
    const productos = await searchProducto(valorBusqueda);
    const arrayProductos = productos.result;
    contenedorProductos.innerHTML=``;
    console.log(arrayProductos);
    arrayProductos.forEach((producto) => {
      const { nombre, marca, descripcion, stock, categoria, imagen } = producto
      const imagenNombre = imagen.slice(25);
      contenedorProductos.innerHTML+=`
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

        </div>

      </div>

      

    </div>
      `
    });
  } catch (error) {
    contenedorProductos.innerHTML=``;
    loadProductos();
  }
  
}

//Avatar usuario
async function loadAvatar() {
  const avatarUsuario = document.querySelector('#avatarUsuario');
  const avatar = await selectOne();
  const imagenNombre = (avatar.imagen).slice(25);
  avatarUsuario.src=`../../../backend/src/uploads/avatares/${imagenNombre}`;
}

//Crear chat para trueque
const cardContainer = document.querySelector('#cardContainer');
cardContainer.addEventListener('click', crearChat)

async function crearChat(e) {
  e.preventDefault();
  if (e.target.classList.contains('trueque')) {
    const usuario2 = e.target.getAttribute("id");
    const datos = {usuario2: usuario2}
    console.log(datos);
    addNewChats(datos);
  }
}
