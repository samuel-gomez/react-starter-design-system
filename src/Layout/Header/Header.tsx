import { Header, Infos, Name, User } from '@axa-fr/react-toolkit-all';
import logo from 'assets/slash-logo.svg';
import type { ReactNode } from 'react';
import Resilience from 'shared/components/Resilience';
import Skeleton from 'shared/components/Skeleton';
import type { Tanomaly } from 'shared/types.d';
import { SUBTITLE, TITLE } from './constants';
import './Header.scss';

type THeaderInfo = {
  isLoaded?: boolean;
  children: ReactNode;
};

export const HeaderInfo = ({ isLoaded, children }: THeaderInfo) => (isLoaded ? <>{children}</> : <Skeleton classModifier="info" />);

type THeaderApp = {
  title?: string;
  subtitle?: string;
  infos?: {
    word: string;
    definition: string;
  }[];
  authName?: string;
  authRole?: string;
  link?: string;
  anomaly?: Tanomaly | null;
  fullScreen?: boolean;
};

const HeaderApp = ({
  fullScreen,
  infos,
  title = TITLE,
  subtitle = SUBTITLE,
  link = '#',
  authName = 'Non Connecté',
  authRole = 'Profil',
  anomaly,
}: THeaderApp) => (
  <Header classModifier={fullScreen ? 'fullscreen' : ''}>
    <Name title={title} img={logo} alt={title} subtitle={subtitle} classModifier="slash" />
    {infos && (
      <Resilience anomaly={anomaly} classModifier="simple infos">
        <HeaderInfo isLoaded={infos.length > 0}>
          <Infos infos={infos} />
        </HeaderInfo>
      </Resilience>
    )}
    <User name={authName} href={link} profile={!authRole ? 'inconnu' : authRole} />
  </Header>
);

export { HeaderApp };
