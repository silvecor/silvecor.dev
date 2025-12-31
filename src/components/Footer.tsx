import { Icon } from './Icon';
import { Link } from './Link';
import { Separator } from './Separator';

export const Footer = () => {
  return (
    <footer className='flex items-center py-6'>
      <div className='flex flex-wrap justify-center text-sm text-muted-fg'>
        <span className='lt-md:mb-1'>
          &copy; 2023-2026 hellolin
        </span>
        <Separator className='mx-2 hidden sm:block' orientation='vertical' size='sm' />
        <div className='block w-full sm:hidden' />
        <div className='flex items-center gap-1'>
          <Icon label='Next.js Version' className='i-simple-icons-nextdotjs size-3.5' />
          <code>v{process.env.NEXT_VERSION}</code>
        </div>
        <Separator className='mx-2' orientation='vertical' size='sm' />
        <div className='flex items-center gap-1'>
          <Icon label='Git Commit' className='i-lucide-git-branch size-3.5' />
          <Link href={process.env.GIT_COMMIT_URL} external variant='muted'>
            <code>
              {process.env.GIT_COMMIT_HASH} @ {process.env.GIT_BRANCH}
            </code>
          </Link>
        </div>
      </div>
    </footer>
  );
};
