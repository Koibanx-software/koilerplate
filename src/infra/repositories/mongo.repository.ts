import { Entity } from "core/entities/Entity";
import { IModelRepository } from "core/repositories/model.repository";
import {
  ObjectId,
  WithId,
  Collection,
  OptionalUnlessRequiredId,
  Filter,
} from "mongodb";

export class MongoModel<T extends Entity> implements IModelRepository<T> {
  constructor(private collection: Collection<T>) {}

  async save(payload: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
    const result = await this.collection.insertOne(payload);
    if (!result.acknowledged) {
      throw new Error("Error on create Resource");
    }
    const userFinded = await this.getById(result.insertedId.toString());
    return userFinded;
  }
  async getById(id: string): Promise<WithId<T>> {
    const result = await this.collection.findOne({
      _id: new ObjectId(id),
    } as Filter<T>);
    if (!result) {
      throw new Error("Not found resource");
    }
    return result;
  }
  // async find(criteria: Object) {
  //   const result = await this.collection.find(criteria);
  //   return result
  // }
}
