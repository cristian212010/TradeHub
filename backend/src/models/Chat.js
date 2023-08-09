import { Schema, model } from 'mongoose';

const ChatSchema = Schema({
    usuario1: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    usuario2: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    estado :{
        type: Boolean,
        default: true
    }
});

export default model('chats', ChatSchema);