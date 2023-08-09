
// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
const modalProductos = document.querySelector('#modalProductos');
const modalPerfil = document.querySelector('#modalPerfil');
const btnProductos = document.querySelector("#btnProductos");
const btnEditPerfil = document.querySelector("#btnEditPerfil");
const closeEditPerfil = document.querySelector("#closeEditPerfil");

// modal function
const modalCloseFunc = function () { 
  modalProductos.classList.add('closed')
  modalProductos.classList.remove('abrirModal')
}

const closeEditPerfilFunc = function () {
  modalPerfil.classList.add('closed')
  modalPerfil.classList.remove('abrirModal')
}

function abrirModal() {
  modalProductos.classList.remove('closed')
  modalProductos.classList.add('abrirModal');
}

function abrirModalEditUsuario() {
  modalPerfil.classList.remove('closed')
  modalPerfil.classList.add('abrirModal');
}

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);
btnProductos.addEventListener("click", abrirModal);
btnEditPerfil.addEventListener("click", abrirModalEditUsuario);
closeEditPerfil.addEventListener("click", closeEditPerfilFunc);

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

//Cerrar Sesion
const btnCerrarSesion = document.querySelector('#cerrarSesion');
btnCerrarSesion.addEventListener('click', ()=>{
  const confirmed = confirm("¿Estás seguro de que deseas cerrar sesión?");
  if (confirmed) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location='../login/login.html';
  }
})
