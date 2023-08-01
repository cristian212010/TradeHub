import express from 'express';
import cors from 'cors';
import dbConection from '../config/database.js';

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.conection();
        this.middlewares();
    };

    async conection(){
        await dbConection();
    };

    middlewares(){
        this.app.use(cors());
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT ${this.port}`);
        });
    };

};

export default Server;