import { FilterQuery } from "mongoose";
import { Document, Model, model, Schema } from "mongoose";
import { PaginatedResult } from "utils/Pagination";

interface IEntity extends Document {}

export interface IMongoRepository<T> {
  create(payload: T): Promise<T>;
  update(query: object, update: Partial<T>): Promise<T | null>;
  delete(query: FilterQuery<T>): Promise<boolean>;
  findOne(criteria: FilterQuery<T>): Promise<T>;
  searchOne(query: object): Promise<T | null>;
  findRaw(criteria: FilterQuery<T>): Promise<T[]>;
  find(
    page: number,
    pageSize: number,
    query?: FilterQuery<T>
  ): Promise<PaginatedResult<T>>;
}

export class MongoDBRepository<T extends IEntity>
  implements IMongoRepository<T>
{
  public readonly model: Model<T>;

  constructor(private modelName: string, schema: Schema<T>) {
    this.model = model<T>(modelName, schema);
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return this.model.create(data);
    } catch (error) {
      throw new Error(`error al crear ${this.modelName}`);
    }
  }

  async update(query: object, update: object): Promise<T> {
    try {
      const resourceUpdated = await this.model
        .findOneAndUpdate(query, update, { new: true })
        .exec();
      if (!resourceUpdated) {
        throw new Error(`${this.modelName} not found`);
      }
      return resourceUpdated;
    } catch (error) {
      throw new Error(`error al actualizar ${this.modelName}`);
    }
  }

  async delete(query: object): Promise<boolean> {
    try {
      const result = await this.model.deleteOne(query);
      return result.acknowledged;
    } catch (error) {
      throw new Error(`error al borrar ${this.modelName}`);
    }
  }

  async findOne(query: object): Promise<T> {
    try {
      const result = await this.model.findOne(query).exec();
      if (!result) {
        throw new Error(`${this.modelName} not found`);
      }
      return result;
    } catch (error) {
      throw new Error(`error al buscar un ${this.modelName}`);
    }
  }
  async searchOne(query: object): Promise<T | null> {
    try {
      const result = await this.model.findOne(query).exec();
      return result;
    } catch (error) {
      throw new Error(`error al buscar un ${this.modelName}`);
    }
  }

  async findRaw(query?: object): Promise<T[]> {
    try {
      return this.model.find(query ?? {}).exec();
    } catch (error) {
      throw new Error(`error al buscar varios ${this.modelName}`);
    }
  }
  async find(
    page: number,
    pageSize: number,
    query?: object
  ): Promise<PaginatedResult<T>> {
    try {
      const skip = (page - 1) * pageSize;
      const results = await this.model
        .find(query ?? {})
        .skip(skip)
        .limit(pageSize)
        .exec();
      const total = await this.model
        .find(query ?? {})
        .count()
        .exec();
      const pages = Math.floor(total / pageSize);
      return {
        page,
        limit: pageSize,
        pages: pages === 0 ? 1 : pages,
        total,
        results,
      };
    } catch (error) {
      throw new Error(`error al buscar varios ${this.modelName}`);
    }
  }
}
