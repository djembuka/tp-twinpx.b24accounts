
import { EmailInput } from './controls/email-input'
import { PasswordInput } from './controls/password-input'

type Control = EmailInput | PasswordInput;

export class Form {
    element: HTMLFormElement | null;
    private controls: Control[];

    constructor(element: HTMLFormElement | null) {
        this.element = element;
        this.controls = [];

        if (!this.element || this.element.tagName.toLowerCase() !== 'form')
            return;

        this.init();
    }

    init() {
        if (!this.element) return;

        this.element.setAttribute('novalidate', 'true');
        this.element.addEventListener('submit', this.handleSubmit.bind(this));

        this.element.querySelectorAll('.twpx-email-input').forEach((wrapper) => {
            this.controls.push( new EmailInput(wrapper as HTMLDivElement) );
        });

        this.element.querySelectorAll('.twpx-password-input').forEach((wrapper) => {
            this.controls.push( new PasswordInput(wrapper as HTMLDivElement) );
        });
    }

    private handleSubmit(event: Event): void {
        const focusElementInstance = this.validate();

        if (focusElementInstance) {
            event.preventDefault();
            focusElementInstance.focus();
        }
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