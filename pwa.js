window.addEventListener('DOMContentLoaded', () => {
  //pwa
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  }
});
