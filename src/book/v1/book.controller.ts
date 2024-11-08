import { CreateBookType, UpdateBookType } from "./book.types"
import { BookType } from "./book.model";
import {createBookAction} from "./create.book.action";
import { readBookAction, readBooksAction } from "./read.book.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";

async function createBook(userData: CreateBookType): Promise<BookType> {
    const createdUser = await createBookAction(userData);
  
    return createdUser;
  }
  async function readBooks(filter:{}): Promise<BookType[]> {
    const books = await readBooksAction(filter);
    return books;
  }
  async function readBook(id: string,active:boolean=true): Promise<BookType|null> {
    const book = await readBookAction(id,active);
    return book;
  }
  async function deleteBook(id: string): Promise<BookType|null> {
    const book = await deleteBookAction(id);
    return book;
  }
  async function updateBook(id:string, bookData:UpdateBookType):Promise<BookType|null>{
    const updatedBook = await updateBookAction(id,bookData);
    return updatedBook;
  }
  // EXPORT CONTROLLER FUNCTIONS
  export {  createBook ,readBook,readBooks, updateBook, deleteBook};