import { Router } from "express";


const router = Router()

router.get("/static/images/image-post/:postID", async (request, response) => {
  const post = await request.context.postService.getPostByID(request.params.postID)
  if (!post || post.type !== 'image') {
    return response.status(404)
  }
  const stream = await request.context.uploadService.downloadStream("image-post", post.image)
  stream.pipe(response)
  response.status(200)
  // response.json({test: "wow"})
})

export default router
