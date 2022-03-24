import React from 'react';

function Footer() {
  return (
    <footer className='container text-center mt-3'>
      {console.log(`Footer: render at ${new Date().getTime()}`)}
      <section className='border-top d-inline-block p-2'>
        rDuckDev © {new Date().getFullYear()} | All rights reserved
      </section>
    </footer>
  );
}

export default React.memo(Footer);
