import type { Metadata } from 'next';
import NextLink from 'next/link';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFound = () => {
  return (
    <section className='flex flex-col items-center justify-center gap-8'>
      <div className='text-center'>
        <h2 className='mb-3 text-2xl font-medium'>404 - Page Not Found</h2>
        <p className='text-base leading-8'>How did we get here?</p>
      </div>
      <Button className='[&:hover_.icon]:translate-x--2px' variant='outline' asChild>
        <NextLink href='/'>
          <Icon className='i-lucide-arrow-left transition-transform' />
          Go back home
        </NextLink>
      </Button>
    </section>
  );
};
export default NotFound;
