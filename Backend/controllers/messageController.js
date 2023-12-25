const Message = require("../models/messageModel");
const { BadRequestError } = require("../errors");
const socketIo = require("../socket");

const createMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    const io = socketIo.getIo();
    io.emit("newMessage", savedMessage); // Emitting a message to all connected clients
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createMessage, getMessages };
