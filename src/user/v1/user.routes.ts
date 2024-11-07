import { Router, Request, Response } from "express";
import { createUser, readUsers } from "./user.controller";
import { CreateUserType } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { UserType } from "./user.model";
import { hashMiddleware } from "../../middleware/hasher";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}
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
  if (request.body.email === undefined || request.body.password === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const user = await readUsers({ email: request.body.email });
    bcrypt.compare(request.body.password, user[0].password, function (err: Error, result: boolean) {
      if (result) {
        response.status(200).json({
          message: "Logged in",
          user: user,
        });
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
async function GetOneUser(request: Request, response: Response) {
  console.log(request.query)
  console.log(request.body)
  const users = await readUsers();

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one", AuthMiddleware, GetOneUser);
userRoutes.post("/register", hashMiddleware, CreateUser);
userRoutes.post("/login", logUser)

// EXPORT ROUTES
export default userRoutes;
