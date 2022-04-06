import React from 'react';

interface IProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

function ProgressSpinner({size = 1}: IProps) {
  return (
    <span className={`fa-${size}x`}>
      <i className='fa-solid fa-spinner fa-spin-pulse' />
    </span>
  );
}

export default React.memo(ProgressSpinner);
