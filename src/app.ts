import userRoutes from "./user/v1/user.routes";
import bookRoutes from "./book/v1/book.routes";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import reserveRoutes from "./reserve/v1/reserve.routes";

// ROUTES
const SERVER_VERSION = "/library/v1/";

// FALLBACKS
function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  });
}

export default function createApp() {
  // MIDDLEWARES
  const app = express();

  app.use(cors());
  app.use(express.json());
  
  app.use(SERVER_VERSION + "users", userRoutes);
  app.use(SERVER_VERSION + "books",bookRoutes);
  app.use(SERVER_VERSION + "reserves", reserveRoutes)
  
  app.use(routeNotFound);
  return app;
}