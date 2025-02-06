import GALLERIES from './constants';
import './Galleries.scss';
import Gallery from './Gallery';

const Galleries = ({ galleries = GALLERIES }: { galleries?: typeof GALLERIES }) => (
  <>
    {galleries.map(({ title, ...rest }) => (
      <Gallery title={title} key={title} {...rest} />
    ))}
  </>
);

export default Galleries;
