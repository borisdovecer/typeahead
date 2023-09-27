import "@testing-library/jest-dom";
import axios from "../src/config/axios";
import { fetchNames } from "../src/services/api";
import { NameResponse } from "../src/global/interfaces";

// Mocking axios request
jest.mock("../src/config/axios.ts");

describe("fetchNames", () => {

  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
  });

  it("should fetch names successfully", async () => {
    const mockData: NameResponse[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ];

    const mockedAxiosResponse: any = {
      data: mockData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {}
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockedAxiosResponse);

    const result = await fetchNames("Al");
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("/names/?search=Al&limit=10");
  });

  it("should handle error gracefully", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("An error occurred"));

    const result = await fetchNames("Al");
    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith("/names/?search=Al&limit=10");
  });

});
