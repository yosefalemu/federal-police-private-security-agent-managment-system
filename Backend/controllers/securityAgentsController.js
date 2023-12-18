
const AgentSchema = require("../models/agentsModel")
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {checkPermissions} = require("../utils")

const getAllAgents = async (req, res) => {
  const agents = await AgentSchema.find({});
  if (agents) {
    res.status(201).json(agents);
  } else {
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
  updateAgent,
};
