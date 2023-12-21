import { createEffect, createStore } from "effector";
import { supabase } from "../../initSupabase";
import { collectData } from "../../api/predictPhoto";

export const $rating = createStore<number>(0);

export const fxRating = createEffect<
  { receiptId: string; value: number },
  number
>();
export const fxGetRating = createEffect<{ receiptId: string }, number>();

fxGetRating.use(async ({ receiptId }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("rating_receipt")
    .select("value")
    .eq("receipt_id", receiptId)
    .eq("user_id", user.id)
    .single();
  if (error) {
    return 0;
  }

  return data?.value || 0;
});

fxRating.use(async ({ receiptId, value }) => {
  console.log(receiptId, value);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (!user) {
    console.log("User not found");

    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("rating_receipt")
    .insert({
      user_id: user.id,
      receipt_id: receiptId,
      value,
    })
    .select("value")
    .single();
  if (error) {
    console.log({ error });

    throw error;
  }
  await collectData();

  return data.value;
});
$rating.on(fxGetRating.doneData, (_, payload) => payload);
$rating.on(fxRating.doneData, (_, payload) => payload);
