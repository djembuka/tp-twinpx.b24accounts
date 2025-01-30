window.addEventListener('DOMContentLoaded', () => {
  //pwa
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: './sw-test/' })
      .then((registration) => {
        console.log('registered', registration);
      })
      .catch((error) => {
        console.log('failed', error);
      });
  }
});
