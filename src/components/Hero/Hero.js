import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NameRow from './components/NameRow.js';
import useHeroRowCount from '../../hooks/useHeroRowCount.js';

export const Hero = ({ primaryColor, secondaryColor, setCursor }) => {
  const { rowCount, callbackRef } = useHeroRowCount();
  const loggedRef = useRef(false);

  useEffect(() => {
    if (rowCount > 0 && !loggedRef.current) {
      loggedRef.current = true;
      console.log(
        `[Hero] ${rowCount} rows rendered — names are in the DOM and ready to click`,
      );
    }
  }, [rowCount]);

  const rows = Array.from({ length: rowCount }, (_, i) => ({
    id: `row-${i}`,
    index: i,
    variant: i % 2 === 0 ? 'solid' : 'outline',
  }));

  const handleNameClick = ({
    nameKey,
    rowIndex,
    variant,
    rect,
    svgMarkup,
    prewarmedImg,
  }) => {
    window.dispatchEvent(
      new CustomEvent('spawnBox', {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY,
          nameKey,
          rowIndex,
          variant,
          rect,
          svgMarkup,
          prewarmedImg,
        },
      }),
    );
  };

  return (
    <div
      className='relative flex flex-col items-center w-full h-screen p-2'
      onMouseEnter={() => {
        setCursor('');
      }}
      id='home'
    >
      {/* Hidden single row for measuring row height */}
      <div className='w-full invisible absolute top-0'>
        <div ref={callbackRef} className='w-full'>
          <NameRow
            index={0}
            variant='solid'
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
      </div>
      {/* Visible stacked rows */}
      <div className='w-full [&>*:not(:first-child)]:mt-[-5%]'>
        {rows.map(row => (
          <NameRow
            key={row.id}
            index={row.index}
            variant={row.variant}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onNameClick={handleNameClick}
          />
        ))}
      </div>
    </div>
  );
};

Hero.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  setCursor: PropTypes.func.isRequired,
};
