'use client';
import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import { routeGenerators, getRouteUrl } from '@/utils/getRouteUrl';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { useRouter } from 'next/navigation';

interface ParentLevelErrorBoundaryProps {
  children: React.ReactNode;
  error: Error;
  reset: () => void;
}
const ParentLevelErrorBoundary = ({
  children,
  reset,
  error
}: ParentLevelErrorBoundaryProps) => {
  const router = useRouter();
  const { signOut } = useSignOut();

  return (
    <div className={vstack()}>
      <div
        className={hstack({
          justifyContent: 'center'
        })}
      >
        <div
          className={vstack({
            maxWidth: '40vh',
            alignItems: 'center',
            pt: '10vh'
          })}
        >
          <img
            src="/admin/images/digitalu-logo.svg"
            className={css({ width: '12', mb: '7' })}
            alt="Digital University Logo"
          />
          <p className={css({ textAlign: 'center', mb: '7' })}>
            An unexpected problem has occurred. If you continue to have
            problems, please contact our support team. Thank you for your
            patience.
          </p>
          <p
            className={css({
              padding: '5',
              backgroundColor: 'page.surface.200',
              borderRadius: '2.5',
              marginBottom: '7',
              fontWeight: 'bold'
            })}
          >
            {error?.message}
          </p>
          <div className={hstack()}>
            <Button
              onClick={() => reset()}
              disabled={false}
              palette="action"
              shape="sharp"
              usage="filled"
              className={css({ mr: '2.5' })}
            >
              Try Again
            </Button>
            <Button
              onClick={() =>
                router.push(getRouteUrl(routeGenerators.AdminHome()))
              }
              palette="action"
              shape="sharp"
              usage="filled"
              className={css({ marginRight: '2.5' })}
            >
              Return to Dashboard
            </Button>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ParentLevelErrorBoundary;
