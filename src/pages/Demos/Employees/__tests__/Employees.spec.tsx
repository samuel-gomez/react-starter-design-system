import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurNonConnecte,
  LaPageContientUnTableau,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant,
} from 'shared/testsUtils/sharedScenarios';
import Employees from '../Employees';

const feature = loadFeature('features/Demos/Employees/Employees.feature');
const tableItemsType = 'collaborateurs';

defineFeature(feature, test => {
  test('Affichage de la liste des collaborateurs', ({ given, when, then, and }) => {
    given("J'accède à la page des collaborateurs", async () => {
      render(<Employees />);
      expect(await screen.findByText(/Profil/)).toBeInTheDocument();
    });

    JeSuisUnUtilisateurNonConnecte(when);

    LaPageContientUnTableau(then, 'la page contient un tableau répertoriant la liste des collaborateurs', tableItemsType);

    LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant(
      and,
      /^le tableau présente des entêtes de colonnes dans l’ordre suivant : "(.*)", "(.*)", "(.*)"$/,
      tableItemsType,
    );

    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      /^le tableau contient (\d+) lignes avec (\d+) colonnes dans l'ordre suivant :$/,
      tableItemsType,
    );
  });
});
