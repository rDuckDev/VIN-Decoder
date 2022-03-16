const worker = {
  register: () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(
          `${process.env.PUBLIC_URL}/service-worker.js`
        );
      });
    }
  },

  unregister: () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  },
};

export default worker;
