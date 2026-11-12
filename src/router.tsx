import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollToTopSelectors: ['#scrollable-area'],
    scrollRestoration: true,
    scrollRestorationBehavior: 'instant',
    notFoundMode: 'root',
  });

  return router;
}
