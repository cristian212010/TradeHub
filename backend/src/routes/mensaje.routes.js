import {Router} from 'express';
import { check } from 'express-validator';
import validateDocuments from '../middlewares/validate.documents.js';
import validateJWT from '../middlewares/validate.jwt.js';
import { getData, postData } from '../controllers/mensaje.controllers.js';

const router = Router();

router.get("/:id", [
    validateJWT
], getData);

router.post("/:id",[
        validateJWT,
        validateDocuments
] ,postData);

export default router;