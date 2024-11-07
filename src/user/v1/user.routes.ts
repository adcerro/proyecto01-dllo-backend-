import { Router, Request, Response } from "express";
import { createUser, readUsers,readUser } from "./user.controller";
import { hashMiddleware } from "../../middleware/hasher";
import { env } from "process";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS

async function CreateUser(request: Request, response: Response) {
  if (request.body.email === undefined || request.body.password === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const users = await createUser(request.body);

    response.status(200).json({
      message: "Success.",
      users: users,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    })
  }
}

async function logUser(request: Request, response: Response) {
  let bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken');

  if (request.body.email === undefined || request.body.password === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const user = await readUser(request.body.email);
    if (user === null) {
      return response.status(400).json({ message: "Not a registered user" });
    }
    bcrypt.compare(request.body.password, user.password, function (err: Error, result: boolean) {
      if (result) {
        response.status(200).json(
          jwt.sign({ sub: user.email },
            (env as { JWT_SECRET: string }).JWT_SECRET,
            { expiresIn: "12h" })
          );
      } else {
        response.status(200).json({
          message: "Wrong Credentials",
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    })
  }
}

// DECLARE ENDPOINTS
userRoutes.post("/register", hashMiddleware, CreateUser);
userRoutes.post("/login", logUser)

// EXPORT ROUTES
export default userRoutes;
