import Chat from "../models/Chat.js";

const getData = async (req, res) => {
  const { hasta, desde } = req.query;
  const query = {
    estado: true,
    $or: [
      { usuario1: req.usuario._id },
      { usuario2: req.usuario._id },
    ],
  };

  const [total, chats] = await Promise.all([
    Chat.countDocuments(query),
    Chat.find(query)
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario2', ['nombre', 'apellido', 'imagen'])
        .populate('usuario1', ['nombre', 'apellido', 'imagen'])
  ]);

  res.json({
    total,
    chats,
  });
};

const postData = async (req, res) => {
  const { usuario2 } = req.body;

    const data = {
        usuario1: req.usuario._id,
        usuario2
    }

  const newChat = new Chat(data);

  await newChat.save();
  res.json({
    message: "post api",
    newChat,
  });
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  const chat = await Chat.findByIdAndUpdate(id, { estado: false });

  res.json(chat);
};

export { getData, postData, deleteData };