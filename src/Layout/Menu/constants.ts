import ROUTE_URL from 'App/Routes/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.HOME,
  },

  {
    label: 'Slash démos',
    url: ROUTE_URL.SLASH,
    basePathChildren: ROUTE_URL.SLASH,
    children: [
      {
        label: 'Collaborateurs',
        url: ROUTE_URL.EMPLOYEES,
      },
      {
        label: 'Membres',
        url: ROUTE_URL.MEMBERS,
      },
      {
        label: 'Nouveau membre',
        url: ROUTE_URL.MEMBERSNEW,
      },
      {
        label: 'Rechercher',
        url: ROUTE_URL.SEARCHMEMBERS,
      },
      {
        label: 'Not found',
        url: ROUTE_URL.NOTFOUND,
      },
    ],
  },
];

export default MENU_ITEMS;
