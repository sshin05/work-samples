'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

export const RefreshPageButton = () => {
  const router = useRouter();

  return (
    <Button
      usage="outlined"
      shape="rounded"
      onClick={() => router.refresh()}
      className={css({ w: 80 })}
    >
      Refresh page
    </Button>
  );
};
