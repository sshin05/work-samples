import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | System | Digital University`,
    default: 'System'
  }
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default Layout;
