type Choice = {
  choice: string;
  correct: boolean;
};

type Question = {
  name?: string;
  type?: string;
  choice?: Choice[];
};

export type EditQuestionProps = {
  goBackRoute?: string;
  goBackText?: string;
  questionId: string;
  questionIndex: number;
  questions?: Question[];
  disabled?: boolean;
  onSave: (obj: Record<string, unknown>) => void;
};
