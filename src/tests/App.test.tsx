import { render } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("renders the header correctly", () => {
    const { getByText } = render(<App />);
    const headerElement = getByText("Final task");
    expect(headerElement).toBeInTheDocument();
  });
});
