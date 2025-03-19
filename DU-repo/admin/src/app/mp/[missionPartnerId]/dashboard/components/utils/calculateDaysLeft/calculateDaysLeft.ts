export const calculateDaysLeft = (endDate: string) => {
  const today = new Date().getTime();
  const end = new Date(endDate).getTime();
  const timeDiff = end - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const normalizedDaysLeft = daysLeft <= 0 ? 0 : daysLeft;

  return normalizedDaysLeft;
};
