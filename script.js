window.addEventListener('DOMContentLoaded', () => {
  const loaderIconWhite = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#paint0_angular_459_749_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.008 -0.008 0 8 8)"><foreignObject x="-1125" y="-1125" width="2250" height="2250"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(255, 255, 255, 1) 0deg,rgba(255, 255, 255, 0) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"/>
  <defs>
    <clipPath id="paint0_angular_459_749_clip_path"><path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"/></clipPath></defs>
    </svg>`;

  const loaderIconGray = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#paint0_angular_443_36_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.008 -0.008 0 8 8)"><foreignObject x="-1125" y="-1125" width="2250" height="2250"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(190, 199, 209, 1) 0deg,rgba(255, 255, 255, 0) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"/>
  <defs>
    <clipPath id="paint0_angular_443_36_clip_path"><path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"/></clipPath></defs>
    </svg>`;

  //не срабатывает на iPhone
  const isOnIOS =
    navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
  const eventName = isOnIOS ? 'pagehide' : 'beforeunload';

  window.addEventListener(eventName, () => {
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
    const buttons = document.querySelectorAll(
      '.twpx-b24a-exit, .twpx-b24a-back, .twpx-b24a-to-main'
    );

    buttons.forEach((b) => {
      b.addEventListener('click', (e) => {
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
      item.addEventListener('click', (e) => {
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
      b.addEventListener('click', (e) => {
        b.innerHTML = loaderIconGray;
        b.classList.add('twpx-b24a--loading');
      });
    });
  })();

  //deals more
  (() => {
    const dealsList = document.querySelector('.twpx-b24a-deals-list');

    if (!dealsList) return;

    dealsList.addEventListener('click', (e) => {
      const p = e.target.parentNode;
      if (
        e.target.tagName === 'A' &&
        p.classList.contains('twpx-b24a-content-block-more')
      ) {
        p.innerHTML = loaderIconGray;
        p.classList.add('twpx-b24a--loading');
      }
    });
  })();

  //background image
  (() => {
    const src = document
      .querySelector('.twpx-b24a-bg picture img')
      .getAttribute('data-src');
    const bgImg = document.createElement('img');
    bgImg.src = src;
    bgImg.width = '1px';
    bgImg.height = '1px';
    document.querySelector('body').append(bgImg);

    bgImg.addEventListener('load', () => {
      document
        .querySelector('.twpx-b24a-bg picture img')
        .setAttribute('src', src);

      document
        .querySelector('.twpx-b24a-bg picture')
        .classList.add('twpx-b24a-bg--visible');

      document
        .querySelector('.twpx-b24a-bg-blur')
        .classList.add('twpx-b24a-bg-blur--hidden');
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
    avatarEdit.addEventListener('click', function (e) {
      if (!e.target.classList.contains('twpx-b24a-avatar-edit--del')) {
        return true;
      }
      e.preventDefault();

      document.querySelector('input#PERSONAL_PHOTO').value = '';
      document.querySelector('input#PERSONAL_PHOTO_del').checked = true;
      document
        .querySelector('.twpx-b24a-avatar img')
        .setAttribute('src', '/images/icon-profile.svg');

      document
        .querySelector('.twpx-b24a-avatar-edit')
        .classList.remove('twpx-b24a-avatar-edit--del');
    });
  }

  let avatarInput = document.querySelector('input#PERSONAL_PHOTO');
  if (avatarInput) {
    avatarInput.addEventListener('change', function () {
      var input = this;
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
          document
            .querySelector('.twpx-b24a-avatar img')
            .setAttribute('src', e.target.result);

          document
            .querySelector('.twpx-b24a-avatar-edit')
            .classList.add('twpx-b24a-avatar-edit--del');

          document.querySelector('input#PERSONAL_PHOTO_del').checked = false;
        };

        reader.readAsDataURL(input.files[0]);
      }
    });
  }

  //float label
  let label = document.querySelectorAll('.twpx-b24a-float-label');
  if (label) {
    label.forEach((block) => {
      let control = block.querySelector('input');
      if (control.value.trim() !== '') {
        block.classList.add('twpx-b24a-float-label--active');
      }

      control.addEventListener('focus', () => {
        block.classList.add('twpx-b24a-float-label--active');
      });

      control.addEventListener('blur', () => {
        if (control.value.trim() !== '') {
          block.classList.add('twpx-b24a-float-label--active');
        } else {
          block.classList.remove('twpx-b24a-float-label--active');
        }
      });

      control.addEventListener('input', () => {
        if (control.value.trim() !== '') {
          block.classList.add('twpx-b24a-float-label--active');
        } else {
          block.classList.remove('twpx-b24a-float-label--active');
        }
      });

      control.addEventListener('keyup', () => {
        if (block.classList.contains('twpx-b24a-float-label--active')) {
          validateControl(block, control);
        }
      });
    });
  }

  //password show
  let password = document.querySelectorAll('.twpx-b24a-password');
  if (password) {
    password.forEach(function (element) {
      element.addEventListener('click', function (e) {
        element.classList.toggle('twpx-b24a-password--inverse');
        var input = element.parentNode.querySelector('input');
        if (input.getAttribute('type') === 'password') {
          input.setAttribute('type', 'text');
        } else if (input.getAttribute('type') === 'text') {
          input.setAttribute('type', 'password');
        }
      });
    });
  }

  //validation
  document.querySelectorAll('.twpx-b24a-form form').forEach((form) => {
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', (e) => {
      let formElem = e.target;

      //validate the form
      let focusElement = formValidation(formElem);

      //focus
      if (!focusElement) {
        const submitContainer = document.querySelector('.twpx-b24a-submit');

        if (submitContainer) {
          const icon = document.createElement('span');
          const submitButton = submitContainer.querySelector('[type="submit"]');

          icon.classList.add('twpx-b24a-submit-loading-icon');
          if (submitContainer.querySelector('a.twpx-b24a-btn--gray')) {
            icon.classList.add('twpx-b24a-submit-loading-icon--right');
          }
          icon.innerHTML = loaderIconWhite;

          // submitButton.setAttribute('value', '');
          submitButton.style.color = 'transparent';
          submitContainer.appendChild(icon);
        }

        // return true;
      } else {
        e.preventDefault();
      }
    });
  });

  function validateControl(block, control) {
    let regExp = {
      email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
    };

    //required
    if (control.value.trim() !== '') {
      block.classList.remove('twpx-b24a-float-label--invalid');
    }

    //email
    Object.keys(regExp).forEach((key) => {
      if (control.getAttribute('type') === key) {
        if (control.value.trim() !== '' && regExp[key].test(control.value)) {
          block.classList.remove('twpx-b24a-float-label--invalid');
        }
      }
    });
  }

  function formValidation(formElem) {
    let regExp = {
      email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
    };

    let focusElement;

    //required
    formElem.querySelectorAll('input').forEach((reqInput) => {
      if (reqInput.closest('.twpx-b24a-float-label')) {
        //inputs
        if (reqInput.required && reqInput.value.trim() === '') {
          if (!focusElement) {
            focusElement = reqInput;
          }
          reqInput
            .closest('.twpx-b24a-float-label')
            .classList.add('twpx-b24a-float-label--invalid');
        } else {
          reqInput
            .closest('.twpx-b24a-float-label')
            .classList.remove('twpx-b24a-float-label--invalid');
        }
      } else if (reqInput.closest('.twpx-b24a-checkbox')) {
        //checkbox
        if (reqInput.required && reqInput.checked === false) {
          //checkbox
          if (!focusElement) {
            focusElement = reqInput;
          }
          reqInput
            .closest('.twpx-b24a-checkbox')
            .classList.add('twpx-b24a-checkbox--invalid');
        } else {
          reqInput
            .closest('.twpx-b24a-checkbox')
            .classList.remove('twpx-b24a-checkbox--invalid');
        }
      }
    });

    //email
    Object.keys(regExp).forEach((key) => {
      formElem.querySelectorAll(`[type=${key}]`).forEach((input) => {
        //required
        if (input.required && input.value.trim() !== '') {
          if (!regExp[key].test(input.value)) {
            if (!focusElement) {
              focusElement = input;
            }
            input
              .closest('.twpx-b24a-float-label')
              .classList.add('twpx-b24a-float-label--invalid');
          } else {
            input
              .closest('.twpx-b24a-float-label')
              .classList.remove('twpx-b24a-float-label--invalid');
          }
        }
      });
    });

    //new password
    let newPasswordInputs = formElem.querySelectorAll('[data-newpassword]');

    if (newPasswordInputs.length) {
      if (
        newPasswordInputs[0].value.trim() !== newPasswordInputs[1].value.trim()
      ) {
        if (!focusElement) {
          focusElement = newPasswordInputs[1];
        }
        newPasswordInputs[1]
          .closest('.twpx-b24a-float-label')
          .classList.add('twpx-b24a-float-label--invalid');
      } else {
        newPasswordInputs[1]
          .closest('.twpx-b24a-float-label')
          .classList.remove('twpx-b24a-float-label--invalid');
      }
    }

    if (focusElement) {
      focusElement.focus();
    }

    return focusElement;
  }
});
