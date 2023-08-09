const urlProductosUsuario = "http://localhost:4000/api/productos/productos-usuario";
const urlUsuario = "http://localhost:4000/api/usuarios/one-usuario";
const urlEditUsuario = "http://localhost:4000/api/usuarios";
const urlImagenUsuario = "http://localhost:4000/api/uploadUsuarios";
const urlProductos = "http://localhost:4000/api/productos"
const urlCategorias = "http://localhost:4000/api/categorias";
const urlImagenProducto = "http://localhost:4000/api/uploadProductos";

export const getProductosUsuario = async () =>{
    try {
        const validateToken = localStorage.getItem("token");
        const response = await fetch(`${urlProductosUsuario}/`, {
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

export const selectOne = async () =>{
  try {
      const validateToken = localStorage.getItem("token");
      const response = await fetch(`${urlUsuario}/`, {
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

export async function updateUsuario(data){
  try {
          const token = localStorage.getItem("token");
          const response = await fetch(urlEditUsuario,{
          method: "PUT",
          body: JSON.stringify(data),
          headers:{
              'Content-Type':"application/json",
              "x-api-token-jwt": `${token}`
          },
      });
      const responseJson = await response.json();
      window.location.href = "perfil.html"
      return responseJson
  } catch (error) {
      console.log(error);
  }
};

export const addImagenUsuario = async (formData) => {
  try { 
    const validateToken = localStorage.getItem("token");
    await fetch(`${urlImagenUsuario}/`, {
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


export const deleteProducto = async (id) =>{
  try {
      const validateToken = localStorage.getItem("token");
      await fetch(`${urlProductos}/${id}`,{
          method: "DELETE",
          headers: {
              "Content-Type":"application/json",
              "x-api-token-jwt": `${validateToken}`
          }
      });
      window.location.href = "perfil.html"
  } catch (error) {
      console.log(error);
  }
};


export async function updateProducto(data,id){
  try {
          const validateToken = localStorage.getItem("token");
          await fetch(`${urlProductos}/${id}`,{
          method: "PUT",
          body: JSON.stringify(data),
          headers:{
              'Content-Type':"application/json",
              "x-api-token-jwt": `${validateToken}`
          },
      });
      /* window.location.href = "perfil.html" */
  } catch (error) {
      console.log(error);
  }
};


export const getCategorias = async () =>{
  try {
      const categorias = await fetch(urlCategorias);
      const infoCategorias = categorias.json();
      return infoCategorias;
  } catch (error) {
      console.log(error);
  };
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