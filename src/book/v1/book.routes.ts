import { Router, Request, Response } from "express";
import { createBook } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { createBookMiddleware } from "../../middleware/create_permision";
import { readBook, readBooks } from "./book.controller";

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

// DECLARE ENDPOINTS
bookRoutes.get("/search", getBooks);
bookRoutes.get("/:book_id", getOneBook);
bookRoutes.post("/create", AuthMiddleware, createBookMiddleware, CreateBook);

// EXPORT ROUTES
export default bookRoutes;