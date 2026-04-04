import { InferSchemaType, Model, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

type UserBase = InferSchemaType<typeof userSchema>;
export type UserDocument = UserBase;

const UserModel = model<UserDocument>("User", userSchema);

export const User = UserModel as Model<UserDocument>;
