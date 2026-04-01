import type { User } from "../../../models/user";

type LoginResponse = {
  user: User;
  token: string;
};

export type { LoginResponse };