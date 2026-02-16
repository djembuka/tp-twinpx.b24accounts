/* old */
import { loaderIconWhite } from './components/icons/loaderIconWhite.ts';
import { loaderIconGray } from './components/icons/loaderIconGray.ts';
import { unloadEventName } from './utils/unloadEvent.ts';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener(unloadEventName, () => {
    // const content = document.querySelector('.twpx-b24a-content');
    // if (content) {
    //   content.classList.add('twpx-b24a-content--preloader');
    // }
  });

  // document.addEventListener('visibilitychange', function () {
  //   alert(document.visibilityState);
  // });

  //exit, back, main
  (() => {
    const buttons: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.twpx-b24a-exit, .twpx-b24a-back, .twpx-b24a-to-main'
    );

    buttons.forEach((b: HTMLDivElement) :void => {
      b.addEventListener('click', () => {
        b.style.width = `${b.clientWidth}px`;
        b.innerHTML = loaderIconWhite;
        b.classList.add('twpx-b24a--loading');
      });
    });
  })();

  // list group on the profile main
    (() => {
      const linkItems = document.querySelectorAll('.twpx-b24a-link-item');

      linkItems.forEach((item) => {
        item.addEventListener('click', () => {
          item.classList.add('twpx-b24a-link-item--loading');

          const icon = document.createElement('span');
          icon.classList.add('twpx-b24a-link-item-loading-icon');
          icon.innerHTML = loaderIconGray;
          item.appendChild(icon);
        });
      });
    })();

    //gray button
  (() => {
    document.querySelectorAll('.twpx-b24a-btn--gray').forEach((b) => {
      b.addEventListener('click', () => {
        b.innerHTML = loaderIconGray;
        b.classList.add('twpx-b24a--loading');
      });
    });
  })();

  //deals more
  (() => {
    const dealsList:HTMLDivElement | null = document.querySelector('.twpx-b24a-deals-list');

    if (!dealsList) return;

    dealsList.addEventListener('click', (e) => {
      if (!e.target) return;

      const targetElement = e.target as Element;
      const p = targetElement.parentNode as Element;

      if (
        targetElement.tagName === 'A' &&
        p.classList.contains('twpx-b24a-content-block-more')
      ) {
        p.innerHTML = loaderIconGray;
        p.classList.add('twpx-b24a--loading');
      }
    });
  })();

  //background image
  (() => {
    if (!document) return;

    const img: HTMLImageElement | null = document.querySelector('.twpx-b24a-bg picture img');

    if (!img) return;

    const src: string | null = img.getAttribute('data-src');
    const bgImg: HTMLImageElement = document.createElement('img');

    if (src)
      bgImg.setAttribute('src', src);

    bgImg.setAttribute('width', '1px');
    bgImg.setAttribute('height', '1px');

    const body = document.querySelector('body');
    if (body)
      body.append(bgImg);

    bgImg.addEventListener('load', () => {
      const img = document.querySelector('.twpx-b24a-bg picture img');
      if (img && src)
        img.setAttribute('src', src);

      const picture = document.querySelector('.twpx-b24a-bg picture');
      if (picture)
        picture.classList.add('twpx-b24a-bg--visible');

      const blur = document.querySelector('.twpx-b24a-bg-blur')
      if (blur)
        blur.classList.add('twpx-b24a-bg-blur--hidden');
    });
  })();

  //go back
  // (() => {
  //   const backBtn = document.querySelector('.twpx-b24a-back');
  //   if (backBtn) {
  //     backBtn.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       window.history.back();
  //     });
  //   }
  // })();

  //avatar
  let avatarEdit = document.querySelector('.twpx-b24a-avatar-edit');
  if (avatarEdit) {
    avatarEdit.addEventListener('click', function (event) {
      const eventTarget = event.target as Element;

      if (!eventTarget.classList.contains('twpx-b24a-avatar-edit--del')) {
        return true;
      }
      event.preventDefault();

      const photoInput: HTMLInputElement | null = document.querySelector('input#PERSONAL_PHOTO');
      if (photoInput)
        photoInput.value = '';

      const photoDelInput: HTMLInputElement | null = document.querySelector('input#PERSONAL_PHOTO_del');
      if (photoDelInput)
        photoDelInput.checked = true;

      const avatarImg = document.querySelector('.twpx-b24a-avatar img');
      if (avatarImg)
        avatarImg.setAttribute('src', '/images/icon-profile.svg');

      const avatarEdit: HTMLDivElement | null = document.querySelector('.twpx-b24a-avatar-edit');
      if (avatarEdit)
        avatarEdit.classList.remove('twpx-b24a-avatar-edit--del');
    });
  }

  let avatarInput: HTMLInputElement | null = document.querySelector('input#PERSONAL_PHOTO');
  if (avatarInput) {
    avatarInput.addEventListener('change', () => {
      var input = avatarInput;
      if (
        input.files &&
        input.files[0] &&
        input.files[0].size < 3e6 &&
        /gif|jpg|jpeg|png|tiff|webp|heic/gi.test(
          input.files[0].name
            .substr(input.files[0].name.lastIndexOf('.') + 1)
            .toLowerCase()
        )
      ) {
        var reader = new FileReader();

        reader.onload = function (e) {
          const eventTarget = e.target;
          const img = document.querySelector('.twpx-b24a-avatar img');
          if (img && eventTarget && eventTarget.result)
            img.setAttribute('src', eventTarget.result as string);

          const edit = document.querySelector('.twpx-b24a-avatar-edit');
          if (edit)
            edit.classList.add('twpx-b24a-avatar-edit--del');

          const del: HTMLInputElement | null = document.querySelector('input#PERSONAL_PHOTO_del');
          if (del)
            del.checked = false;
        };

        reader.readAsDataURL(input.files[0]);
      }
    });
  }

});
