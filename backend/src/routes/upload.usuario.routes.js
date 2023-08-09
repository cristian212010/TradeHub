import { Router } from 'express';
import uploadFile from '../controllers/upload.usuario.controllers.js'
import validateJWT from '../middlewares/validate.jwt.js';


const router = Router();

router.post( '/', [
    validateJWT
], uploadFile );

export default router;