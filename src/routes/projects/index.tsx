import { createFileRoute } from '@tanstack/react-router';
import { getProjects } from '@/lib/posts';
import s from './index.module.css';

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
  loader: () => getProjects(),
});

function RouteComponent() {
  const projects = Route.useLoaderData();

  return (
    <div className={s.projects}>
      <h2 className={s.heading}>Projects</h2>
      <ul className={s.container}>
        {projects.map(item => (
          <li key={item.name}>
            <a className={s.project} href={item.link} target='_blank' rel='nofollow noreferrer noopener'>
              <h3 className={s.projectTitle}>{item.name}</h3>
              <div className={s.projectDesc}>{item.description}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
