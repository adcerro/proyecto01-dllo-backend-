import { NextFunction, Request, Response } from "express";
import { readUser } from "../user/v1/user.controller";

export async function deleteBookMiddleware(request: Request, response: Response, next: NextFunction) {
    // verifico permiso de crear
    let user = await readUser(request.body.user);
    if(user?.book_deleter !== true){
        return response.status(401).json({
            message: "Not authorized User."
        });
    }
    next();
}