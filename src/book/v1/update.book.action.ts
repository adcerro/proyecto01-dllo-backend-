import { BookModel, BookType } from "./book.model";
import { UpdateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function updateBookAction(id: string, bookData: UpdateBookType): Promise<BookType | null> {

    const updatedBook = await BookModel.findByIdAndUpdate(id, bookData, { returnDocument: 'after', new: true });
    return updatedBook;

}

// EXPORT ACTION FUNCTION
export default updateBookAction;