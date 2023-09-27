import "@testing-library/jest-dom";
import App from "../src/App";
import { render, screen } from "@testing-library/react";

describe("App Component", () => {

  test("renders clear button", () => {
    render(<App />);
    const clear = screen.getByTestId("clear-btn");
    expect(clear).toBeInTheDocument();
  });

  test("renders Typeahead component", () => {
    render(<App />);
    const typeahead = screen.getByTestId("typeahead");
    expect(typeahead).toBeInTheDocument();
  });

  test("renders UsaMap component", () => {
    render(<App />);
    const typeahead = screen.getByTestId("usamap");
    expect(typeahead).toBeInTheDocument();
  });

});
