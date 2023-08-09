import Rol from '../models/Rol.js';
import Usuario from '../models/Usuario.js';

const isValidRole = async(rol= '')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async( email = '' ) => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const userExistsById = async( id ) => {
    const userExists = await Usuario.findById(id);
    if ( !userExists ) {
        throw new Error(`El id (usuario) no existe ${ id }`);
    }
}

export { isValidRole, emailExiste, userExistsById };