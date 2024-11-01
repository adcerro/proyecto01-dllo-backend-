import { BookModel, BookType } from "./book.model";
import { CreateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookAction(userData: CreateBookType): Promise<BookType> {
  const results = await BookModel.create(userData);

  return results;
}

// EXPORT ACTION FUNCTION
export {createBookAction};
