import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
  editComment,
} from "../controllers/videoController";

import { protectorMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment",
  protectorMiddleware,
  createComment
);
apiRouter.delete(
  "/comment/:id([0-9a-f]{24})/delete",
  protectorMiddleware,
  deleteComment
);

apiRouter.post(
  "/comment/:id([0-9a-f]{24})/edit",
  protectorMiddleware,
  editComment
);
export default apiRouter;
