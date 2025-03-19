// if you make this a client component, you will need to update the `process.env` references below.
import type { ReactNode } from 'react';
import { Poppins, Recursive } from 'next/font/google';
import ClientSideProviders from './components/providers/ClientSideProviders';
import type { Metadata } from 'next';
import GlobalLayout from './components/GlobalLayout';
import { cx } from '@cerberus/styled-system/css';
import '../styles/globals.cerberus.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { cookies } from 'next/headers';

type RootLayoutProps = {
  children: ReactNode;
};

const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});
const recursive = Recursive({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-recursive'
});

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Digital University',
    default: 'Digital University'
  },
  icons: {
    icon: '/admin/images/digitalu-logo.svg'
  },
  openGraph: {
    title: 'Digital University',
    siteName: 'Digital University',
    type: 'website',
    images: [
      {
        url: 'https://digitalu.af.mil/images/digitalu-meta.png',
        alt: 'Digital University'
      }
    ],
    description: `From design and development to analytics and project management, there's a transformative and rewarding learning path for everyone at Digital University.`
  }
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  // this is a server component, so we have access to process.env
  const MATOMO_URL = process.env.MATOMO_URL || '';
  const MATOMO_TRUSTED_HOST = process.env.MATOMO_TRUSTED_HOST || '';
  const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID || '';
  const matomoKeys = {
    siteId: MATOMO_SITE_ID,
    trustedHost: MATOMO_TRUSTED_HOST,
    url: MATOMO_URL
  };

  const cookieStore = await cookies();
  const pandaTheme = cookieStore.get('pandaTheme')?.value || 'cerberus';
  const pandaColorMode = cookieStore.get('pandaColorMode')?.value || 'light';

  return (
    <html
      lang="en"
      data-panda-theme={pandaTheme}
      data-color-mode={pandaColorMode}
      className={cx(poppins.variable, recursive.variable)}
    >
      <body>
        <ClientSideProviders matomoKeys={matomoKeys}>
          <GlobalLayout>{children}</GlobalLayout>
        </ClientSideProviders>
      </body>
    </html>
  );
};

export default RootLayout;
