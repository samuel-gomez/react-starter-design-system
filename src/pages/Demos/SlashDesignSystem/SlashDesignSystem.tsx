import Layout, { type TLayoutPage } from 'Layout';
import { TITLE, TITLE_BAR } from './constants';

export type TSlashDesignSystemPage = TLayoutPage;

const SlashDesignSystemPage = ({ titleBar = TITLE_BAR, title = TITLE }: TSlashDesignSystemPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    Lien vers les démos
  </Layout>
);

export default SlashDesignSystemPage;
