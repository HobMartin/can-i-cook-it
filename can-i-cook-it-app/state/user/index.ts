import { createEvent, createStore } from "effector";
import { UserInfo } from "firebase/auth";

export const updateUser = createEvent<UserInfo>();
export const $user = createStore<UserInfo>({} as UserInfo);
$user.on(updateUser, (_, payload) => payload);
