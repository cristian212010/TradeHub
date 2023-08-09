import { Schema, model } from 'mongoose';

const ProductoSchema = Schema({
    nombre :{
        type: String,
        required: [true , 'Nombre es requerido']
    },
    marca :{
        type: String,
        required: [true , 'Marca es requerido']
    },
    descripcion :{
        type: String,
        required: [true , 'Descripcion es requerido']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    estado :{
        type: Boolean,
        default: true
    },
    stock :{
        type: Number,
        required: [true , 'Stock es requerido']
    },
    fecha_lanzamiento :{
        type: String,
        required: [true , 'Fecha es requerido']
    },
    imagen :{
        type: String,
        default: `${new Date().toISOString()}-defaultProducto.jpg`
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    calificacion :{
        type:Number,
        default: 0
    },

})

const Producto = model('productos', ProductoSchema);

export default Producto;