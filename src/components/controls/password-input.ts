import { Input } from './input'
export class PasswordInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: 'password-icon.svg',
      hideIcon: 'password-icon-hide.svg',
      disabledIcon: 'password-disabled-icon.svg',
      invalidIcon: 'password-invalid-icon.svg'
    };

    const iconPosition = 'right';

    super(wrapperElement, iconPaths, iconPosition);
  }

  protected setupIcons(): void {
    super.setupIcons();

    if (this.icon) {
      this.icon.addEventListener('click', this.handleIconClick.bind(this));
    }
  }

  private handleIconClick(): void {
    let type = this.input.getAttribute('type');
    this.input.setAttribute('type', type === 'text' ? 'password' : 'text');

    type = this.input.getAttribute('type');
    const path = type === 'text' ? this.iconPaths.hideIcon : this.iconPaths.icon;
    this.icon?.setAttribute('src', `${this.iconsPath}${path}`);
  }

  protected setInvalidState(invalid: boolean): void {
    super.setInvalidState(invalid);

    const type = this.input.getAttribute('type');
    const path = type === 'text' ? this.iconPaths.hideIcon : this.iconPaths.icon;
    this.icon?.setAttribute('src', `${this.iconsPath}${invalid ? this.iconPaths.invalidIcon : path}`);
  }

  public clearValidationState(): void {
    super.clearValidationState();

    const type = this.input.getAttribute('type');
    const path = type === 'text' ? this.iconPaths.hideIcon : this.iconPaths.icon;
    this.icon?.setAttribute('src', `${this.iconsPath}${path}`);
  }
  
  public validate(): boolean {
    const value = this.input.value.trim();
    
    if (value.length < 6) {
      this.setInvalidState(true);
      return false;
    }

    return true;
  }
}