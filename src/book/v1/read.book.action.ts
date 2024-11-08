import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function readBooksAction(filter: {} = {}): Promise<BookType[]> {
    const results = await BookModel.find(filter);

    return results;
}

async function readBookAction(id: string,active:boolean=true): Promise<BookType | null> {
    try {
        const result = await BookModel.findById(id);
        if((active && result?.active)||(!active && !result?.active)){
            return result
        }
        return null;
    } catch (error) {
        return null;
    }
}

// EXPORT ACTION FUNCTION
export { readBooksAction, readBookAction };