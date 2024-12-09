window.addEventListener('DOMContentLoaded', () => {
  //pwa
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('registered', registration);
      })
      .catch((error) => {
        console.log('failed', error);
      });
  }

  //list group on the profile main
  (() => {
    const listGroup = document.querySelector('.twpx-b24a-list-group');
    if (!listGroup) return;

    listGroup.querySelectorAll('.twpx-b24a-list-group-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const pad = listGroup.closest('.twpx-b24a-content-pad');
        if (pad) {
          pad.classList.add('twpx-b24a-content-pad--preloader');
        }
      });
    });
  })();

  //go back
  (() => {
    const backBtn = document.querySelector('.twpx-b24a-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
      });
    }
  })();

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
        e.preventDefault();
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
  let form = document.querySelector('.twpx-b24a-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      let formElem = e.target;

      //validate the form
      let focusElement = formValidation(formElem);

      //focus
      if (!focusElement) {
        return true;
      } else {
        e.preventDefault();
      }
    });
  }

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
      if (reqInput.value.trim() === '') {
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
    });

    //email
    Object.keys(regExp).forEach((key) => {
      formElem.querySelectorAll(`[type=${key}]`).forEach((input) => {
        //required
        if (input.value.trim() !== '') {
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
    newPasswordInputs[0];
    newPasswordInputs[1];

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

    if (focusElement) {
      focusElement.focus();
    }

    return focusElement;
  }
});
