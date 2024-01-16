const Conversation = require("../models/conversationModel");
const { BadRequestError } = require("../errors");
const socketIo = require("../socket");
const { StatusCodes } = require("http-status-codes");

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

const updateConversation = async (req, res) => {
  const { conversationId } = req.params;
  console.log("conversation id", conversationId);
  const updatedAt = Date.now();
  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: conversationId },
    { updatedAt },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!updatedConversation) {
    throw BadRequestError(`There is no conversation with id ${conversationId}`);
  }
  console.log("updatedConversation", updatedConversation);
  res.status(StatusCodes.OK).json(updatedConversation);
};

module.exports = {
  createConversation,
  getConversation,
  updateConversation,
};
