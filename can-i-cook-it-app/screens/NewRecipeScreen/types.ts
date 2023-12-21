import { Values } from "../../components/DifficultPicker";
import { Ingredient } from "../../components/DynamicInputs";
import { Step } from "../../components/StepsInput";

export type NewRecipe = {
  name: string;
  receiptImage: { uri: string; base64: string } | null;
  difficult: Values;
  timeToCook: number;
  ingredients: Ingredient[];
  steps: Step[];
};

export type RecipeFields = keyof NewRecipe;

export type NewRecipeErrors = {
  [key in RecipeFields]: string;
};
