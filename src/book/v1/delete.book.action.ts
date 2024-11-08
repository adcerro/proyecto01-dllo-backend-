import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function deleteBookAction(id: string): Promise<BookType | null> {
    const deletedBook = await BookModel.findByIdAndUpdate(id, { active: false }, { returnDocument: 'after', new: true });
    return deletedBook;
}

// EXPORT ACTION FUNCTION
export default deleteBookAction;