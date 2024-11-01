import { Router, Request, Response } from "express";
import { createBook} from "./book.controller";
import { CreateBookType } from "./book.types";
import { AuthMiddleware } from "../../middleware/auth";
import { BookType } from "./book.model";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS

async function CreateBook(request: Request<CreateBookType>, response: Response) {
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
bookRoutes.post("/", CreateBook);

// EXPORT ROUTES
export default bookRoutes;