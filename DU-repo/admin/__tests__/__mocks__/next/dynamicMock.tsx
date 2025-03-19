/* eslint-disable @typescript-eslint/no-explicit-any */
export default function dynamic(
  importFn: () => Promise<any>,
  options?: { loading?: React.ComponentType<any>; ssr?: boolean }
) {
  // This calls the import function immediately (so your test sees the component right away).
  // The risk here is that I added `[0]` for named exports, and this might break for some tests.
  // BUT, we should be good since we have a general rule to not have more than one named export.
  // We'll have to cross that road when we get there.
  let ImportedComponent: React.ComponentType<any> | null = null;
  importFn().then(mod => {
    ImportedComponent = mod.default || Object.values(mod)[0];
  });

  return function DynamicMock(props: any) {
    if (!ImportedComponent) {
      const Loading = options?.loading;
      return Loading ? <Loading /> : null;
    }
    return <ImportedComponent {...props} />;
  };
}
