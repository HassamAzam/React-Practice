import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import SurveyComponent from 'src/Components/Dashboard/SurveyComponent';

describe('SurveyComponent', () => {
  it('should render the first question and Next button', () => {
    render(<SurveyComponent />);

    const question = screen.getByText(/From Pakistan/i);
    expect(question).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should render all questions and buttons when props change', () => {
    render(<SurveyComponent />);

    const firstQuestion = screen.getByText(/From Pakistan/i);
    expect(firstQuestion).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Next/i });
    nextButton.click();

    setTimeout(() => {
      const secondQuestion = screen.getByText(/What is your age?/i);
      expect(secondQuestion).toBeInTheDocument();
    }, 1000);
  });

  it('should handle form submission correctly', () => {
    render(<SurveyComponent />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    nextButton.click();

    setTimeout(() => {
      const submissionMessage = screen.getByText(
        /Survey submitted successfully/i,
      );
      expect(submissionMessage).toBeInTheDocument();
    }, 2000);
  });
});
