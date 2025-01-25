import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  needPasswordChange: boolean;
  role: TUserRole;
  status: "in-progress" | "blocked";
  passwordChangedAt?: Date;
  address: {
    division: string;
    district: string;
    upazila: string;
  };
  fullAddress: string;
  phone: string;
  zip: number;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
