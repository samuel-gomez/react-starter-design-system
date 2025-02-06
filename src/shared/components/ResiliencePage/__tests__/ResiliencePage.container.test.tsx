import { render } from '@testing-library/react';
import ResiliencePageContainer from '../ResiliencePage.container';

const ResiliencePageCmpt = vi.fn();

const defaultProps = {
  ResiliencePageCmpt,
  title: 'test title',
};

describe('<ResiliencePageContainer />', () => {
  it.each`
    classModifier | expectedClassModifier
    ${undefined}  | ${'resilience-page'}
    ${''}         | ${'resilience-page'}
    ${'sam'}      | ${'resilience-page sam'}
  `(
    'Should render view with expectedClassModifier: $expectedClassModifier when classModifier: $classModifier',
    ({ expectedClassModifier, classModifier }) => {
      render(<ResiliencePageContainer {...defaultProps} classModifier={classModifier} />);
      expect(ResiliencePageCmpt).toHaveBeenCalledWith(
        {
          classModifier: expectedClassModifier,
          title: 'test title',
        },
        undefined,
      );
    },
  );
});
