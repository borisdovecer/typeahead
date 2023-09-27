import {Dispatch, SetStateAction} from "react";

/**
 * Represents the structure of the response returned by the names API.
 */
export interface NameResponse {
  id: number;
  name: string;
}

/**
 * Represents the return type of the `useFetchNamesWithCache` hook.
 */
export interface FetchHookReturn {
  suggestions: NameResponse[];
  fetchData: () => void;
}

/**
 * Props structure for the Typeahead component.
 */
export interface TypeaheadProps {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}
