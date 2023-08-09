const urlChats = "http://localhost:4000/api/chats";
const urlOneUsuario = "http://localhost:4000/api/usuarios/one-usuario";
const urlMensajes = "http://localhost:4000/api/mensajes"

export const getChats = async () =>{
    try {
        const validateToken = localStorage.getItem("token");
        const response = await fetch(`${urlChats}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-token-jwt": `${validateToken}`
            },
          });
        const infoChats = response.json();
        return infoChats;
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

export async function getMensajes(id) {
  try {
    const validateToken = localStorage.getItem("token");
    const response = await fetch(`${urlMensajes}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-token-jwt": `${validateToken}`
        },
      });
      const result = await response.json();
      return result;
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
      window.location='chat.html';
    } else {
      alert(responseJson.msg);
    }
  } catch (error) {
      console.log(error);
  }
};