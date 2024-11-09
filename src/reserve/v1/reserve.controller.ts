import createReserveAction from "./create.reserve.action";
import readReservesAction from "./read.reserve.action";
import { ReserveType } from "./reserve.model";
import { CreateReserveType } from "./reserve.types";

async function createReserve(reserveData: CreateReserveType): Promise<ReserveType> {
    const createdReserve = await createReserveAction(reserveData);
  
    return createdReserve;
}
async function readReserves(filter:{}={}): Promise<ReserveType[]> {
    const reserves = await readReservesAction(filter);
  
    return reserves;
}
export {createReserve, readReserves};