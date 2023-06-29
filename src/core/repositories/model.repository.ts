import { PaginatedParams, PaginatedResult } from "core/entities/Pagination";
import { WithId, OptionalUnlessRequiredId } from "mongodb";
export interface IModelRepository<T> {
  save(payload: OptionalUnlessRequiredId<T>): Promise<WithId<T>>;
  // update(payload: T): Promise<T>
  // delete(id: string): Promise<boolean>
  // getAll(params: PaginatedParams): Promise<PaginatedResult<T>>
  getById(id: string): Promise<WithId<T>>;
  // find(criteria: object): Promise<T[]>
  // findOneBy(criteria: object): Promise<T>
  // search(criteria: object): Promise<T[]>
}
