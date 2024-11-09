import { ReserveModel, ReserveType } from "./reserve.model";

// DECLARE ACTION FUNCTION
async function readReservesAction(filter: {}={}): Promise<ReserveType[]> {
  const results = await ReserveModel.find(filter);

  return results;
}

// EXPORT ACTION FUNCTION
export default readReservesAction;