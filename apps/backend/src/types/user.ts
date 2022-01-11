export default interface User {
  firstName: string;
  lastName: string;
  birthday?: Date;
  avatar?: string;
  lastOnlinePing?: Date;
}
