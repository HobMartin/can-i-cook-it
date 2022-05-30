export const convertToSearchParams = (params: any) => {
  let searchParams = "";
  Object.keys(params).forEach((key) => {
    searchParams = searchParams.concat(`${key}=${params[key]}&`);
  });
  return searchParams;
};
