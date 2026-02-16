export class Form {
    element: HTMLElement | null;

    constructor(element: HTMLElement | null) {
        this.element = element;

        if (!this.element || this.element.tagName.toLowerCase() !== 'form')
            return;

        this.init();
    }

    init() {
        console.log(this.element);
    }
}