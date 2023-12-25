const UserSchema = require("../models/usersModel");
const EmployeeSchema = require("../models/employeesModel");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const createEmployee = async (req, res) => {
  // req.body.userId = req.user.userId;
  const { email } = req.body;
  const employeeExists = await EmployeeSchema.findOne({
    email: email,
  });
  if (employeeExists) {
    throw new BadRequestError("email taken");
  }
  const employee = await EmployeeSchema.create(req.body);

  if (employee) {
    await employee.save();
    res.status(StatusCodes.CREATED).json({ employee });
  } else {
    res.status(400);
    throw new BadRequestError("Invalid Employee data");
  }
};

const getAllEmployees = async (req, res) => {
  const employees = await EmployeeSchema.find({});
  if (employees) {
    res.status(201).json({ employees });
  } else {
    throw new BadRequestError("No employee yet");
  }
};

const getSingleEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeSchema.findById(id);
    if (!employee) {
      throw new BadRequestError(`there is no Employee with id ${id}`);
    }
    // checkPermissions(req.user, employee.userId);
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const employee = await EmployeeSchema.findOneAndUpdate(
    { _id: employeeId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!employee) {
    throw new CustomError.NotFoundError(`No employee with id : ${employeeId}`);
  }

  res.status(StatusCodes.OK).json({ employee });
};

const getAgentEmployee = async (req, res) => {
  const agentId = req.params.agentId;
  const employee = await EmployeeSchema.find({
    agentId: agentId,
  });
  if (!employee) {
    throw BadRequestError(`No Employee with agentId ${agentId}`);
  }
  res.status(StatusCodes.OK).json({ employee });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  getAgentEmployee,
};
