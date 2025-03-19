'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@cerberus/icons';
import { Button } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';

export const BackArrowButton = () => {
  const router = useRouter();

  return (
    <div className={cx(css({ mb: 8 }))}>
      <Button
        palette="secondaryAction"
        usage="ghost"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
          Back
        </span>
      </Button>
    </div>
  );
};
