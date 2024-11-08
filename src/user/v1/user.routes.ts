import { Router, Request, Response } from "express";
import { createUser, readUsers,readUser,updateUser } from "./user.controller";
import { hashMiddleware } from "../../middleware/hasher";
import { env } from "process";
import { AuthMiddleware } from "../../middleware/auth";
import { updateUserMiddleware } from "../../middleware/update_user_permision";

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
async function UpdateUser(request: Request, response: Response){
  let updatedUser = await updateUser(request.params.user_id,request.body);
  console.log(request.body);
  
  if(updatedUser===null){
    return response.status(401).json({
      message: "something went worng"
    });
  }
  return response.status(200).json({
    message: "Updated",
    user: updatedUser
  });
}

// DECLARE ENDPOINTS
userRoutes.post("/register", hashMiddleware, CreateUser);
userRoutes.post("/login", logUser)
userRoutes.patch("/update/:user_id",AuthMiddleware,updateUserMiddleware,hashMiddleware,UpdateUser)

// EXPORT ROUTES
export default userRoutes;
