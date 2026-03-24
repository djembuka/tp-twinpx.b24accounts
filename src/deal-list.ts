window.addEventListener('DOMContentLoaded', () => {
  //deals list
  (() => {
    let dealsListPage;
    let counter = 0;

    const intId = setInterval(() => {
      if (counter > 50) {
        clearInterval(intId);
      }

      dealsListPage = document.querySelector('.twpx-b24a-deals-list-page');

      if (dealsListPage) {
        clearInterval(intId);
        dealsListPage.classList.add('twpx-b24a-content-block-page--show');
      }
    }, 100);
  })();

  //deals list autoload
  (() => {
    let dealsList = document.querySelector('.twpx-b24a-deals-list');
    if (!dealsList) return

    let loading = false;

    const button = dealsList.querySelector('.twpx-b24a-autoload-btn');
    if (!button) return;

    let url = button.getAttribute('data-url');
    if (!url) return;

    let lastPage = getLastPage();
    if (!lastPage) return;

    let preloader: HTMLDivElement = createPreloader();
    lastPage.after(preloader);

    setObserver();

    let hasMore: boolean = true;

    async function fetchNextPage(url: string) {
      if (!url) return;

      loading = true;
      let response = await fetch(url);

      if (!response.ok) {
        loading = false;
        hasMore = false;
        throw new Error('Fetch error');
      };

      let result = await response.text();
      handleAjaxSuccess(result);
    }

    function handleAjaxSuccess(data: string) {
      loading = false;

      const newLastPage = getNewLastPage(data);

      if (!newLastPage) {
        hasMore = false;
        if (button) button.remove();
        preloader.remove();
        return;
      };

      if (!lastPage) return;

      lastPage.after(newLastPage);
      newLastPage.classList.add('twpx-b24a-content-block-page--show');
      lastPage = newLastPage;

      setObserver();
    }

    function createPreloader(): HTMLDivElement {
      let preloader = document.createElement('div');
      preloader.className = 'twpx-b24a-autoload-element';

      return preloader;
    }

    function getLastPage(): HTMLDivElement | null {
      if (!dealsList) return null;

      const pageElements = dealsList.querySelectorAll('.twpx-b24a-deals-list-page');
      if (pageElements.length > 0)
        return pageElements[pageElements.length - 1] as HTMLDivElement;

      return null;
    }

    function getNewLastPage(html: string): HTMLDivElement | null {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.querySelector('.twpx-b24a-deals-list-page');
    }

    function getLastBlock(): HTMLDivElement | null {
      if (!dealsList) return null;
      const blockElements = dealsList.querySelectorAll('.twpx-b24a-deals-list-page .twpx-b24a-content-block');

      if (blockElements.length > 0) {
        return blockElements[blockElements.length - 1] as HTMLDivElement;
      }

      return null;
    }

    function getUrl(): string | null {
      if (!dealsList) return null;

      const newButton = dealsList.querySelector('.twpx-b24a-autoload-btn');
      if (!newButton) return null;

      return newButton.getAttribute('data-url');
    }

    function setObserver() {
      if (loading) return;

      const lastPage: HTMLDivElement | null = getLastBlock();
      if (!lastPage) return;

      const url: string | null = getUrl();
      if (!url) return;

      const callback = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hasMore) fetchNextPage(url);
            observer.unobserve(entry.target);
          }
        })
      }

      const options = {
        rootMargin: '0px 0px 75px 0px',
        threshold: 0,
      }

      const observer = new IntersectionObserver(callback, options);
      observer.observe(lastPage);
    }
  })();
});
