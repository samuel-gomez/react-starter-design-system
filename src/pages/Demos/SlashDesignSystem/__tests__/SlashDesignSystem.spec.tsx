import { configure, screen } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_MAIN } from 'shared/testsUtils/constants';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurNonConnecte, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';

import SlashDesignSystem from '../SlashDesignSystem';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/SlashDesignSystem/SlashDesignSystem.feature');

defineFeature(feature, test => {
  const renderPage = async () => {
    render(<SlashDesignSystem />);
    expect(await screen.findByText(/Profil/)).toBeInTheDocument();
  };

  test('Affichage de la page SlashDesignSystem', ({ given, when, then }) => {
    given("J'accède à la page SlashDesignSystem", renderPage);
    JeSuisUnUtilisateurNonConnecte(when);
    UnTitreEstVisible(then, 2, SCOPE_MAIN);
  });
});
