import React from 'react';

interface IProps {
  messages: string[];
}

function MessageList({messages = []}: IProps) {
  return (
    <React.Fragment>
      {!!messages.length && (
        <section className='container mb-3'>
          <ul className='list-group'>
            {messages.map((message, index) => (
              <li key={index} className='list-group-item list-group-item-light'>
                {message}
              </li>
            ))}
          </ul>
        </section>
      )}
    </React.Fragment>
  );
}

export default React.memo(MessageList);
