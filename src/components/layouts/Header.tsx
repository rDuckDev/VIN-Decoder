import React from 'react';

function Header() {
  return (
    <header className='mb-3 border-bottom'>
      <nav className='navbar navbar-light bg-light'>
        <section className='container'>
          <span className='navbar-brand d-flex align-items-center'>
            <img
              alt=''
              src={`${process.env.PUBLIC_URL}/manifest/icons/icon-30x30.png`}
              className='me-3'
            />
            VIN Decoder
          </span>
        </section>
      </nav>
    </header>
  );
}

export default React.memo(Header);
