import { render } from '@testing-library/react';
import EnvironmentProvider from 'App/EnvironmentProvider';
import { useContext } from 'react';
import { MOCK_API_URL } from 'shared/testsUtils';
import FetchProvider, { FetchContext, type TFetchCustom } from '../FetchProvider';

type TBase = {
  fetchCustom?: TFetchCustom;
};

const Base = ({ fetchCustom }: TBase) => <div>{fetchCustom ? 'haveFetchCustom' : 'notHaveFetchCustom'}</div>;

const BaseWithFetch = () => {
  const fetchProps = useContext(FetchContext);
  return <Base {...fetchProps} />;
};

describe('FetchProvider', () => {
  it('Should Base have fetchCustom props when render FetchProvider with required props', async () => {
    const useEnvFn = vi.fn().mockReturnValueOnce({
      envState: {
        environment: {
          apiUrl: MOCK_API_URL,
          fetchConfig: {},
        },
      },
    });
    const { getByText } = render(
      <EnvironmentProvider useEnvFn={useEnvFn}>
        <FetchProvider>
          <BaseWithFetch />
        </FetchProvider>
      </EnvironmentProvider>,
    );

    expect(getByText(/haveFetchCustom/)).toBeInTheDocument();
  });

  it('Should setFetchCustomFn to have been called with apiUrl = {} when environment is null', () => {
    const useEnvFn = vi.fn().mockReturnValueOnce({
      envState: {
        environment: null,
      },
    });

    const setFetchCustomFn = vi.fn();
    render(
      <EnvironmentProvider useEnvFn={useEnvFn}>
        <FetchProvider setFetchCustomFn={setFetchCustomFn}>
          <BaseWithFetch />
        </FetchProvider>
      </EnvironmentProvider>,
    );

    expect(setFetchCustomFn).toHaveBeenCalledWith({ apiUrl: {}, fetchAuthConfig: {} });
  });
});
