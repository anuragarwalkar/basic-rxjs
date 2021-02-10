export default interface LoginPayload {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
}
