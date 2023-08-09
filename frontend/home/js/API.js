const urlCategorias = "http://localhost:4000/api/categorias";
const urlProductos = "http://localhost:4000/api/productos";
const urlImagenProducto = "http://localhost:4000/api/uploadProductos";
const urlSearch = "http://localhost:4000/api/search/productos";
const urlOneUsuario = "http://localhost:4000/api/usuarios/one-usuario";
const urlChats = "http://localhost:4000/api/chats";
const urlMensajes = "http://localhost:4000/api/mensajes"

export const getCategorias = async () =>{
    try {
        const categorias = await fetch(urlCategorias);
        const infoCategorias = categorias.json();
        return infoCategorias;
    } catch (error) {
        console.log(error);
    };
};

export const getProductos = async () =>{
    try {
        const productos = await fetch(urlProductos);
        const infoProductos = productos.json();
        return infoProductos;
    } catch (error) {
        console.log(error);
    };
};


export const addProducto = async (registro) => {
    try {
      const validateToken = localStorage.getItem("token");
      const response = await fetch(`${urlProductos}/`, {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
          "x-api-token-jwt": `${validateToken}`
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        window.location='index.html';
      } else {
        alert(responseJson.msg);
      }
      window.location = "index.html";
    } catch (error) {
        console.log(error);
    }
};


export const addImagenProducto = async (formData) => {
    try { 
      const validateToken = localStorage.getItem("token");
      await fetch(`${urlImagenProducto}/`, {
        method: "POST",
        body: formData,
        headers: {
            "x-api-token-jwt": `${validateToken}`
        }
      });
    } catch (error) {
      console.log(error);
    }
};


export const searchProducto = async (producto) =>{
  try {
      const search = await fetch(`${urlSearch}/${producto}`);
      const searchInfo = search.json();
      return searchInfo;
  } catch (error) {
      console.log(error);
  };
};

export const selectOne = async () =>{
  try {
      const validateToken = localStorage.getItem("token");
      const response = await fetch(`${urlOneUsuario}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-token-jwt": `${validateToken}`
        },
      });
      const responseJson = await response.json();
      return responseJson
  } catch (error) {
      console.log(error);
  }
};


export const addNewChats = async (registro) => {
  try {
    const validateToken = localStorage.getItem("token");
    const response = await fetch(`${urlChats}/`, {
      method: "POST",
      body: JSON.stringify(registro),
      headers: {
        "Content-Type": "application/json",
        "x-api-token-jwt": `${validateToken}`
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      window.location='../chat/chat.html';
      console.log(responseJson.newChat._id);
      const registro = {
        mensaje: "Buenos dias, me interesa su producto"
      }
      addMensaje(registro, responseJson.newChat._id);
      return responseJson
    } else {
      alert(responseJson.msg);
    }
    return responseJson
  } catch (error) {
      console.log(error);
  }
};

export const addMensaje = async (registro, id) => {
  try {
    const validateToken = localStorage.getItem("token");
    const response = await fetch(`${urlMensajes}/${id}`, {
      method: "POST",
      body: JSON.stringify(registro),
      headers: {
        "Content-Type": "application/json",
        "x-api-token-jwt": `${validateToken}`
      },
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.ok) {
      window.location='../chat/chat.html';
      return responseJson
    } else {
      alert(responseJson.msg);
    }
    return responseJson
  } catch (error) {
      console.log(error);
  }
};
