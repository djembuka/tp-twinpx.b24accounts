import { Input } from './input'

export class UrlInput extends Input {
  constructor(wrapperElement: HTMLDivElement) {
    const iconPaths = {
      icon: 'url-icon.svg',
      disabledIcon: 'url-disabled-icon.svg',
      invalidIcon: 'url-invalid-icon.svg',
    };

    super(wrapperElement, iconPaths);
  }

  // Валидация URL
  public validate(): boolean {
    const value = this.input.value.trim();
    
    if (value === '') {
      this.clearValidationState();
      return !this.input.required; // Если поле не обязательно и пустое - валидно
    }
    
    try {
      // Создаем URL объект для валидации
      new URL(value);
      this.setInvalidState(false);
      return true;
    } catch (error) {
      this.setInvalidState(true);
      return false;
    }
  }
}