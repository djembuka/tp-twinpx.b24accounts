import { Input } from './input'

export class TextInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: null,
      disabledIcon: null,
      invalidIcon: null
    };

    super(wrapperElement, iconPaths);
  }
  
  // Валидация Email
  public validate(): boolean {
    const value = this.input.value.trim();
    
    if (value === '') {
      this.clearValidationState();
      return !this.input.required; // Если поле не обязательно и пустое - валидно
    }

    return true;
  }
}