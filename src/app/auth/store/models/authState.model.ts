import { User } from "../../user.model";

export default interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}
