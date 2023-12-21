import axios from "axios";
import { convertToSearchParams } from "./helper";
import { Receipt, ReceiptsResponse, getReceiptParams } from "./types";
import {
  BASE_URL,
  basicParams,
  spoonBasicParams,
  SPOON_BASE_URL,
} from "./urls";
import { supabase } from "../initSupabase";

const API_BASE_URL = "https://lfqmthf5-80.euw.devtunnels.ms";

export const getPagination = (page?: number, size: number = 10) => {
  const limit = size;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export const getReceipts = async (params: getReceiptParams) => {
  const queryParams = convertToSearchParams({ ...basicParams, ...params });
  const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
  const data = await response.data;
  return data;
};

export const getRecipes = async (
  page: number = 1,
  size: number = 10,
  q?: string,
  userId?: string
) => {
  const { from, to } = getPagination(page, size);

  const query = supabase
    .from("receipt")
    .select(
      "*, step(id, number, description, image), ingredient(id, name), rating_receipt(value)",
      {
        count: "exact",
      }
    )
    .order("created_at", { ascending: false });

  const { data, count, error } = q
    ? await query.textSearch("receipt_name", q, {
        type: "websearch",
      })
    : userId
    ? await query.eq("created_by", userId)
    : await query.range(from, to);

  if (error) {
    throw error;
  }

  return { data, total: count, page, size };
};
export const getRecipe = async (id: string) => {
  const { data, error } = await supabase
    .from("receipt")
    .select(
      "*, step(id, number, description, image), ingredient(id, name), rating_receipt(value)"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
  // const { data } = await axios.get<Receipt>(`${API_BASE_URL}/receipts/${id}`);

  // return data;
};

export const getSearchSpoonReceipts = async (params: getReceiptParams) => {
  const queryParams = convertToSearchParams({
    ...spoonBasicParams,
    query: params.query ?? "",
  });

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
