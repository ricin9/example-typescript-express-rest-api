import { Router } from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from "../handlers/post.handler";
import authentication from "../middlewares/authentication";
import dataValidation from "../middlewares/dataValidation";
import createPostSchema from "../schemas/posts/createPostSchema";
import updatePostSchema from "../schemas/posts/updatePostSchema";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);

postRouter.use(authentication);
postRouter.post("/", dataValidation(createPostSchema), createPost);
postRouter.patch("/:id", dataValidation(updatePostSchema), updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
