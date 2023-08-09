import { newRegister, loginUser } from "./API.js";

const formularioRegistro = document.querySelector('#formularioRegistro');
formularioRegistro.addEventListener('submit', registerUser);

function registerUser(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const edad = document.querySelector('#edad').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const registro = {
        nombre,
        apellido,
        edad,
        email,
        password
    };

    if (validation(registro)) {
        return alert('Todos los campos son obligatorios')
    };

    newRegister(registro)
};

const formularioLogin = document.querySelector('#formularioLogin');
formularioLogin.addEventListener('submit', loguearUsuario);

function loguearUsuario(e) {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    const dataUser = {
        email,
        password
    };

    if (validation(dataUser)) {
        return alert('Todos los campos son obligatorios')
    };

    loginUser(dataUser);
};

function validation(Objeto) {
    return !Object.values(Objeto).every((element) => element !== "");
};