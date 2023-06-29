export interface PaginatedResult<T> {
  page: number;
  pages: number;
  total: number;
  limit: number;
  results: T[];
}

export class PaginatedParams {
  constructor(
    public page: number = 1,
    public limit: number = 10,
    public sort: object = { createdAt: -1 },
    public search: object = {}
  ) {}

  getValues() {
    return {
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      search: this.search,
    };
  }
}
