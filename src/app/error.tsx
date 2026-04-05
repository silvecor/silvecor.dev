'use client';

import NextLink from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className='flex flex-col items-center justify-center gap-4'>
      <div className='text-center'>
        <h2 className='mb-3 text-2xl font-medium'>Runtime Error</h2>
        <p className='text-base leading-8'>Open the console to see details.</p>
      </div>
      <Button className='[&:hover_.icon]:transform-rotate-180' variant='outline' onClick={reset}>
        <Icon className='i-lucide-refresh-cw transition-transform duration-400' />
        Try again
      </Button>
      <Button className='[&:hover_.icon]:translate-x--2px' variant='outline' asChild>
        <NextLink href='/'>
          <Icon className='i-lucide-arrow-left transition-transform' />
          Go back home
        </NextLink>
      </Button>
    </section>
  );
};
export default Error;
