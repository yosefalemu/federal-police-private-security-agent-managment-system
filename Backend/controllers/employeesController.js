const UserSchema = require("../models/usersModel");
const EmployeeSchema = require("../models/employeesModel");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createEmployee = async (req, res) => {
  const { nationalId } = req.body;
  const status = "employeed";
  const employeeExists = await EmployeeSchema.findOne({
    nationalId: nationalId,
    status: status,
  });
  if (employeeExists) {
    throw new BadRequestError(
      "Employee has previous records. Please contact us."
    );
  }
  const freeEmployeeExist = await EmployeeSchema.findOne({
    nationalId: nationalId,
  });
  if (freeEmployeeExist) {
    const employeeUpdated = req.body;
    employeeUpdated.status = "employeed";
    console.log("employee to be updated", employeeUpdated);
    const updatedEmployee = await EmployeeSchema.findOneAndUpdate(
      {
        nationalId: nationalId,
      },
      employeeUpdated,
      { runValidators: true, new: true }
    );
    res.status(StatusCodes.CREATED).json({ updatedEmployee });
    return;
  }
  const employee = await EmployeeSchema.create(req.body);

  if (!employee) {
    throw new BadRequestError(
      "Unable to create an employee. Please provide all the required information and try again."
    );
  }
  await employee.save();
  res.status(StatusCodes.CREATED).json({ employee });
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
  const { employees } = req.body;

  console.log(employees);

  const employee = await EmployeeSchema.findOneAndUpdate(
    { _id: employeeId },
    employees,
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
