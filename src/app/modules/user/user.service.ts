import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import customGenerateId from "../../utils/customGenerateId";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

// create a user
const createUserIntoDB = async (userData: IUser) => {
  // check user exist by this email
  const isExistingUser = await User.findOne({ email: userData.email });
  if (isExistingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user already exist");
  }

  const incrementId = await customGenerateId("user", User);
  userData.id = incrementId;

  // Create the user in the database
  const user = new User(userData);
  const newUser = await user.save();

  return newUser;
};

// get all user from db
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const allUserQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await allUserQuery.modelQuery;
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Users not found");
  }
  return result;
};

// get single user by id
const getSingleUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// get single user by email
const getSingleUserByEmailFromDB = async (email: string) => {
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// update single user by id
const updateSingleUserByIdFromDB = async (id: string, updateUser: IUser) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
  return updatedUser;
};

// delete single user by id
const deleteSingleUserByIdFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return {};
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserByIdFromDB,
  getSingleUserByEmailFromDB,
  updateSingleUserByIdFromDB,
  deleteSingleUserByIdFromDB,
};
