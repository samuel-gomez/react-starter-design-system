import { ROUTE_URL_EMPLOYEES as EMPLOYEES } from 'pages/Demos/Employees/constants';
import { ROUTE_URL_MEMBERS as MEMBERS } from 'pages/Demos/Members/constants';
import { ROUTE_URL_MEMBERSNEW as MEMBERSNEW } from 'pages/Demos/MembersNew/constants';
import { ROUTE_URL_SEARCHMEMBERS as SEARCHMEMBERS } from 'pages/Demos/SearchMembers/constants';
import { ROUTE_URL_SLASH as SLASH_DEMOS } from 'pages/Demos/SlashDesignSystem/constants';
import { ROUTE_URL_HOME as HOME } from 'pages/Home/constants';
import { ROUTE_URL_NOTFOUND as NOTFOUND } from 'pages/NotFound/constants';

const SLASH = '/slash';

const URLS_SLASH = {
  HOME,
  SLASH,
  SLASH_DEMOS,
  MEMBERS,
  MEMBERSNEW,
  SEARCHMEMBERS,
  EMPLOYEES,
  NOTFOUND,
} as const;

const ROUTE_URLS = {
  ...URLS_SLASH,
} as const;

export default ROUTE_URLS;
