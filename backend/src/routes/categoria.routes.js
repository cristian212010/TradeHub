import {Router} from 'express';
import { check } from 'express-validator';
import validateDocuments from '../middlewares/validate.documents.js';
import validateJWT from '../middlewares/validate.jwt.js';
import isAdminRole from '../middlewares/validate.rol.js';
import { getData, postData, deleteData, putData } from '../controllers/categoria.controllers.js';

const router = Router();

router.get("/", getData);

router.post("/",[
        validateJWT,
        isAdminRole,
        check('categoria', 'Nombre no es valido').not().isEmpty(),
        validateDocuments
] ,postData);

router.delete("/:id", [
    validateJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    validateDocuments
], deleteData );

router.put("/:id", [
        validateJWT,
        check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
        validateDocuments
], putData );

export default router;