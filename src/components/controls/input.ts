import type { ControlType } from "./types";
interface IconPaths {
  icon?: string | null;
  disabledIcon?: string | null;
  invalidIcon?: string | null;
  clearIcon?: string | null;
  clearInvalidIcon?: string | null;
  lockIcon?: string | null;
}
interface IconPathsDefault {
  icon: string | null;
  hideIcon?: string | null;
  disabledIcon: string | null;
  invalidIcon: string | null;
  invalidIconHide?: string | null;
  clearIcon: string | null;
  clearInvalidIcon: string | null;
  lockIcon: string | null;
}
export class Input implements ControlType {
  private wrapper: HTMLDivElement;
  private label: HTMLLabelElement | null;
  protected input: HTMLInputElement;
  private inputContainer: HTMLDivElement | null;
  private clearIcon: HTMLImageElement | null;
  private clearInvalidIcon: HTMLImageElement | null;
  protected iconsPath: string;
  protected icon: HTMLImageElement | null;
  protected iconMouseDown: boolean;
  protected invalidState: boolean;

  protected iconPaths: IconPathsDefault = {
    icon: 'icon.svg',
    disabledIcon: 'disabled-icon.svg',
    invalidIcon: 'invalid-icon.svg',
    clearIcon: 'clear-icon.svg',
    clearInvalidIcon: 'clear-invalid-icon.svg',
    lockIcon: 'lock-icon.svg'
  };

  constructor(wrapperElement: HTMLDivElement, iconPaths: IconPaths = {}, iconPosition = 'left') {
    this.iconPaths = {
      ...this.iconPaths,
      ...iconPaths,
    };

    this.invalidState = false;
    
    // Сохраняем ссылку на обертку
    this.wrapper = wrapperElement;
    this.iconsPath = this.wrapper.getAttribute('data-iconspath') ?? '';

    this.iconMouseDown = false;
    
    // Проверяем, что впервые вызван класс на элементе
    const noInstanceOnDiv = wrapperElement.classList.contains('twpx-input') && !wrapperElement.getAttribute('data-id');
    if (noInstanceOnDiv) {
      // Генерируем обертку
      this.wrapper = this.generateWrapper(wrapperElement as HTMLDivElement, iconPosition);
      // Заменяем исходный элемент на сгенерированную обертку
      wrapperElement.parentNode?.replaceChild(this.wrapper, wrapperElement);
    }
    
    // Находим элементы внутри обертки
    this.inputContainer = this.wrapper.querySelector('.twpx-input-container');
    this.label = this.wrapper.querySelector('.twpx-input-label');
    this.input = this.wrapper.querySelector('input') as HTMLInputElement;
    this.clearIcon = this.wrapper.querySelector('.twpx-input-clear');
    this.clearInvalidIcon = this.wrapper.querySelector('.twpx-input-clear-invalid');
    this.icon = this.wrapper.querySelector('.twpx-input-icon');

    if (!this.input) {
      throw new Error('Input элемент не найден внутри обертки');
    }
    
    // Инициализация
    this.init();
  }

  /**
   * Генерирует обертку для input из исходного элемента
   * @param wrapperElement - исходный div элемент
   * @returns HTMLDivElement - сгенерированная обертка
   */
  private generateWrapper(wrapperElement: HTMLDivElement, iconPosition: string): HTMLDivElement {
    wrapperElement.setAttribute('data-id', `${Math.round(Math.random()*10000)}`);
    wrapperElement.setAttribute('data-iconposition', iconPosition);

    const inputElement = wrapperElement.querySelector('input');
    let labelElement = wrapperElement.querySelector('label');
    let errorElement = wrapperElement.querySelector('.twpx-input-error');
    let descriptionElement = wrapperElement.querySelector('.twpx-input-description');

    if (!inputElement) {
      throw new Error('Input элемент не найден внутри обертки');
    }

    inputElement.classList.add('twpx-input__input')
    
    // Создаем обертку
    const wrapper = wrapperElement;
    wrapper.innerHTML = '';
    
    // Создаем контейнер
    const container = document.createElement('div');
    container.className = 'twpx-input-container';
    
    if (!labelElement) {
      // Создаем label
      labelElement = document.createElement('label');
      labelElement.textContent = 'Адрес портала Битрикс24';
    }
    
    labelElement.className = 'twpx-input-label';
    
    // Создаем иконки
    const icon = this.generateIcon('twpx-input-icon', this.iconPaths.icon);
    const clearIcon = this.generateIcon('twpx-input-clear', this.iconPaths.clearIcon);
    const clearInvalidIcon = this.generateIcon('twpx-input-clear-invalid', this.iconPaths.clearInvalidIcon);
    const lockIcon = this.generateIcon('twpx-input-lock', this.iconPaths.lockIcon);
    
    // Добавляем все элементы в контейнер
    container.appendChild(inputElement);
    container.appendChild(labelElement);
    
    if (icon)
      container.appendChild(icon);

    if (clearIcon)
      container.appendChild(clearIcon);

    if (clearInvalidIcon)
      container.appendChild(clearInvalidIcon);

    if (lockIcon)
      container.appendChild(lockIcon);

    if (errorElement) container.appendChild(errorElement);
    if (descriptionElement) container.appendChild(descriptionElement);
    
    // Добавляем контейнер в обертку
    wrapper.appendChild(container);
    
    return wrapper;
  }

  private generateIcon(className: string, path: string | null): HTMLImageElement | null {
    if (!path) return null;

    const icon = document.createElement('img');
    icon.className = className;
    icon.src = `${this.iconsPath}${path}`;
    icon.width = 32;
    icon.height = 32;
    icon.alt = '';
    
    return icon;
  }
  
  protected init(): void {   
    const isInvalid = this.wrapper.classList.contains('invalid');
    if (isInvalid) {
      this.setInvalidState(true);
    }
    
    const isDisabled = this.wrapper.classList.contains('disabled');
    if (isDisabled) {
      this.setDisabledState(true);
    }

    // Проверяем начальное значение и устанавливаем класс если есть текст
    if (this.input.value.trim() !== '') {
      this.setFilledState(true);
    }

    // Настраиваем иконки
    this.setupIcons();
    
    // Добавляем обработчики событий
    this.input.addEventListener('change', this.handleChange.bind(this));
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
  }

  /**
   * Настраивает обработчики для иконок
   */
  protected setupIcons(): void {
    // Обработчик для иконки очистки
    if (this.clearIcon) {
      this.clearIcon.addEventListener('click', this.handleClear.bind(this));
      this.clearIcon.addEventListener('mousedown', () => {this.iconMouseDown = true;});
      this.clearIcon.addEventListener('mouseup', () => {this.iconMouseDown = false;});
    }
    
    // Обработчик для иконки очистки при ошибке
    if (this.clearInvalidIcon) {
      this.clearInvalidIcon.addEventListener('click', this.handleClear.bind(this));
    }
  }

  private handleChange(): void {
    if (!this.iconMouseDown)
      this.validate();
  }
  
  // Обработчик ввода
  private handleInput(): void {
    // Обновляем класс filled в зависимости от наличия текста
    if (this.input.value.trim() !== '') {
      this.setFilledState(true);
    } else {
      this.setFilledState(false);
    }
    
    this.clearValidationState();
  }
  
  // Обработчик фокуса
  private handleFocus(): void {
    // Добавляем класс для стилизации при фокусе
    this.setFocusedState(true);
    
    // Убираем класс filled если поле пустое (CSS :placeholder-shown сам справится)
    if (this.input.value.trim() === '') {
      this.setFilledState(false);
    }
  }
  
  // Обработчик потери фокуса
  private handleBlur(): void {
    // Убираем класс focused
    this.setFocusedState(false);
    
    // Проверяем значение и добавляем класс filled если есть текст
    if (this.input.value.trim() !== '') {
      this.setFilledState(true);
    }
    
    // Валидируем при потере фокуса
    if (!this.iconMouseDown)
      this.validate();
  }

  private handleClear(): void {
    this.reset();
    this.focus();
  }
  
  // Валидация URL
  public validate(): boolean {
    return true;
  }

  private setFilledState(filled: boolean) {
    if (this.inputContainer)
      this.inputContainer.classList.toggle('filled', filled);
  }

  private setFocusedState(focused: boolean) {
    if (this.inputContainer)
      this.inputContainer.classList.toggle('focused', focused);
  }

  private setDisabledState(disabled: boolean) {
    if (this.inputContainer)
      this.inputContainer.classList.toggle('disabled', disabled);

    this.icon?.setAttribute('src', `${this.iconsPath}${disabled ? this.iconPaths.disabledIcon : this.iconPaths.icon}`);
  }
  
  // Установить состояние невалидности
  protected setInvalidState(invalid: boolean): void {
    if (this.inputContainer)
      this.inputContainer.classList.toggle('invalid', invalid);

    this.icon?.setAttribute('src', `${this.iconsPath}${invalid ? this.iconPaths.invalidIcon : this.iconPaths.icon}`);
    this.invalidState = invalid;
  }
  
  // Очистить состояние валидации
  public clearValidationState(): void {
    this.setInvalidState(false);
  }
  
  // Получить значение
  public getValue(): string {
    return this.input.value.trim();
  }
  
  // Установить значение
  public setValue(value: string): void {
    this.input.value = value;
    
    // Обновляем класс filled в зависимости от наличия текста
    if (value.trim() !== '') {
      this.setFilledState(true);
    } else {
      this.setFilledState(false);
    }
    
    this.clearValidationState();
  }
  
  // Сбросить значение
  public reset(): void {
    this.input.value = '';
    this.setFilledState(false);
    this.clearValidationState();
  }
  
  // Включить/выключить поле
  public setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  public setInvalid(invalid: boolean): void {
    this.setInvalidState(invalid);
  }
  
  // Проверить, валидно ли поле
  public isValid(): boolean {
    return this.validate();
  }
  
  // Установить текст лейбла
  public setLabelText(text: string): void {
    if (this.label) {
      this.label.textContent = text;
    }
  }
  
  // Установить placeholder (скрытый, для работы :placeholder-shown)
  public setPlaceholder(placeholder: string): void {
    this.input.placeholder = placeholder;
  }
  
  // Установить обязательность поля
  public setRequired(required: boolean): void {
    this.input.required = required;
  }
  
  // Получить DOM элемент input
  public getInputElement(): HTMLInputElement {
    return this.input;
  }
  
  // Получить DOM элемент wrapper
  public getWrapperElement(): HTMLDivElement {
    return this.wrapper;
  }
  
  // Фокус на поле
  public focus(): void {
    this.input.focus();
  }
  
  // Убрать фокус с поля
  public blur(): void {
    this.input.blur();
  }
  
  // Установить кастомное сообщение об ошибке
  public setCustomValidity(message: string): void {
    this.input.setCustomValidity(message);
  }
}