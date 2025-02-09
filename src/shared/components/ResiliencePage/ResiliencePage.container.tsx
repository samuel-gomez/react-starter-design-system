import ResiliencePage, { type TResiliencePage } from './ResiliencePage';

export type TResiliencePageContainer = TResiliencePage & {
  ResiliencePageCmpt?: typeof ResiliencePage;
};

const ResiliencePageContainer = ({ ResiliencePageCmpt = ResiliencePage, classModifier, ...rest }: TResiliencePageContainer) => {
  const newClassModifier = ['resilience-page', classModifier].join(' ').trim();

  return <ResiliencePageCmpt classModifier={newClassModifier} {...rest} />;
};

export default ResiliencePageContainer;
