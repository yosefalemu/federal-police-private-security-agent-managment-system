const Conversation = require("../models/conversationModel");
const { BadRequestError } = require("../errors");
const socketIo = require("../socket");

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    const io = socketIo.getIo();
    io.emit("newConversation", savedConversation); // Emitting a message to all connected clients
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
    throw new BadRequestError("Something went wrong or you added invalid data");
  }
};

//get conv of a user

const getUserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    if (!conversation) {
      throw new BadRequestError(
        `No conversation for this specified user ${req.params.id}`
      );
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId

const getConversationTwoUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
    throw new BadRequestError("The two users doesn't have conversations")
  }
};

module.exports = {
  createConversation,
  getConversationTwoUsers,
  getUserConversation,
};
