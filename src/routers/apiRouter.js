import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

import { protectorMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  createComment
);
apiRouter.get(
  "/comments/:id([0-9a-f]{24})",
  protectorMiddleware,
  deleteComment
);

export default apiRouter;
