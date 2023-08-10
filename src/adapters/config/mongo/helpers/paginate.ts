import { PaginatedParams, PaginatedResult } from "core/utils/Pagination";
import { Aggregate, Document, Model } from "mongoose";

export async function paginate<T extends Document>(
  model: Model<T>,
  options: PaginatedParams,
  pipeline?: Aggregate<any[]>
): Promise<PaginatedResult<T>> {
  const { page, limit, sort, search } = options;
  const skip = (page - 1) * limit;

  if (pipeline) {
    const pipelineObject = pipeline.pipeline();
    const [results, totalResults] = await Promise.all([
      model
        .aggregate(pipelineObject)
        .collation({ locale: "en", strength: 2 }) // Optional: set collation to handle sorting with different languages
        .sort({ ...sort })
        .skip(skip)
        .limit(Number(limit)),
      model.aggregate(pipelineObject).count("total"),
    ]);

    const totalPages =
      totalResults.length > 0 ? Math.ceil(totalResults[0].total / limit) : 0;
    return {
      page,
      pages: totalPages,
      total: totalResults.length > 0 ? totalResults[0].total : 0,
      limit: limit,
      results,
    };
  }
  const findParams = Object.fromEntries(
    Object.entries(search)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, { $regex: value }])
  );
  const [results, totalResults] = await Promise.all([
    model
      .find(findParams as any)
      .sort({ ...sort })
      .skip(skip)
      .limit(limit),
    model.countDocuments(),
  ]);

  const totalPages = totalResults > 0 ? Math.ceil(totalResults / limit) : 0;
  return {
    page: Number(page),
    pages: totalPages,
    total: totalResults > 0 ? totalResults : 0,
    limit: Number(limit),
    results,
  };
}
