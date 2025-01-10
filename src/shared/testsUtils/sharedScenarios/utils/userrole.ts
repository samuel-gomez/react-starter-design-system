import { screen, within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';

export const JeSuisUnUtilisateurConnuEtConnecteAvecleProfil = (instruction: DefineStepFunction, callback: (arg: string) => void) =>
  instruction(/^Je suis un utilisateur connu et connecté avec le profil "(.*)"$/, role => {
    callback(role);
  });

export const JeSuisUnUtilisateurNonConnecte = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^Je suis un utilisateur non connecté$/, () => {
    const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
    const header = base.getByRole('banner');
    const link = within(header).getByRole('link', { name: /Non Connecté/ });

    expect(link).toBeInTheDocument();
  });
