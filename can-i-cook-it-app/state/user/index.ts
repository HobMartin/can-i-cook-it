import { createEvent, createStore, restore } from "effector";
import { UserInfo } from "firebase/auth";
import { User } from "@supabase/supabase-js";

export const updateUser = createEvent<User>();
export const $user = restore<User>(updateUser, {} as User);
