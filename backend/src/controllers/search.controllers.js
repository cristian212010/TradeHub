import { response } from 'express';
import { Types } from 'mongoose';

import Producto from '../models/Producto.js';
const objectId = Types.ObjectId;

const allowedCollections = [
    'productos'
];

const searchUsers = async(criterio='', res=response)=>{
    const isMongoId = objectId.isValid(criterio);
    if (isMongoId) {
        const producto = await Producto.findById(criterio);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(criterio, 'i');
    const productos = await Producto.find({
        $or: [{nombre:regex}],
        $and: [{estado:true}]
    }).populate('categoria', ['categoria']);

    res.json({
        result: productos
    })
}

const search = (req, res = response) =>{
    const {coleccion, criterio} = req.params;
    if (!allowedCollections.includes(coleccion)) {
        return res.status(400).json({
            msg:`El buscador solo permite la coleccion: ${allowedCollections}`
        })
    }

    switch (coleccion) {
        case 'productos':
            searchUsers(criterio, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'This search doesnt exists'
            })
            break;
    }
}

export {search};

