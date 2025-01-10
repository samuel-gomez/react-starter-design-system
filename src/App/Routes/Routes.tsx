import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader, { MODES } from 'shared/components/Loader';
import ROUTE_URLS from './constants';

const Home = lazy(() => import('pages/Home'));
const Members = lazy(() => import('pages/Demos/Members'));
const Employees = lazy(() => import('pages/Demos/Employees'));
const MembersNew = lazy(() => import('pages/Demos/MembersNew'));
const SearchMembers = lazy(() => import('pages/Demos/SearchMembers'));
const SlashDesignSystem = lazy(() => import('pages/Demos/SlashDesignSystem'));
const PageNotFound = lazy(() => import('pages/NotFound'));

const RoutesCmpt = () => (
  <Suspense fallback={<Loader mode={MODES.get} classModifier="fullscreen" message="Chargement de la page..." />}>
    <Routes>
      <Route index path={ROUTE_URLS.HOME} element={<Home />} />
      <Route path={ROUTE_URLS.SLASH}>
        <Route index element={<SlashDesignSystem />} />
        <Route path={ROUTE_URLS.MEMBERS} element={<Members />} />
        <Route path={ROUTE_URLS.MEMBERSNEW} element={<MembersNew />} />
        <Route path={ROUTE_URLS.SEARCHMEMBERS} element={<SearchMembers />} />
        <Route path={ROUTE_URLS.EMPLOYEES} element={<Employees />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
