import React, {memo} from 'react';

function Footer() {
  return (
    <footer className='container text-center'>
      {console.log(`Footer: render at ${new Date().getTime()}`)}
      <section className='border-top d-inline-block p-2'>
        rDuckDev © {new Date().getFullYear()} | All rights reserved
      </section>
    </footer>
  );
}

export default memo(Footer);
