import { NextFunction, Request, Response } from "express";
import { readUser } from "../user/v1/user.controller";

export async function updateUserMiddleware(request: Request, response: Response, next: NextFunction) {
    // verifico permiso de actualizar o si es el mismo usuario.
    let user = await readUser(request.body.user);
    if (user?.user_modifier === true || user?.email === request.body.email) {
        next();
    } else {
        return response.status(401).json({
            message: "Not authorized User."
        });
    }
}