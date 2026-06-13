import { useRef, useEffect } from 'react';
import Reveal from './Reveal.js';

export const Footer = ({ setCursor }) => {
  const obstacleRef = useRef(null);

  useEffect(() => {
    const dispatch = () => {
      if (!obstacleRef.current) return;
      const rect = obstacleRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('registerObstacle', {
          detail: {
            id: 'footer-contact',
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2,
            width: rect.width,
            height: rect.height,
          },
        }),
      );
    };
    requestAnimationFrame(dispatch);
    window.addEventListener('resize', dispatch);
    return () => window.removeEventListener('resize', dispatch);
  }, []);

  return (
    <footer
      className='max-w-4xl m-auto flex flex-col'
      id='contact'
      onMouseEnter={() => {
        setCursor('');
      }}
    >
      <div className='font-offbit101Bold'>
        <Reveal>
          <div className='flex items-center max-w-xl ml-4'>
            <p className='font-offbitDot text-[10px] md:text-xs tracking-[0.3em] uppercase m-2 self-start mt-4 opacity-80'>
              {'04 — Contact'}
            </p>
          </div>
          <div className='flex max-w-xl ml-4'>
            <p className='text-4xl md:text-7xl m-2 leading-[0.95]'>
              {'Lets Connect'}
            </p>
            <img src='/smile.svg' alt='smile' className='p-2' />
          </div>
        </Reveal>
        <div
          className='flex flex-col md:flex-row md:text-3xl m-4 w-max'
          ref={obstacleRef}
        >
          <img
            src='/pixel-selfie.png'
            alt="it's a me"
            width={240}
            className='m-2 h-[240px] w-[240px] object-cover'
          />
          <div className='m-2'>
            <p>{'Kevin Rufino'}</p>
            <p>{'Brooklyn, NY'}</p>
            <br />
            <div className='flex flex-col'>
              <a
                className='w-max hover:bg-ultra hover:text-acid transition-colors px-1 -mx-1'
                href='mailto: kevinrufino97@gmail.com'
              >
                {'Email'}
              </a>
              <a
                className='w-max hover:bg-ultra hover:text-acid transition-colors px-1 -mx-1'
                href="./Kevin Rufino's Resume.pdf"
                target='_blank'
                rel='noreferrer'
              >
                {'Resume'}
              </a>
              <a
                className='w-max hover:bg-ultra hover:text-acid transition-colors px-1 -mx-1'
                href='https://www.linkedin.com/in/kevinrufino/'
                target='_blank'
                rel='noreferrer'
              >
                {'LinkedIn'}
              </a>
              <a
                className='w-max hover:bg-ultra hover:text-acid transition-colors px-1 -mx-1'
                href='https://github.com/kevinrufino'
                target='_blank'
                rel='noreferrer'
              >
                {'Github'}
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className='text-xs md:text-2xl font-offbitDot text-center self-center m-2 pb-8'>
        {'* Designed and Developed by Kevin Rufino *'}
      </p>
    </footer>
  );
};
