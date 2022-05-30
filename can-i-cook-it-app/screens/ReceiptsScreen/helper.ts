export const getReceiptId = (link: string) => {
  const [href, search] = link.split("?");
  const hrefArr = href.split("/");
  return hrefArr.pop();
};
