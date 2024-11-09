import { ReserveType } from "./reserve.model";

export type CreateReserveType = Omit<ReserveType, "_id">