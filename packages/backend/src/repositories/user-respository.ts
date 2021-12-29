import { Collection, Db } from "mongodb";
import { Logger } from "tslog";
import User from "../types/user";

const logger = new Logger({ name: 'UserRepository' })

export default class UserRepository {

  private collection: Collection<User>

  constructor(db: Db) {
    this.collection = db.collection('users')
    // this.collection.insertOne({
    //   firstName: 'Yannic',
    //   lastName: 'Inseldude'
    // })
  }

  async findFirst() {
    return await this.collection.findOne()
  }

}