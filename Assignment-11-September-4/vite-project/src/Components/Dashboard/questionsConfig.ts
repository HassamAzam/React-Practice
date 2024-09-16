interface Option {
  value: string;
  label: string;
}

type QuestionType = 'radio' | 'checkbox' | 'input';

interface QuestionConfig {
  type: QuestionType;
  question: string;
  options?: Option[];
  key: string;
}

export const questionsConfig: QuestionConfig[] = [
  {
    type: 'radio',
    question: 'Are you from Pakistan?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    key: 'question1',
  },
  {
    type: 'checkbox',
    question: 'Select the countries you have visited:',
    options: [
      { value: 'USA', label: 'USA' },
      { value: 'Canada', label: 'Canada' },
      { value: 'France', label: 'France' },
      { value: 'Belgium', label: 'Belgium' },
    ],
    key: 'question2',
  },
  {
    type: 'input',
    question: 'How would you describe your reason to stay?',
    key: 'question3',
  },
  {
    type: 'checkbox',
    question: 'Select the countries you have visited:',
    options: [
      { value: 'USA', label: 'USA' },
      { value: 'Canada', label: 'Canada' },
      { value: 'France', label: 'France' },
      { value: 'Belgium', label: 'Belgium' },
    ],
    key: 'question4',
  },
];
