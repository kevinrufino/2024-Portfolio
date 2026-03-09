import PropTypes from 'prop-types';
import NameInstance from './NameInstance.js';

const NameRow = ({ index, variant, primaryColor, secondaryColor, onNameClick }) => {
  return (
    <div className='w-full flex flex-nowrap justify-between'>
      <NameInstance
        nameKey='first'
        rowIndex={index}
        variant={variant}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onNameClick={onNameClick}
      />
      <NameInstance
        nameKey='last'
        rowIndex={index}
        variant={variant}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onNameClick={onNameClick}
      />
    </div>
  );
};

NameRow.propTypes = {
  index: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['solid', 'outline']).isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  onNameClick: PropTypes.func,
};

export default NameRow;
