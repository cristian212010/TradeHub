import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
    nombre :{
        type: String,
        required: [true, 'Nombre es requerido']
    },
    apellido :{
        type: String,
        required: [true, 'Apellido es requerido']
    },
    edad :{
        type: Number,
        required: [true, 'Edad es requerido']
    },
    email : {
        type:String,
        required: [true, 'Email es requerido'],
        unique:true
    },
    rol :{
        type:String,
        required: true,
        default: 'USER'
    },
    estado :{
        type:Boolean,
        default: true
    },
    googleSignIn :{
        type:Boolean,
        default: true
    },
    password :{
        type:String,
        required: [true, 'Password es requerido']
    },
    imagen :{
        type: String,
        default: `${new Date().toISOString()}-default.jpg`
    }

});

const Usuario = model('usuarios', UsuarioSchema);

export default Usuario;