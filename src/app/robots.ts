import type { MetadataRoute } from 'next';

const Robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
};
export default Robots;
