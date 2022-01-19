export default interface User {
  firstName: string;
  lastName: string;
  birthday?: Date;
  avatar?: string;
  lastOnlinePing?: Date;
  updatedAt?: Date;
  createdAt: Date;
  auth?: UserAuth;
}

interface UserAuth {
  google?: {
    id: string
  }
}
