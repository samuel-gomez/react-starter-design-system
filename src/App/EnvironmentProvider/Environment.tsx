import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export type TEnvironment = {
  apiUrl: Record<string, string>;
  fetchConfig: object;
};

export type TEnvironmentState = {
  environment?: null | TEnvironment;
  error?: unknown;
};

const initState: TEnvironmentState = {
  environment: null,
  error: null,
};

export const EnvironmentContext = createContext<TEnvironmentState>(initState);
EnvironmentContext.displayName = 'EnvironmentContext';

export const getFileEnv = (nodeEnv = import.meta.env.MODE) => `environment.${nodeEnv}.json`;

type TfetchEnv = {
  setEnvState: Dispatch<SetStateAction<TEnvironmentState>>;
  signal: AbortSignal;
  fetchFn?: typeof fetch;
  getFileEnvFn?: typeof getFileEnv;
};

export const fetchEnv = async ({ setEnvState, signal, fetchFn = fetch, getFileEnvFn = getFileEnv }: TfetchEnv) => {
  const fileName = getFileEnvFn();
  try {
    const response = await fetchFn(`/${fileName}`, { signal });
    const environment = await response?.json();
    setEnvState({ environment });
  } catch (error) {
    setEnvState({ error, environment: null });
  }
};

/**
 * Hook to setState environment
 */
export const useEnv = (fetchEnvFn = fetchEnv, initStateCt = initState) => {
  const [envState, setEnvState] = useState(initStateCt);
  useEffect(() => {
    const abortController = new AbortController();
    if (envState.environment === null) {
      fetchEnvFn({ setEnvState, signal: abortController.signal });
    }
    return () => abortController.abort();
  }, [envState.environment, fetchEnvFn]);

  return { envState, setEnvState };
};

/**
 * Component wrapper to add environment context
 * @param {Component} children
 */
const EnvironmentProvider = ({ children, useEnvFn = useEnv }: { children: ReactNode; useEnvFn?: typeof useEnv }) => {
  const { envState } = useEnvFn();

  return <EnvironmentContext.Provider value={envState}>{children}</EnvironmentContext.Provider>;
};

export default EnvironmentProvider;
