import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function readBooksAction(filter: {} = {}): Promise<BookType[]> {
    const results = await BookModel.find(filter);

    return results;
}

async function readBookAction(id: string): Promise<BookType | null> {
    try {
        const result = await BookModel.findById(id);
        return result;
    } catch (error) {
        return null;
    }
}

// EXPORT ACTION FUNCTION
export { readBooksAction, readBookAction };