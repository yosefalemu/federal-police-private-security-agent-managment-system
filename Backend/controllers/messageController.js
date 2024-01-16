const Message = require("../models/messageModel");
const { BadRequestError } = require("../errors");
const socketIo = require("../socket");

const createMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (!conversationId || !sender || !text) {
    throw new BadRequestError("All fields as required to create message");
  }
  try {
    const message = await Message.create({
      conversationId,
      sender,
      text,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const id = req.params.conversationId;
  try {
    const messages = await Message.find({ conversationId: id });
    res.status(201).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUnViewedMessage = async (req, res) => {
  const conversationId = req.params.id;
  const { isViewed, currentUserId } = req.body;
  try {
    const unviewdMessages = await Message.find({
      conversationId,
      isViewed,
    });
    const unviewdMessage = unviewdMessages?.filter(
      (item) => item.sender.toString() !== currentUserId.toString()
    );
    res.status(200).json(unviewdMessage);
  } catch (error) {
    console.log(error);
  }
};

const updateMessageView = async (req, res) => {
  const id = req.params.id;
  const { isViewed } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      {
        isViewed,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    console.log(`updatedMessage: ${updatedMessage}`);
    res.status(201).json(updatedMessage);
  } catch (error) {}
};

module.exports = {
  createMessage,
  getMessages,
  getUnViewedMessage,
  updateMessageView,
};
