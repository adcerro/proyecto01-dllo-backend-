import { Router, Request, Response } from "express";
import { AuthMiddleware } from "../../middleware/auth";
import { createBookMiddleware } from "../../middleware/create_book_permision";
import { createBook, deleteBook, readBook, readBooks , updateBook} from "./book.controller";
import { updateBookMiddleware } from "../../middleware/update_book_permision";
import { deleteBookMiddleware } from "../../middleware/delete_book_permision";
import { ReadMiddleware } from "../../middleware/read_middleware";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function getOneBook(request: Request, response: Response) {
  let book = await readBook(request.params.book_id);

  if (book === null) {
    return response.status(401).json({
      message: "Book Not Found"
    });
  }
  return response.status(200).json({
    message: "found",
    id: request.params.book_id,
    book: book
  });
}

async function getBooks(request: Request, response: Response) {
  let books = await readBooks(request.query);
  return response.status(200).json({
    books
  });
}

async function CreateBook(request: Request, response: Response) {
  if (request.body.title === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const book = await createBook(request.body);

    response.status(200).json({
      message: "Success.",
      book: book,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    })
  }
}
async function UpdateBook(request:Request,response:Response) {
  let updatedBook = await updateBook(request.params.book_id,request.body);
  if(updatedBook===null){
    return response.status(401).json({
      message: "something went worng"
    });
  }
  return response.status(200).json({
    message: "Updated",
    book: updatedBook
  });
}
async function DeleteBook(request:Request,response:Response) {
  let deletedBook = await deleteBook(request.params.book_id);
  if(deletedBook===null){
    return response.status(401).json({
      message: "something went worng"
    });
  }
  return response.status(200).json({
    message: "Deleted",
    book: deletedBook
  });
}
// DECLARE ENDPOINTS
bookRoutes.get("/search",ReadMiddleware, getBooks);
bookRoutes.get("/:book_id",ReadMiddleware, getOneBook);
bookRoutes.post("/create", AuthMiddleware, createBookMiddleware, CreateBook);
bookRoutes.patch("/update/:book_id",AuthMiddleware,updateBookMiddleware,UpdateBook);
bookRoutes.delete("/delete/:book_id",AuthMiddleware,deleteBookMiddleware,DeleteBook)

// EXPORT ROUTES
export default bookRoutes;