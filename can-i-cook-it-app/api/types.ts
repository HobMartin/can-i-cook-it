export interface getReceiptParams {
  q?: string;
  query?: string;
  userId?: string;
  size?: number;
  page?: number;
}

export type Complexity = "diff" | "medium" | "hard";

export interface Step {
  id: string;
  number: number;
  description: string;
  image: string | null;
}

export interface Ingredient {
  id: string;
  name: string;
}

export interface Receipt {
  id: string;
  created_at: string;
  receipt_name: string;
  time_to_cook: string;
  complexity: Complexity;
  created_by: string | null;
  step: Step[];
  ingredient: Ingredient[];
  image: string;
  rating_receipt: {
    value: number;
  }[];
}

export interface ReceiptsResponse {
  data: Receipt[];
  total: number;
  page: number;
  size: number;
}
