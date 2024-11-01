import { CreateBookType } from "./book.types"
import { BookType } from "./book.model";
import {createBookAction} from "./create.book.action";

async function createBook(userData: CreateBookType): Promise<BookType> {
    const createdUser = await createBookAction(userData);
  
    return createdUser;
  }
  
  // EXPORT CONTROLLER FUNCTIONS
  export {  createBook };