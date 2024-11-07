import { NextFunction, Request, Response } from "express";
let bcrypt = require('bcrypt')
export async function hashMiddleware(request: Request, response: Response, next: NextFunction) {
    bcrypt.hash(request.body.password, 4 , function (err: Error, hash: string) {
        request.body.password = hash;
        next();
    });
}