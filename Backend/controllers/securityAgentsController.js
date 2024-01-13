const AgentSchema = require("../models/agentsModel");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const getAllAgents = async (req, res) => {
  const agents = await AgentSchema.find({});
  if (agents) {
    res.status(201).json(agents);
  } else {
    throw new BadRequestError("No agent yet");
  }
};

const getSingleAgent = async (req, res) => {
  const id = req.params.id;
  try {
    const agent = await AgentSchema.findById(id);
    if (!agent) {
      throw new BadRequestError(`there is no Agent with id ${id}`);
    }
    checkPermissions(req.user, agent.userId);
    res.status(201).json(agent);
  } catch (error) {
    console.log(error);
  }
};

const getSingleAgentByName = async (req, res) => {
  const { agentName } = req.body;
  console.log("agentName", agentName);
  try {
    const agent = await AgentSchema.findOne({ agentName: agentName });
    console.log(agent);
    if (!agent) {
      throw new BadRequestError(`there is no Agent with name ${agentName}`);
    }
    res.status(201).json(agent);
  } catch (error) {
    console.log(error);
  }
};

const getAgentByUserIdAndUpdate = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId", userId);
  console.log("body for agent", req.body);
  const { dataToBeUpdated } = req.body;
  const updatedAgent = await AgentSchema.findOneAndUpdate(
    { userId: userId },
    dataToBeUpdated,
    { runValidators: true, new: true }
  );
  if (!updateAgent) {
    throw BadRequestError(`There is no agent with userID ${userId}`);
  }
  res.status(StatusCodes.OK).json(updatedAgent);
};

const getAgentWithEmail = async (req, res) => {
  const email = req.params.email;
  const agent = await AgentSchema.findOne({ email: email });
  if (!agent) {
    throw BadRequestError(`No Agent with Email ${email}`);
  }
  res.status(StatusCodes.OK).json({ agent });
};

const updateAgent = async (req, res) => {
  const { id: agentId } = req.params;

  const agent = await AgentSchema.findOneAndUpdate({ _id: agentId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!agent) {
    throw new CustomError.NotFoundError(`No Agent with id : ${agentId}`);
  }

  res.status(StatusCodes.OK).json({ agent });
};

module.exports = {
  getAllAgents,
  getSingleAgent,
  getSingleAgentByName,
  getAgentByUserIdAndUpdate,
  getAgentWithEmail,
  updateAgent,
};
