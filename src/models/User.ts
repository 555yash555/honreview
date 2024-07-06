import mongoose, { Schema, Document } from "mongoose";
export interface Message extends Document {
  content: string;
  createdAt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  verifyCodeExpires: Date;
  isAcceptingmessages: boolean;
  isVerified: boolean;

  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "email is in invalid format"],
  },
  password: { type: String, required: true },
  verifycode: { type: String, required: [true, "verifycode is required"] },
  verifyCodeExpires: {
    type: Date,
    required: [true, "verifyCodeExpires is required"],
  },
  isAcceptingmessages: { type: Boolean, default: true },
  messages: [MessageSchema],
  isVerified: { type: Boolean, default: false },
});
const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User", UserSchema);
export default UserModel;