export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const buildImageUrl = (image: string) => {
  return `https://spoonacular.com/cdn/ingredients_250x250/${image}`;
};
