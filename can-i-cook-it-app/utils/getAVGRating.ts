export function getAVGRating(ratings?: { value: number }[]) {
  if (!ratings || !ratings.length) {
    return 0;
  }
  const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
  return +(sum / ratings.length).toFixed(2);
}
