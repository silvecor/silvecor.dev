import 'uno.css';
import '@/styles/index.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      { children }
    </div>
  );
}

export const getConfig = async () => ({ render: 'static' });
