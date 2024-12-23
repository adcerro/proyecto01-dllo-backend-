import { NextFunction, Request, Response } from "express";
import { readUser } from "../user/v1/user.controller";

export async function deleteUserMiddleware(request: Request, response: Response, next: NextFunction) {
    // verifico permiso de actualizar o si es el mismo usuario.
    let user = await readUser(request.body.user, request.body.active);
    if (user?.user_deleter === true || user?.email === request.body.email) {
        next();
    } else {
        return response.status(401).json({
            message: "Not authorized User."
        });
    }
}