import { User } from "entities/user.entity";
import { Document, Schema, model } from "mongoose";

export interface UserDocument extends User, Document {
  id: string;
}

export const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    storeId: {
      type: String,
    },
    role: {
      type: String,
    },
    cryptoCheckoutAccountId: {
      type: String,
    },
    isTermsAcepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: {} }
);

export const UserModel = model<UserDocument>("user", userSchema);

export const UserParser = ({
  _doc: { _id, __v, ...restDataUser },
}: any): User => ({
  ...restDataUser,
  id: _id.toString(),
});
