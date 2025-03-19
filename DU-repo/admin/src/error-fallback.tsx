import { Button, Image } from '@digital-u/digital-ui';
import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import * as React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { signOut } = useSignOut();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '10vh'
        }}
      >
        <Image
          src="/admin/images/digitalu-logo.svg"
          style={{ width: '50px', marginBottom: '30px' }}
          alt="Digital University Logo"
        />
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>
          An unexpected problem has occurred. If you continue to have problems,
          please contact our support team. Thank you for your patience.
        </p>
        <p
          style={{
            padding: '20px',
            backgroundColor: '#f7f7f7',
            borderRadius: '10px',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}
        >
          {error?.message}
        </p>
        <div
          style={{
            display: 'flex'
          }}
        >
          <Button style={{ marginRight: '10px' }} onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => {
              window.location.href = '/admin';
            }}
          >
            Return to Dashboard
          </Button>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
