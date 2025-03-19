export type CartItem = {
  courseDescription: string;
  courseDuration: number;
  courseTitle: string;
  courseUrl: string;
  id: string;
  source: string;
  status: string;
  vendorCourseId: string;
  vendorId: string;
  vendorName: string;
  __typename: string;
  averageRating: number;
  totalReviews: number;
};

export type OrderSummaryProps = {
  cart: CartItem[];
  targetType: string;
  checkingOut: boolean;
  handleSubmitCart: () => void;
  handleRemoveFromCart: (item: CartItem) => void;
};
