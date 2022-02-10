export default interface User {
  firstName: string;
  lastName: string;
  birthday?: Date;
  avatar?: string;
  lastOnlinePing?: Date;
  updatedAt?: Date;
  createdAt: Date;
  auth?: UserAuth;
  job?: UserJob;
  hobbies?: string[]
  city?: string;
}

interface UserJob {
  position: string
  company: string
}

interface UserAuth {
  google?: {
    id: string;
  };
}
