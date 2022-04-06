import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header className='border-bottom mb-3'>
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <section className='container'>
          <Link to='/' className='navbar-brand d-flex align-items-center'>
            <img
              alt=''
              src={`${process.env.PUBLIC_URL}/manifest/icons/icon-30x30.png`}
              className='me-3'
            />
            VIN Decoder
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#nav-main'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='nav-main'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <Link to='/decode' className='nav-link'>
                  Decoder
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/history' className='nav-link'>
                  History
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </nav>
    </header>
  );
}

export default React.memo(Header);
