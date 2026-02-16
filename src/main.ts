import './script.ts'

import './styles/style.css'
import './styles/form.css'


import './styles/controls/input.css'
import './styles/controls/email-input.css'
import './styles/controls/password-input.css'
import './styles/controls/select-dropdown.css'
import './styles/controls/checkbox.css'

import { EmailInput } from './components/controls/email-input'
import { PasswordInput } from './components/controls/password-input.ts'
import { SelectDropdown } from './components/controls/select-dropdown'
import { CheckboxInput } from './components/controls/checkbox'
import { Form } from './components/form'


window.addEventListener('DOMContentLoaded', () => {

    new Form( document.getElementById('testForm') );

    document.querySelectorAll('.twpx-email-input').forEach((wrapper) => {
        new EmailInput(wrapper as HTMLDivElement);
    });

    document.querySelectorAll('.twpx-password-input').forEach((wrapper) => {
        new PasswordInput(wrapper as HTMLDivElement);
    });

    document.querySelectorAll('.twpx-select').forEach((wrapper) => {
        new SelectDropdown(wrapper as HTMLDivElement);
    });

    document.querySelectorAll('.twpx-checkbox').forEach((wrapper) => {
        new CheckboxInput(wrapper as HTMLDivElement);
    });
});