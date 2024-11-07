import { CreateBookType } from "./book.types"
import { BookType } from "./book.model";
import {createBookAction} from "./create.book.action";
import { readBookAction, readBooksAction } from "./read.book.action";

async function createBook(userData: CreateBookType): Promise<BookType> {
    const createdUser = await createBookAction(userData);
  
    return createdUser;
  }
  async function readBooks(filter:{}): Promise<BookType[]> {
    const books = await readBooksAction(filter);
    return books;
  }
  async function readBook(id: string): Promise<BookType|null> {
    const book = await readBookAction(id);
  
    return book;
  }
  
  // EXPORT CONTROLLER FUNCTIONS
  export {  createBook ,readBook,readBooks};