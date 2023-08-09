import {Router} from 'express';
import { check } from 'express-validator';
import validateDocuments from '../middlewares/validate.documents.js';
import validateJWT from '../middlewares/validate.jwt.js';
import isAdminRole from '../middlewares/validate.rol.js';
import { isValidRole, emailExiste, userExistsById } from '../helpers/db.validators.js';
import { getData, postData, deleteData, putData, getOneUsuario } from '../controllers/usuario.controllers.js';
        
const router = Router();

router.get("/", getData);
router.post("/",[
        check('nombre', 'Nombre no es valido').not().isEmpty(),
        check('password', 'Password debe ser de minimo 6 letras').isLength({min :6}),
        check('email', 'El email no es valido').isEmail(),
        check('email').custom(emailExiste ),
        validateDocuments
] ,postData);

router.delete("/:id", [
    validateJWT,
    isAdminRole,   
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateDocuments
], deleteData );

router.put("/", [
        validateJWT,
        validateDocuments
], putData );

router.get("/one-usuario", [
        validateJWT
], getOneUsuario)

export default router;