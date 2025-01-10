import { act, render, screen, waitFor } from 'shared/testsUtils/customRender';

import { TITLE as TITLE_EMPLOYEES } from 'pages/Demos/Employees';
import { TITLE as TITLE_MEMBERS } from 'pages/Demos/Members';
import { TITLE as TITLE_MEMBERSNEW } from 'pages/Demos/MembersNew';
import { TITLE as TITLE_SEARCHMEMBERS } from 'pages/Demos/SearchMembers';
import { TITLE as TITLE_DEMOS } from 'pages/Demos/SlashDesignSystem';
import { TITLE as TITLE_HOME } from 'pages/Home';
import { TITLE as TITLE_NOTFOUND } from 'pages/NotFound';
import Routes, { ROUTE_URLS } from '..';

describe('<Routes />', () => {
  it.each`
    title                  | route
    ${TITLE_HOME}          | ${ROUTE_URLS.HOME}
    ${TITLE_EMPLOYEES}     | ${`${ROUTE_URLS.SLASH}/${ROUTE_URLS.EMPLOYEES}`}
    ${TITLE_MEMBERS}       | ${`${ROUTE_URLS.SLASH}/${ROUTE_URLS.MEMBERS}`}
    ${TITLE_MEMBERSNEW}    | ${`${ROUTE_URLS.SLASH}/${ROUTE_URLS.MEMBERSNEW}`}
    ${TITLE_SEARCHMEMBERS} | ${`${ROUTE_URLS.SLASH}/${ROUTE_URLS.SEARCHMEMBERS}`}
    ${TITLE_NOTFOUND}      | ${ROUTE_URLS.NOTFOUND}
    ${TITLE_DEMOS}         | ${ROUTE_URLS.SLASH}
  `('Should render page for unprotected routes, role: $role, title: $title, route: $route', async ({ title, route }) => {
    render(<Routes />, {}, { route });
    act(() => {
      screen.getByText('Chargement de la page...');
    });
    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });
});
