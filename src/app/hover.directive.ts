import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit {

  @Input() hinvHover: string = 'pink';

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
    console.log(element.nativeElement);
  }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.hinvHover;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.hinvHover
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }

}
