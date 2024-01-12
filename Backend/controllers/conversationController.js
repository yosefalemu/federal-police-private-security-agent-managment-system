const Conversation = require("../models/conversationModel");
const { BadRequestError } = require("../errors");
const socketIo = require("../socket");

const createConversation = async (req, res) => {
  console.log(req.body);

  try {
    const chatExists = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });
    if (chatExists) {
      return res.status(200).json(chatExists);
    }
    const newChat = await Conversation.create({
      members: [req.body.senderId, req.body.recieverId],
      participants: req.body.participants,
    });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getConversation = async (req, res) => {
  const id = req.params.id;
  console.log("get conversation", id);
  const conversation = await Conversation.find({
    members: { $in: [id] },
  }).sort({ updatedAt: -1 });
  if (!conversation) {
    return;
  }
  res.status(200).json(conversation);
};

module.exports = {
  createConversation,
  getConversation,
};
