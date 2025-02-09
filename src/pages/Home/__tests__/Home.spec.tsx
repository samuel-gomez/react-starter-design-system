import { configure, screen } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnTexteEstVisible, UnTitreEstVisible, expectTitle } from 'shared/testsUtils/sharedScenarios';

import Home from '../Home';

configure({ defaultHidden: true });

const feature = loadFeature('features/Home/Home.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<Home />, {}, { role });
    /* expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument(); */
  };

  test("Affichage de la page d'accueil", ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page accueil", renderPage);
    UnTitreEstVisible(then, 2);
    UnTitreEstVisible(and, 2);
    UnTexteEstVisible(and);
    UnTitreEstVisible(and, 2);
    UnTexteEstVisible(and);
    UnTitreEstVisible(and, 2);
    UnTexteEstVisible(and);
    UnTitreEstVisible(and, 2);
    UnTexteEstVisible(and);
    UnTitreEstVisible(and, 2);
    UnTexteEstVisible(and);
    and('la liste des packages est visible', packages => {
      packages.forEach(({ titleItem, linkItem }: { titleItem: string; linkItem: string; imageItem: string }) => {
        expectTitle({ name: titleItem, level: 3 });
        expect(screen.getByTitle(`Voir ${titleItem}`)).toHaveAttribute('href', linkItem);
      });
    });
  });
});
