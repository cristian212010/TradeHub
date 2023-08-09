import Producto from "../models/Producto.js";

const getData = async (req, res) => {
  const { hasta, desde } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(Number(desde))
      .limit(Number(hasta))
      .populate('categoria', ['categoria'])
      .populate('usuario', ['_id','nombre', 'apellido', 'imagen'])
  ]);

  res.json({
    total,
    productos,
  });
};

const getProductosUsuario = async (req, res) => {

  const { hasta, desde } = req.query;
  const query = { estado: true, usuario: req.usuario._id };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(Number(desde))
      .limit(Number(hasta))
      .populate('categoria', ['categoria'])
  ]);

  res.json({
    total,
    productos,
  });
};

const postData = async (req, res) => {

  const { nombre, precio, marca, descripcion, categoria, stock, imagen } = req.body;

  const fechaActual = new Date();
  const fecha = fechaActual.toISOString();

    const data = {
        nombre,
        precio,
        marca,
        descripcion,
        categoria,
        stock,
        fecha_lanzamiento: fecha,
        imagen,
        usuario: req.usuario._id
    }

  const producto = new Producto(data);

  await producto.save();
  res.json({
    message: "post api",
    producto,
  });
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(id, { estado: false });

  res.json(producto);
};

const putData = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const producto = await Producto.findByIdAndUpdate(id, resto, { new:true });

  res.json({
    msg: "Producto Actualizado",
    producto: producto,
  });
};

export { getData, postData, deleteData, putData, getProductosUsuario };
