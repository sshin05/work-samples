export const getIsCartEmpty = (cart): boolean => {
  const { loading, error, data } = cart;

  if (loading) {
    return false;
  }

  if (error) {
    return true;
  }

  const isEmpty = !data || data.marketplaceOrderItems?.length === 0;

  return isEmpty;
};
