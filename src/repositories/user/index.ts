import { UserDocument } from "./user.schema";
import { MongoDBRepository } from "config/mongo/model.repository";

export class UserRepository extends MongoDBRepository<UserDocument> {}
