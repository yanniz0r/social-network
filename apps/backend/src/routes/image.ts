import { Router } from "express";

const router = Router();

router.get("/static/images/image-post/:postID", async (request, response) => {
  const post = await request.context.postService.getPostByID(
    request.params.postID
  );
  if (!post || post.type !== "image") {
    return response.status(404);
  }
  const stream = await request.context.fileStorageService.downloadStream(
    "image-post",
    post.image
  );
  stream.pipe(response);
  response.status(200);
  // response.json({test: "wow"})
});

router.get("/static/images/avatar/:userID", async (request, response) => {
  const user = await request.context.userService.findUser(
    request.params.userID
  );
  if (!user || !user.avatar) {
    return response.status(404);
  }
  try {
    const stream = await request.context.fileStorageService.downloadStream(
      "avatar",
      user.avatar
    );
    stream.pipe(response);
    response.status(200);
  } catch (e) {
    return response.sendStatus(404);
  }
  // response.json({test: "wow"})
});

export default router;
