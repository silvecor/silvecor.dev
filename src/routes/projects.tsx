import type { Route } from './+types/projects';
import { Metadata } from 'src/components/metadata';
import s from '@/layouts/projects.module.css';
import { getProjects } from '@/lib/posts.server';

export async function loader() {
  return getProjects();
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const projects = loaderData;

  return (
    <div className={s.projects}>
      <Metadata title='Projects' slugs={['projects']} />
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
