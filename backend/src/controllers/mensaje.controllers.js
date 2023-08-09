import Mensaje from "../models/Mensaje.js";

const getData = async (req, res) => {
  const {id} = req.params
  const { hasta, desde } = req.query;
  const query = { estado: true, chat: id };

  const [total, mensajes] = await Promise.all([
    Mensaje.countDocuments(query),
    Mensaje.find(query)
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('chat', ['usuario1', 'usuario2'])
  ]);

  res.json({
    total,
    mensajes,
  });
};

const postData = async (req, res) => {
  const { id } = req.params
  const { mensaje } = req.body;
  const horaActual = new Date();

    const data = {
        chat: id,
        mensaje,
        hora: horaActual,
        usuario: req.usuario._id
    }

  const newMensaje = new Mensaje(data);

  await newMensaje.save();
  res.json({
    message: "post api",
    newMensaje
  });
};


export { getData, postData };