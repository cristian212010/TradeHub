import express from 'express';
import cors from 'cors';
import dbConection from '../config/database.js';
import usuariosRoutes from '../routes/usuario.routes.js'
import authRoutes from '../routes/auth.routes.js'
import searchRoutes from '../routes/search.routes.js';
import productoRoutes from '../routes/producto.routes.js'
import categoriaRoutes from '../routes/categoria.routes.js';
import uploadUsuarioRoutes from '../routes/upload.usuario.routes.js';
import uploadsProdctRoutes from '../routes/upload.productos.routes.js';
import chatsRoutes from '../routes/chat.routes.js';
import mensajesRoutes from '../routes/mensaje.routes.js';
import fileUpload from 'express-fileupload';

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth',
            searchPath: '/api/search',
            productosPath: '/api/productos',
            categoriasPath: '/api/categorias',
            uploadsUsuarioPath: '/api/uploadUsuarios',
            uploadsProductoPath: '/api/uploadProductos',
            chatsPath: '/api/chats',
            mensajesPath: '/api/mensajes'
        }
        this.conection();
        this.middlewares();
        this.routes();
    };

    async conection(){
        await dbConection();
    };

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    };

    routes(){
        this.app.use(this.paths.usuariosPath, usuariosRoutes);
        this.app.use(this.paths.authPath, authRoutes);
        this.app.use(this.paths.searchPath, searchRoutes);
        this.app.use(this.paths.productosPath, productoRoutes);
        this.app.use(this.paths.categoriasPath, categoriaRoutes);
        this.app.use(this.paths.uploadsUsuarioPath, uploadUsuarioRoutes);
        this.app.use(this.paths.uploadsProductoPath, uploadsProdctRoutes);
        this.app.use(this.paths.chatsPath, chatsRoutes);
        this.app.use(this.paths.mensajesPath, mensajesRoutes);
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT ${this.port}`);
        });
    };

};

export default Server;