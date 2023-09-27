import { useState } from "react";
import { useCache } from "./useCache.ts";
import { fetchNames } from "../services/api.ts";
import { FetchHookReturn, NameResponse } from "../global/interfaces.ts";

/**
 * Custom hook that fetches names based on a search query, with caching.
 *
 * @param query - The search query string.
 * @param limit - The maximum number of results to return. Default is 10.
 *
 * @returns An object containing an array of suggested names and a function to initiate fetching.
 */
export const useFetchNamesWithCache = (query: string, limit: number = 10): FetchHookReturn => {
  const [suggestions, setSuggestions] = useState<NameResponse[]>([]);
  const cache = useCache<NameResponse[]>();

  /**
   * Fetches the names from the API or retrieves them from the cache if already fetched.
   *
   * The function first checks the cache with the current query.
   * If the data is present in the cache, it sets the suggestions state with the cached data.
   * Otherwise, it fetches the names from the API and then caches the result.
   *
   * @see fetchNames
   */
  const fetchData = (): void => {
    const cachedData: NameResponse[] | undefined = cache.get(query);
    if (cachedData) {
      setSuggestions(cachedData);
      return;
    }

    fetchNames(query, limit).then((data: NameResponse[]): void => {
      setSuggestions(data);
      cache.set(query, data);
    });
  };

  return { suggestions, fetchData };
};
