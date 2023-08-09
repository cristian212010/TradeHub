import {Router} from 'express';
import { check } from 'express-validator';
import validateDocuments from '../middlewares/validate.documents.js';
import validateJWT from '../middlewares/validate.jwt.js';
import { getData, postData, deleteData, putData, getProductosUsuario } from '../controllers/producto.controllers.js';
        
const router = Router();

router.get("/", getData);

router.post("/",[
        validateJWT,
        check('nombre', 'Nombre no es valido').not().isEmpty(),
        validateDocuments
] ,postData);

router.delete("/:id", [
    validateJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    validateDocuments
], deleteData );

router.put("/:id", [
        validateJWT,
        check('categoria', 'No es un ObjectID MongoDB válido').isMongoId(),
        validateDocuments
], putData );

router.get("/productos-usuario", [
        validateJWT
], getProductosUsuario)

export default router;