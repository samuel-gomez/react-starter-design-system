import { render, screen } from '@testing-library/react';
import { type TEnvironmentState } from 'App/EnvironmentProvider';
import { createContext } from 'react';
import { act } from 'react-dom/test-utils';
import AppWithEnvironment, { AppContainer } from '../App.container';

describe('AppWithEnvironment', () => {
  it('Should render AppWithEnvironment with loader for environment when environment is not loaded', () => {
    act(() => {
      render(<AppWithEnvironment />);
    });

    expect(screen.getByText("Chargement de l'environnement...")).toBeDefined();
  });
});

describe('AppContainer', () => {
  it('Should render AppContainer with loader for environment when environment is not loaded', () => {
    render(<AppContainer />);
    expect(screen.getByText("Chargement de l'environnement...")).toBeDefined();
  });

  it('Should render AppContainer with loader page when environment is loaded', () => {
    const EnvironmentContextLoaded = createContext<TEnvironmentState>({
      environment: {
        apiUrl: {
          base: 'https://react-starter-api.vercel.app/api/',
          github: 'https://raw.githubusercontent.com/',
        },
        fetchConfig: {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      },
    });
    render(<AppContainer EnvironmentContextObj={EnvironmentContextLoaded} />);
    expect(screen.getByText('Chargement de la page...')).toBeDefined();
  });
});
