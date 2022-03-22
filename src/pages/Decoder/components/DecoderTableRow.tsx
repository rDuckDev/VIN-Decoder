import React from 'react';

interface IProps {
  label: string;
  value: string;
}

function DecoderTableRow({label, value}: IProps) {
  return (
    <tr>
      <td className='text-muted'>{label}</td>
      <td>{value}</td>
    </tr>
  );
}

export default React.memo(DecoderTableRow);
