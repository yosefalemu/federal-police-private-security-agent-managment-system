const PreviousEmployeedSchema = require("../models/previousEmployeed");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const registerWhereEmployeeEmployeed = async (req, res) => {
  const { employeeId, agentId, agentName } = req.body;
  if (!employeeId || !agentId || !agentName) {
    throw BadRequestError("please provide all information");
  }
  const newEmployeedAgent = await PreviousEmployeedSchema.create(req.body);
  if (!newEmployeedAgent) {
    throw BadRequestError(
      "Employeed's current agent is not registered please try again"
    );
  }
  res.status(StatusCodes.CREATED).json(newEmployeedAgent);
};

const getEmployeePreviousAgents = async (req, res) => {
  const { userId } = req.params;
  const userPreviousAgents = await PreviousEmployeedSchema.find({
    employeeId: userId,
  });
  if (!userPreviousAgents) {
    throw BadRequestError("Employee not employeed yet");
  }
  res.status(StatusCodes.OK).json(userPreviousAgents);
};

module.exports = {
  registerWhereEmployeeEmployeed,
  getEmployeePreviousAgents,
};
