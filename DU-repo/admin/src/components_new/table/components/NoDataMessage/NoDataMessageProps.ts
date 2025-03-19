export type NoDataMessageProps = {
  message: string;
  spinner?: boolean;
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
