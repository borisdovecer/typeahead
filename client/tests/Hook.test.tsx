import "@testing-library/jest-dom";
import { useCache } from "../src/hooks/useCache";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useCache hook", () => {

  it("should set and get values correctly", () => {
    const { result } = renderHook(() => useCache<number>());

    act(() => {
      result.current.set("key1", 10);
    });

    const value = result.current.get("key1");
    expect(value).toBe(10);
  });

  it("should overwrite values with the same key", () => {
    const { result } = renderHook(() => useCache<number>());

    act(() => {
      result.current.set("key1", 10);
      result.current.set("key1", 20);
    });

    const value = result.current.get("key1");
    expect(value).toBe(20);
  });

  it("should return undefined for non-existent keys", () => {
    const { result } = renderHook(() => useCache<number>());
    const value = result.current.get("key1");
    expect(value).toBeUndefined();
  });
});
