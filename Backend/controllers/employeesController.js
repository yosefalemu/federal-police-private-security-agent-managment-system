const UserSchema = require("../models/usersModel");
const EmployeeSchema = require("../models/employeesModel")
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {checkPermissions} = require("../utils")

const createEmployee = async (req, res) => {
  req.body.userId = req.user.userId;
  const { email, firstName, middleName, lastName } = req.body;
  const employeeExists = await EmployeeSchema.findOne({
    $or: [{ email }, { firstName, middleName, lastName }],
  });
  if (employeeExists) {
    if (employeeExists.email === email) {
      throw new BadRequestError("email taken");
    } else {
      throw new BadRequestError("The employee already exist in the system");
    }
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
    res.status(201).json(employees);
  } else {
  }
};

const getSingleEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeSchema.findById(id);
    if (!employee) {
      throw new BadRequestError(`there is no Employee with id ${id}`);
    }
    checkPermissions(req.user, employee.userId);
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
  }
};


const updateEmployee = async (req, res) => {
 const { id: employeeId } = req.params;

 const employee = await EmployeeSchema.findOneAndUpdate({ _id: employeeId }, req.body, {
   new: true,
   runValidators: true,
 });

 if (!employee) {
   throw new CustomError.NotFoundError(`No employee with id : ${employeeId}`);
 }

 res.status(StatusCodes.OK).json({ employee });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
};
