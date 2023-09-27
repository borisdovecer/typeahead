import { AxiosResponse } from "axios";
import axios from "../config/axios.ts";
import { NameResponse } from "../global/interfaces.ts";

/**
 * Fetches names based on the search query.
 *
 * @param query - The search query string.
 * @param limit - The maximum number of results to return. Default is 10.
 * @returns - A Promise resolving to an array of names.
 */
export const fetchNames = async (query: string, limit: number = 10): Promise<NameResponse[]> => {
  try {
    const response: AxiosResponse<NameResponse[]> = await axios.get(`/names/?search=${query}&limit=${limit}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching names:", error);
    return [];
  }
};
