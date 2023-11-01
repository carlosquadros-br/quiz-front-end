export interface Question {
  id: number;
  question_text: string;
  choices: [
    {
      id: number;
      text: string;
      is_correct: boolean;
    }
  ];
  choice_selected?: {
    id: number;
    text: string;
    is_correct: boolean;
  };
}
