window.addEventListener('DOMContentLoaded', () => {
  //deals list
  (() => {
    const dealsListPage = document.querySelector('.twpx-b24a-deals-list-page');
    if (!dealsListPage) return;

    dealsListPage.classList.add('twpx-b24a-content-block-page--show');
  })();

  //deals list autoload
  (() => {
    let dealsList = document.querySelector('.twpx-b24a-deals-list');

    if (!dealsList) {
      return;
    }

    let loading = false;

    const button = dealsList.querySelector('.twpx-b24a-autoload-btn');

    if (!button) return;

    let url = button.getAttribute('data-url');
    if (!url) return;

    const method = button.getAttribute('data-method');
    const pageLast = dealsList.querySelectorAll('.twpx-b24a-deals-list-page')[
      dealsList.querySelectorAll('.twpx-b24a-deals-list-page').length - 1
    ];
    let preloader;

    addPreloader();

    window.addEventListener('scroll', () => {
      let collectionsHeight = 0;
      const all = pageLast.querySelectorAll('.twpx-b24a-content-block');
      let length = all.length;

      dealsList.querySelectorAll('.twpx-b24a-deals-list-page').forEach((c) => {
        collectionsHeight += c.clientHeight;
      });

      const rowHeight =
        all[length - 2].clientHeight + all[length - 1].clientHeight + 16;

      if (
        !loading &&
        dealsList.clientHeight - rowHeight <=
          window.scrollY -
            (dealsList.getBoundingClientRect().top +
              document.documentElement.scrollTop) +
            document.documentElement.clientHeight
      ) {
        loading = true;

        (async () => {
          let response = await fetch(url);
          let result = await response.text();
          handleAjaxSuccess(result);
          //handleAjaxError()
        })();
      }
    });

    function handleAjaxSuccess(data) {
      const div = document.createElement('div');
      div.innerHTML = data;
      const newPageLast = div.querySelector('.twpx-b24a-deals-list-page');
      const newButton = div.querySelector('.twpx-b24a-autoload-btn');

      pageLast.after(newPageLast);

      url = newButton ? newButton.getAttribute('data-url') : '';

      newPageLast.classList.add('twpx-b24a-content-block-page--show');

      loading = false;

      if (!url) {
        button.remove();
        preloader.remove();
        loading = true;
      }
    }

    function handleAjaxError(a, b, c) {
      if (window.console) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }

    function addPreloader() {
      preloader = document.createElement('div');
      preloader.className = 'twpx-b24a-autoload-element';

      pageLast.after(preloader);
    }
  })();
});
