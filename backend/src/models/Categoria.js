import { Schema, model } from 'mongoose';

const CategoriaSchema = Schema({
    categoria: {
        type: String,
        required : [true, 'La categoria es Obligatorio']
    },
    descripcion: {
        type: String,
        required : [true, 'La descripcion es Obligatorio']
    },
    estado :{
        type:Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

export default model('categorias', CategoriaSchema);