import { RecipeFields } from "./types";

export const ERRORS_MESSAGES: {
  [key in RecipeFields]: string;
} = {
  name: "Введіть назву рецепту",
  ingredients: "Введіть інградієнти",
  steps: "Введіть кроки приготування",
  difficult: "Вкажіть складність",
  timeToCook: "Вкажіть час приготування",
  receiptImage: "Додайте фото рецепту",
};
