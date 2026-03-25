
import { TextInput } from './controls/text-input';
import { EmailInput } from './controls/email-input';
import { PasswordInput } from './controls/password-input';
import { loaderIconWhite } from '../components/icons/loaderIconWhite.ts';

type Control = TextInput | EmailInput | PasswordInput;

export class Form {
    element: HTMLFormElement | null;
    private controls: Control[];
    button: HTMLElement | null;

    constructor(element: HTMLFormElement | null) {
        this.element = element;
        this.controls = [];
        this.button = null;

        if (!this.element || this.element.tagName.toLowerCase() !== 'form')
            return;

        this.init();
    }

    init() {
        if (!this.element) return;

        this.button = this.element.querySelector('[type="submit"]');

        this.element.setAttribute('novalidate', 'true');
        this.element.addEventListener('submit', this.handleSubmit.bind(this));

        this.element.querySelectorAll('.twpx-text-input').forEach((wrapper) => {
            this.controls.push( new TextInput(wrapper as HTMLDivElement) );
        });

        this.element.querySelectorAll('.twpx-email-input').forEach((wrapper) => {
            this.controls.push( new EmailInput(wrapper as HTMLDivElement) );
        });

        this.element.querySelectorAll('.twpx-password-input').forEach((wrapper) => {
            this.controls.push( new PasswordInput(wrapper as HTMLDivElement) );
        });
    }

    private setButtonLoading() {
        if (!this.button) return;

        const tagName = this.button.tagName.toLowerCase();

        if (tagName === 'input') {
            const parent = this.button.parentNode as HTMLElement;
            const icon = document.createElement('span');
            icon.className = 'twpx-b24a-submit-loader';
            icon.innerHTML = loaderIconWhite;

            parent.style.width = `${parent.clientWidth}px`;
            parent.appendChild(icon);
            parent.classList.add('twpx-b24a--loading');
            this.button.setAttribute('value', '');
        } else if (tagName === 'button') {
            this.button.style.width = `${this.button.clientWidth}px`;
            this.button.innerHTML = loaderIconWhite;
            this.button.classList.add('twpx-b24a--loading');
        }
    }

    private handleSubmit(event: Event): void {
        const focusElementInstance = this.validate();

        if (focusElementInstance) {
            event.preventDefault();
            focusElementInstance.focus();
            return;
        }

        this.setButtonLoading();
    }

    private validate(): Control | null {
        let elementInstance: Control | null = null;

        this.controls.forEach(control => {
            const valid: boolean = control.validate();
            if (!valid && !elementInstance) elementInstance = control;
        })

        if (elementInstance) {
            return elementInstance;
        } else {
            // if new password
            const passwords = this.controls.filter( elementInstance => elementInstance instanceof PasswordInput)
            if (passwords.length >= 2) {
                const firstValue = passwords[0].getValue();
                const isPasswordEqual = passwords.every(item => item.getValue() === firstValue);

                if (!isPasswordEqual) {
                    return passwords[0];
                }
            }
        }
        
        return null;
    }
}