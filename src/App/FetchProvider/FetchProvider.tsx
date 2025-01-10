import type { QueryKey } from '@tanstack/react-query';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { setFetchCustom } from './FetchProvider.helpers';

export type TFetchCustom = <T>(queryKey: QueryKey) => Promise<T>;

export type FetchContextType = {
  fetchCustom: TFetchCustom;
};

export const FetchContext = createContext<FetchContextType | object>({});
FetchContext.displayName = 'FetchContext';

export type TFetchProvider = {
  children: ReactNode;
  setFetchCustomFn?: typeof setFetchCustom;
};

const FetchProvider = ({ children, setFetchCustomFn = setFetchCustom }: TFetchProvider) => {
  const { environment } = useContext(EnvironmentContext);

  const fetchCustom = setFetchCustomFn({ apiUrl: environment?.apiUrl ?? {}, fetchAuthConfig: environment?.fetchConfig ?? {} });
  const value = useMemo(() => ({ fetchCustom }), [fetchCustom]);

  return <FetchContext.Provider value={value}>{children}</FetchContext.Provider>;
};
export default FetchProvider;
