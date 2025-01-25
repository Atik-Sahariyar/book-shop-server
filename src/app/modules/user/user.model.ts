import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profilePicture: {
      type: String,
      default:
        "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["superAdmin", "admin", "user"],
    },
    status: {
      type: String,
      default: "in-progress",
      enum: ["in-progress", "blocked"],
    },
    passwordChangedAt: { type: Date },
    address: {
      division: String,
      district: String,
      upazila: String,
    },
    fullAddress: String,
    phone: String,
    zip: Number,
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if password is not modified
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// check existing user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

// check password match
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// check token issued time before  changed password
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Post-save hook to reset password in the response
userSchema.post<IUser>("save", function (doc, next) {
  doc.password = ""; // Clear password before sending the response
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
