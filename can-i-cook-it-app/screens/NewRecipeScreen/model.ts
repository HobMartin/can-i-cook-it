import { createEffect, createEvent, createStore } from "effector";
import { getSearchSpoonReceipts } from "../../api/receipts";
import { getReceiptParams } from "../../api/types";
import { NewRecipe } from "./types";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../initSupabase";
import { uploadToSupabase } from "../../utils/uploadToSupabase";
import { Database } from "../../types/database.types";

type InsertStep = Database["public"]["Tables"]["step"]["Insert"];
const updateReceipt = createEvent();
export const $receipts = createStore([]);
$receipts.on(updateReceipt, (_, payload) => payload);
export const fxAddNewReceipt = createEffect<{ data: NewRecipe }, void>();

fxAddNewReceipt.use(async ({ data }) => {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return;

  console.log("Upload receipt image");

  const publicUrl = data.receiptImage?.base64
    ? await uploadToSupabase(data.receiptImage.base64, "jpg", "receipts")
    : null;

  console.log("Upload receipt image success: ", publicUrl);

  console.log("Insert receipt");

  const { data: receipt, error: receiptError } = await supabase
    .from("receipt")
    .insert({
      complexity: data.difficult,
      receipt_name: data.name,
      time_to_cook: data.timeToCook.toString(),
      created_by: authUser.id,
      image: publicUrl,
    })
    .select("id")
    .single();

  if (receiptError) {
    console.log(receiptError);
    throw receiptError;
  }
  console.log("Insert receipt success: ", receipt.id);

  console.log("Insert ingredients");

  const { data: ingredients, error: ingredientsError } = await supabase
    .from("ingredient")
    .insert(
      data.ingredients.map((ingredient) => ({
        name: ingredient.name,
        receipt_id: receipt.id,
      }))
    );

  if (ingredientsError) {
    console.log(ingredientsError);
    throw ingredientsError;
  }
  console.log("Insert ingredients success: ");

  console.log("Insert steps");

  console.log("Upload steps images");

  const stepsData = await Promise.all(
    data.steps.map<Promise<InsertStep>>(async (step, index) => {
      return {
        description: step.description,
        number: index + 1,
        receipt_id: receipt.id,
        image: step.image
          ? await uploadToSupabase(step.image.base64, "jpg", "receipts")
          : null,
      };
    })
  );

  console.log("Upload steps images success: ", stepsData);

  const { data: steps, error: stepsError } = await supabase
    .from("step")
    .insert(stepsData);

  if (stepsError) {
    console.log(stepsError);
    throw stepsError;
  }
  console.log("Insert steps success: ");

  console.log("Receipt created success: ", receipt.id);
});
