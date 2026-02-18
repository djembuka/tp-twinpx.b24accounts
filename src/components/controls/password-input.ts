import { Input } from './input'
export class PasswordInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: 'password-icon.svg',
      hideIcon: 'password-icon-hide.svg',
      disabledIcon: 'password-disabled-icon.svg',
      invalidIcon: 'password-invalid-icon.svg',
      invalidIconHide: 'password-invalid-icon-hide.svg'
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
    const iconPath = this.invalidState ? this.iconPaths.invalidIcon : this.iconPaths.icon;
    const hidePath = this.invalidState ? this.iconPaths.invalidIconHide : this.iconPaths.hideIcon;
    const path = type === 'text' ? hidePath : iconPath;
    this.icon?.setAttribute('src', `${this.iconsPath}${path}`);
  }

  protected setInvalidState(invalid: boolean): void {
    super.setInvalidState(invalid);

    const type = this.input.getAttribute('type');
    const iconPath = invalid ? this.iconPaths.invalidIcon : this.iconPaths.icon;
    const hidePath = invalid ? this.iconPaths.invalidIconHide : this.iconPaths.hideIcon;
    const path = type === 'text' ? hidePath : iconPath;
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