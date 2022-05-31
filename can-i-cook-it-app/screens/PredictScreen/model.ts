import { createEffect, createEvent, createStore } from "effector";

export const updateImage = createEvent<any>();
export const $image = createStore<any>(null);

$image.on(updateImage, (_, payload) => payload);

export const fxUploadPhoto = createEffect();
