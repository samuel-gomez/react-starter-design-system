import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTexteEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import BadgePage from '../Badge';

const feature = loadFeature('features/Demos/Badge/Badge.feature');

defineFeature(feature, test => {
  let role: string;

  test('Affichage du playground Badge', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when('J’accède à la page démo du Badge', async () => {
      render(<BadgePage />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });
});
