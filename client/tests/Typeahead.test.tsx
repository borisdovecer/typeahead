import "@testing-library/jest-dom";
import { Typeahead } from "../src/components";
import * as Hooks from "../src/hooks/useFetchNamesWithCache";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSuggestions = [
  { id: 1, name: "Alabama" },
  { id: 2, name: "Alaska" }
];

jest.mock("../src/hooks/useFetchNamesWithCache", () => ({
  useFetchNamesWithCache: jest.fn(() => ({
    suggestions: [],
    fetchData: jest.fn()
  }))
}));

describe("Typeahead Component", () => {
  beforeEach(() => {
    (Hooks.useFetchNamesWithCache as jest.Mock).mockReturnValue({
      suggestions: mockSuggestions,
      fetchData: jest.fn()
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders Typeahead component and its input", () => {
    render(<Typeahead selected={[]} setSelected={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("changes input value on type", () => {
    render(<Typeahead selected={[]} setSelected={() => {}} />);
    const input:any = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Alabama" } });
    expect(input.value).toBe("Alabama");
  });

  test("displays suggestions on input", () => {
    render(<Typeahead selected={[]} setSelected={() => {}} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "A" } });
    const suggestion = screen.getByText("Alabama");
    expect(suggestion).toBeInTheDocument();
  });

  test("clears input and adds selected suggestion on suggestion click", () => {
    const setSelected = jest.fn();
    render(<Typeahead selected={[]} setSelected={setSelected} />);
    const input:any = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "A" } });
    expect(input.value).toBe("A"); // Ensure input is 'A' before clicking suggestion

    const suggestion = screen.getByText("Alabama");
    fireEvent.click(suggestion);

    expect(input.value).toBe(""); // Check if input is cleared after clicking a suggestion
  });
});
