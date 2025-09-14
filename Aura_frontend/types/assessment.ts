export type Option = {
    label: string;
    value: number;
};

export type OptionProps = {
  option: { label: string; value: number };
  isSelected: boolean;
  onSelect: () => void;
};

export type Question = {
    id: string;
    question: string;
    type: "PHQ" | "GAD" | "DASS";
    options: Option[]; 
};

export type Answer = {
    id: string;
    type: string;
    answer: number;
};