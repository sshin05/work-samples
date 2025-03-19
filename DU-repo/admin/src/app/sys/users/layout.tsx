import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Manage Users | Digital University',
    default: 'Manage Users'
  }
};

const MMPLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MMPLayout;
