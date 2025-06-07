import { ANILIST_TOKEN } from '@env';

export const getEnvVar = (key: string): string => {
  switch (key) {
    case 'ANILIST_TOKEN':
      return ANILIST_TOKEN;
    default:
      throw new Error(`Environment variable ${key} is not defined`);
  }
};

export { ANILIST_TOKEN };
