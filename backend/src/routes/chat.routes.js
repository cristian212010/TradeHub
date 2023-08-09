import {Router} from 'express';
import { check } from 'express-validator';
import validateDocuments from '../middlewares/validate.documents.js';
import validateJWT from '../middlewares/validate.jwt.js';
import { getData, postData, deleteData } from '../controllers/chat.controllers.js';

const router = Router();

router.get("/", [
    validateJWT
], getData);

router.post("/",[
        validateJWT,
        check('usuario2', 'Nombre no es valido').not().isEmpty(),
        validateDocuments
] ,postData);

router.delete("/:id", [
    validateJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    validateDocuments
], deleteData );

export default router;