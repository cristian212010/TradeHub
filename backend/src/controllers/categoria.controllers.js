import Categoria from "../models/Categoria.js";

const getData = async (req, res) => {
  const { hasta, desde } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(hasta)),
  ]);

  res.json({
    total,
    categorias,
  });
};

const postData = async (req, res) => {
  const { categoria, descripcion, estado } = req.body;

    const data = {
        categoria,
        descripcion,
        estado,
        usuario: req.usuario._id
    }

  const category = new Categoria(data);

  await category.save();
  res.json({
    message: "post api",
    category,
  });
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.json(categoria);
};

const putData = async (req, res) => {
  const { id } = req.params;
  const { _id, estado, ...resto } = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, resto, { new:true });

  res.json({
    msg: "Categoria Actualizado",
    categoria: categoria
  });
};

export { getData, postData, deleteData, putData };