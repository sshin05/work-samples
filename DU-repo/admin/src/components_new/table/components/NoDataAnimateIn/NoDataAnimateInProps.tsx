export type NoDataAnimateInProps = {
  message: string;
  spinner?: boolean;
  delay?: string;
} & ( // buttonText and cta are optional, but if one is provided, both must be provided
  | {
      buttonText?: never;
      cta?: never;
    }
  | {
      buttonText: string;
      cta: () => void;
    }
);
