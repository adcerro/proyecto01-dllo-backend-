import { ReserveModel, ReserveType } from "./reserve.model";
import { CreateReserveType } from "./reserve.types";

// DECLARE ACTION FUNCTION
async function createReserveAction(reserveData: CreateReserveType): Promise<ReserveType> {
  const results = await ReserveModel.create(reserveData);

  return results;
}

// EXPORT ACTION FUNCTION
export default createReserveAction;
