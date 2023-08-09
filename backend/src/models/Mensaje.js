import { Schema, model } from 'mongoose';

const MensajeSchema = Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chats',
        required: true
    },
    mensaje: {
        type: String,
        required : [true, 'El mensaje es Obligatorio']
    },
    hora: {
        type: String,
        required : [true, 'La hora es Obligatorio']
    },
    estado :{
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    }
});

export default model('mensajes', MensajeSchema);