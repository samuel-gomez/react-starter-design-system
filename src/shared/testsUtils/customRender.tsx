import { render, renderHook, type RenderOptions } from '@testing-library/react';
import EnvironmentProvider from 'App/EnvironmentProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import QueryProvider from 'App/QueryProvider';
import { type ReactElement, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import MOCK_API_URL from './constants';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string | boolean | null | number | Record<string, number | string>[];
};

const MockProviders =
  ({
    route = '/',
    queryData,
    headers = {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const useEnvFn = vi.fn().mockReturnValueOnce({
      envState: {
        environment: {
          apiUrl: MOCK_API_URL,
          fetchConfig: {
            headers,
          },
        },
      },
    });

    const queriesOptions = {
      retry: false,
      ...(queryData ? { queryFn: () => queryData } : {}),
    };

    return (
      <EnvironmentProvider useEnvFn={useEnvFn}>
        <FetchProvider>
          <QueryProvider queriesOptions={queriesOptions}>
            <NotificationProvider>
              <MemoryRouter initialEntries={[`${route}`]}>{children}</MemoryRouter>
            </NotificationProvider>
          </QueryProvider>
        </FetchProvider>
      </EnvironmentProvider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, testMock: TMockProvider = { role: '' }) =>
  render(ui, { wrapper: MockProviders(testMock), ...options });

type TcustomRenderHook = (testMock?: TMockProvider) => typeof renderHook;

const customRenderHook: TcustomRenderHook = testMock => (hook, options) => renderHook(hook, { wrapper: MockProviders(testMock ?? {}), ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { axe } from 'jest-axe';

// override render method
export { customRenderHook, customRender as render };
