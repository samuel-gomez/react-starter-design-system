import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from 'shared/testsUtils/customRender';
import { serverUsePost } from 'shared/testsUtils/msw';
import {
  JeCliqueSurLeBouton,
  JeSaisieDansLeChamp,
  JeSelectionneUneValeurSurleChamp,
  JeSuisUnUtilisateurNonConnecte,
  UnBoutonEstVisible,
  UnChampListeDeroulanteEstVisible,
  UnChampTextEstVisible,
  UnChampTextEstVisibleAvecLaValeur,
  UnTexteEstVisible,
  UnTitreEstVisible,
  UneAlertErrorContenantLeMessage,
  UneAlertSuccessContenantLeMessage,
} from 'shared/testsUtils/sharedScenarios';
import MembersNew from '..';

const feature = loadFeature('features/Demos/MembersNew/MembersNew.feature');

defineFeature(feature, test => {
  test("Validation du formulaire d'ajout de membre en erreur", ({ given, when, then, and }) => {
    given("J'accède à la page ajout de membre", async () => {
      render(<MembersNew />);
      expect(await screen.findByText(/Profil/)).toBeInTheDocument();
    });

    JeSuisUnUtilisateurNonConnecte(when);

    UnTitreEstVisible(and);
    UnTitreEstVisible(and, 2);
    UnChampListeDeroulanteEstVisible(and);
    UnChampTextEstVisible(and);
    UnChampTextEstVisible(and);
    UnBoutonEstVisible(and);
    UnBoutonEstVisible(and);
    JeCliqueSurLeBouton(when);
    UnTexteEstVisible(then);
    UnTexteEstVisible(and);
    UnTexteEstVisible(and);
  });

  test("Saisie valide du formulaire d'ajout de membre", ({ given, when, and }) => {
    given("J'accède à la page ajout de membre", async () => {
      render(<MembersNew />);
      expect(await screen.findByText(/Profil/)).toBeInTheDocument();
    });
    JeSuisUnUtilisateurNonConnecte(when);

    JeSelectionneUneValeurSurleChamp(and);
    JeSaisieDansLeChamp(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    JeSaisieDansLeChamp(and);
    JeCliqueSurLeBouton(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    UneAlertSuccessContenantLeMessage(and);
  });

  test('Erreur serveur (500)', ({ given, when, and }) => {
    given("J'accède à la page ajout de membre", async () => {
      serverUsePost({ route: 'members/add', code: 500 });
      render(<MembersNew />);
      expect(await screen.findByText(/Profil/)).toBeInTheDocument();
    });
    JeSuisUnUtilisateurNonConnecte(when);
    JeSelectionneUneValeurSurleChamp(and);
    JeSaisieDansLeChamp(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    JeSaisieDansLeChamp(and);
    JeCliqueSurLeBouton(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    UneAlertErrorContenantLeMessage(and);
  });
});
