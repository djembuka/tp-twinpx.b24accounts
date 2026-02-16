import { Input } from './input'

export class EmailInput extends Input {
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

    try {
      if (!value.includes('@')) {
        throw new Error;
      }

      const [localPart, domain] = value.split('@', 2);
      const normalizedDomain = domain.toLowerCase();
      const domainParts = normalizedDomain.split('.');
      const lastPart = domainParts[domainParts.length - 1];
      const allowedLocalChars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
      const allowedDomainChars = /^[a-zA-Z0-9.-]+$/;

      if (
        (!localPart || localPart.length === 0) ||
        (localPart.includes('..')) ||
        (localPart.startsWith('.') || localPart.endsWith('.')) ||
        (!domain || domain.length === 0) ||
        (!normalizedDomain.includes('.')) ||
        (normalizedDomain.includes('..')) ||
        (normalizedDomain.startsWith('.') || normalizedDomain.endsWith('.')) ||
        (lastPart.length < 2) ||
        (!allowedLocalChars.test(localPart)) ||
        (!allowedDomainChars.test(normalizedDomain))
      ) {
        throw new Error;
      }

      for (const part of domainParts) {
        if (part.startsWith('-') || part.endsWith('-')) {
          throw new Error;
        }
      }

      this.setInvalidState(false);
      return true;

    } catch(error) {
      this.setInvalidState(true);
      return false;
    }
  }
}