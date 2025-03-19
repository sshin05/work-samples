export type imageSizes = 's' | 'm' | 'l' | 'xl';

export const iconSizes = {
  s: '20px',
  m: '60px',
  l: '100px',
  xl: '150px'
};

export type VendorOptions =
  | 'Cloud Academy'
  | 'Coursera'
  | 'DataCamp'
  | 'Dataiku'
  | 'HackEDU'
  | 'Jupyter Notebook'
  | 'Pluralsight'
  | 'Udacity'
  | 'Udemy'
  | 'Workera'
  | string;

export type TextSize =
  | 'label'
  | 'subheading'
  | 'compact'
  | 'p'
  | 'h6'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1';

export type FontWeight =
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold';

export type TextVariant = 'dark' | 'light' | 'gray' | 'semiDark';

export type TextAlign =
  | 'left'
  | 'center'
  | 'right'
  | 'justify'
  | 'initial'
  | 'inherit';