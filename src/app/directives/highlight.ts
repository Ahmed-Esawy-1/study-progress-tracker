import { Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    host: {
        '(mouseenter)': 'isHovered.set(true)',
        '(mouseleave)': 'isHovered.set(false)',
        '[style.background-color]': 'isHovered() ? "yellow" : null',
    },
})
export class HighlightDirective {
    // private el = inject(ElementRef);

    // constructor() {
    //     this.el.nativeElement.style.background = 'yellow';
    // }

    protected isHovered = signal(false);
}
