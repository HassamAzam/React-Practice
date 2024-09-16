import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormGroup,
    Checkbox,
    TextField,
  } from "@mui/material";
  
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
  
  interface QuestionRendererProps {
    questionConfig: QuestionConfig;
    answer: string | string[];
    setAnswer: (value: string | string[]) => void;
  }
  
  const QuestionRenderer = ({
    questionConfig,
    answer,
    setAnswer,
  }: QuestionRendererProps) => {
    switch (questionConfig.type) {
      case 'radio':
        return (
          <FormControl component="fieldset">
            <RadioGroup
              aria-label={questionConfig.question}
              name={questionConfig.key}
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {questionConfig.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'checkbox':
        return (
          <FormControl component="fieldset">
            <FormGroup>
              {questionConfig.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={(answer as string[]).includes(option.value)}
                      onChange={(e) => {
                        const { name, checked } = e.target;
                        const newAnswers = checked
                          ? [...(answer as string[]), name]
                          : (answer as string[]).filter((ans) => ans !== name);
  
                        setAnswer(newAnswers);
                      }}
                      name={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
      case 'input':
        return (
          <TextField
            multiline
            rows={4}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
          />
        );
      default:
        return null;
    }
  };
  
  export default QuestionRenderer;
  