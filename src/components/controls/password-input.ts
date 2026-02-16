import { Input } from './input'

export class PasswordInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: 'password-icon.svg',
      disabledIcon: 'password-disabled-icon.svg',
      invalidIcon: 'password-invalid-icon.svg'
    };

    const iconPosition = 'right';

    super(wrapperElement, iconPaths, iconPosition);
  }

  protected setupIcons() {
    super.setupIcons();

    if (this.icon) {
      this.icon.addEventListener('click', this.handleIconClick.bind(this));
    }
  }

  private handleIconClick() {
    const type = this.input.getAttribute('type');
    this.input.setAttribute('type', type === 'text' ? 'password' : 'text');
  }
  
  public validate(): boolean {
    const value = this.input.value.trim();
    if (value.length < 6)
      this.setInvalidState(true);
      return false;
  }
}