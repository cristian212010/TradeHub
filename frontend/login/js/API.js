const urlRegistro = "http://localhost:4000/api/usuarios/";
const urlLogin = "http://localhost:4000/api/auth/login";

export const newRegister = async (registro) => {
    try {
      const response = await fetch(urlRegistro, {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      if (response.ok) {
        const { email, password } = registro;
        const credenciales = { email: email, password: password };
        loginUser(credenciales);
      } else {
        alert(responseJson.msg);
      }
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (dataUser) => {
    try {
      const response = await fetch(urlLogin, {
        method: "POST",
        body: JSON.stringify(dataUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("id", responseJson.usuario._id);
        window.location='../home/index.html';
      } else {
        alert(responseJson.msg);
      }
    } catch (error) {
        console.log(error);
    }
};
