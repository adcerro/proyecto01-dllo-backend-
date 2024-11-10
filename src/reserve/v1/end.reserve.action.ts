import { ReserveModel, ReserveType } from "./reserve.model";

// DECLARE ACTION FUNCTION
async function endReserveAction(book_id: string): Promise<ReserveType|null> {
  
  const returned = await ReserveModel.findOneAndUpdate({book_id,returned:false},{returned:true},{ returnDocument: 'after', new: true });

  return returned;
}

// EXPORT ACTION FUNCTION
export default endReserveAction;