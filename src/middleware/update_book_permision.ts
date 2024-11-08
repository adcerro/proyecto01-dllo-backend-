import { NextFunction, Request, Response } from "express";
import { readUser } from "../user/v1/user.controller";

export async function updateBookMiddleware(request: Request, response: Response, next: NextFunction) {
    // verifico permiso de editar
    let user = await readUser(request.body.user);
    if(user?.book_modifier !== true){
        return response.status(401).json({
            message: "Not authorized User."
        });
    }
    next();
}