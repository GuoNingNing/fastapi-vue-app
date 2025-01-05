import {get} from "@/http.ts";
import type {User} from "@/types/chat.ts";

export function getUser() {
  return get<User>('/users/me')
}
