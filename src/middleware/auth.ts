import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { readUser } from "../user/v1/user.controller";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    if (request.headers.authorization === undefined) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }

    const jwtValues = decode(request.headers.authorization);
    const email = jwtValues?.sub?.toString();
    // hago busqueda de usuario usando id de JWT Values
    if (readUser(email ?? "") === null) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }

    request.body.user = email;


    next();
}