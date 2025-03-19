const jsxMock = () => '';

const divWithProps = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

module.exports = {
  grid: jsxMock,
  vstack: jsxMock,
  hstack: jsxMock,
  avatar: jsxMock,
  Flex: divWithProps,
  Grid: divWithProps,
  GridItem: divWithProps,
  Box: divWithProps,
  HStack: divWithProps,
  VStack: divWithProps
};
