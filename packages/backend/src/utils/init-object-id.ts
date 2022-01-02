import { ObjectId } from "mongodb";

export default function initObjectID(id: ObjectId | string) {
  return typeof id === "string" ? new ObjectId(id) : id;
}
