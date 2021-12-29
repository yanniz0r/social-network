import { ObjectID } from "bson";

type Post = TextPost | ImagePost

export default Post

type BasePost<T, D> = D & {
  type: T,
  createdAt: Date
  text?: string
  userID: ObjectID
}

type TextPost = BasePost<'text', {
  text: string
}>

type ImagePost = BasePost<'text', {
  image: string
}>