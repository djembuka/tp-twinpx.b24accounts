import { Input } from './input'

export class TelInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: null,
      disabledIcon: null,
      invalidIcon: null
    };

    super(wrapperElement, iconPaths);
  }
  
  public validate(): boolean {
    const value = this.input.value.trim();
    
    if (value === '') {
      this.clearValidationState();
      return !this.input.required;
    }

    return true; //проверяем соответствие маске

  }

  protected init() {
    super.init();

    this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.inputPhone(event);
  }

  private inputPhone(event: KeyboardEvent): void {
    let key = event.key;
      let not = key.replace(/([0-9])/, '1');

      if (not == '1') {
        const value = this.input.value;
        if (value.length < 4 || value === '') {
          this.input.value = '+7 (';
        }
        if (value.length === 7) {
          this.input.value = value + ') ';
        }
        if (value.length === 12) {
          this.input.value = value + '-';
        }
        if (value.length === 15) {
          this.input.value = value + '-';
        }
        if (value.length >= 18) {
          this.input.value = value.substring(0, 17);
        }
      } else if ('Backspace' !== not && 'Tab' !== not) {
        event.preventDefault();
      }
  }
}