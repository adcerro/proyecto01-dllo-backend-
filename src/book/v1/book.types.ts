import { BookType } from "./book.model";

export type CreateBookType = Omit<BookType, "_id">