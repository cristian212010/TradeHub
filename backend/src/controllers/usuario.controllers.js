import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";

const getData = async (req, res) => {
  const { hasta, desde } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(hasta)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const getOneUsuario = async (req, res) =>{
  try {
      const usuario = await Usuario.findOne({_id:req.usuario._id});
      res.send(usuario);
  } catch (error) {
      res.status(404);
      res.send({error: "Usuario no existe"});
  }
}

const postData = async (req, res) => {
  const { nombre, apellido, edad, email, rol, estado, googleSignIn, password, imagen } = req.body;
  const usuario = new Usuario({ nombre, apellido, email, edad, email, rol, estado, googleSignIn, password, imagen });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.json({
    message: "post api",
    usuario,
  });
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

const putData = async (req, res) => {
  const { password, googleSignIn, ...resto } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate({_id:req.usuario._id}, resto, { new:true });

  res.json({
    msg: "Usuario Actualizado",
    usuario: usuario,
  });
};

export { getData, postData, deleteData, putData, getOneUsuario };
