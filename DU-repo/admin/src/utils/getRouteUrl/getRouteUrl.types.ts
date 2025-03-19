export type QueryArgs =
  | string[][]
  | Record<string, string | string[] | boolean | number>
  | string
  | URLSearchParams;
