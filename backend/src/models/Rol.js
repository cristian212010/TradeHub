import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
    rol: {
        type: String,
        required : [true, 'El rol es Obligatorio']
    }
});

export default model('role', RoleSchema);