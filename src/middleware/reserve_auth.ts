import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { readUser } from "../user/v1/user.controller";
import { readBook } from "../book/v1/book.controller";

export async function ReserveAuthMiddleware(request: Request, response: Response, next: NextFunction) {

    if (request.headers.authorization === undefined) {
        
        return response.status(401).json({
            message: "Not authorized."
        })
    }

    const jwtValues = decode(request.headers.authorization);
    const email = jwtValues?.sub?.toString();

    // hago busqueda de usuario usando id de JWT Values
    let user = await readUser(email ?? "");
    
    if (user === null) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }

    request.body.email = user.email;
    request.body.name = user.name;

    let book = await readBook(request.body.book_id);
    if(book === null){
        return response.status(400).json({
            message: "Book not found."
        })
    }
    request.body.title = book.title;

    next();
}