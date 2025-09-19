type EnvsTypes = {
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_API_URL: string;
};

export const getEnvs = () => {
  const { ...envs } = import.meta.env as EnvsTypes;

  return {
    ...envs,
  };
};
