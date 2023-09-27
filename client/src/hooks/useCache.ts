import { useState } from "react";

/**
 * Custom hook to create an in-memory cache.
 * This hook provides methods to get and set values in the cache.
 *
 * @template T The type of data that will be stored in the cache.
 *
 * @returns - An object containing functions to interact with the cache.
 */
export const useCache = <T>() => {
  const [cache, setCache] = useState<Record<string, T>>({});

  /**
   * Retrieves a value from the cache.
   *
   * @param key - The key associated with the value to be retrieved.
   *
   * @returns The cached value or undefined if the key does not exist.
   */
  const get = (key: string): T | undefined => {
    return cache[key];
  };

  /**
   * Adds or updates a value in the cache.
   *
   * @param key - The key associated with the value.
   * @param value - The value to be cached.
   */
  const set = (key: string, value: T): void => {
    setCache((prevCache: Record<string, T>) => ({ ...prevCache, [key]: value }));
  };

  return { get, set };
};
