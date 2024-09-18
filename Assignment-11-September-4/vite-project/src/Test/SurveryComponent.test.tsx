import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

import SurveyComponent from "../Components/Dashboard/SurveyComponent";

describe("SurveyComponent", () => {
  it("should render the first question and Next button", () => {
    render(<SurveyComponent />);

    const question = screen.getByText(/From Pakistan/i);
    expect(question).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });
});
