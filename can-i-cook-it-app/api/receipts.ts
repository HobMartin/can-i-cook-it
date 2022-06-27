import axios from "axios";
import { t } from "../hooks/useTranslate";
import { convertToSearchParams } from "./helper";
import { getReceiptParams } from "./types";
import {
  BASE_URL,
  basicParams,
  spoonBasicParams,
  SPOON_BASE_URL,
} from "./urls";

export const getReceipts = async (params: getReceiptParams) => {
  const queryParams = convertToSearchParams({ ...basicParams, ...params });
  const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
  const data = await response.data;
  return data;
};

export const getSearchSpoonReceipts = async (params: getReceiptParams) => {
  const translatedText = await t(params.query ?? "", "uk", "en");
  const queryParams = convertToSearchParams({
    ...spoonBasicParams,
    query: translatedText,
  });
  console.log({ queryParams });

  const response = await axios.get(
    `${SPOON_BASE_URL}/complexSearch?${queryParams.toString()}`
  );

  const data = await response.data;
  return data;
};

export const getReceipt = async (id: string) => {
  const queryParams = convertToSearchParams(basicParams);

  const response = await axios.get(
    `${BASE_URL}/${id}?${queryParams.toString()}`
  );
  const data = await response.data;
  return data;
};

export const getSpoonReceipt = async (id: string) => {
  const queryParams = convertToSearchParams(spoonBasicParams);
  const response = await axios.get(
    `${SPOON_BASE_URL}/${id}/information?${queryParams.toString()}`
  );
  const data = await response.data;
  return data;
};

export const getSimilarSpoonReceipt = async (id: string) => {
  const queryParams = convertToSearchParams(spoonBasicParams);
  const response = await axios.get(
    `${SPOON_BASE_URL}/${id}/similar?${queryParams.toString()}`
  );
  const data = await response.data;
  return data;
};
