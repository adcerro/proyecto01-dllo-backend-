import createReserveAction from "./create.reserve.action";
import readReservesAction from "./read.reserve.action";
import { ReserveType } from "./reserve.model";
import { CreateReserveType} from "./reserve.types";
import endReserveAction from "./end.reserve.action";

async function createReserve(reserveData: CreateReserveType): Promise<ReserveType> {
    const createdReserve = await createReserveAction(reserveData);
  
    return createdReserve;
}
async function readReserves(filter:{}={}): Promise<ReserveType[]> {
    const reserves = await readReservesAction(filter);
  
    return reserves;
}
async function endReserve(book_id:string): Promise<ReserveType|null> {
    const reserve = await endReserveAction(book_id);
  
    return reserve;
}
export {createReserve, readReserves, endReserve};