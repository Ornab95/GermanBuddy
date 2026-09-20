import {
  Directive,
  ElementRef,
  Input,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealVariant = 'fade-up' | 'depth-in' | 'tilt-in' | 'fade-left' | 'fade-right';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealVariant: RevealVariant = 'fade-up';
  @Input() revealDelay = 0; // ms
  @Input() revealThreshold = 0.12;

  private isBrowser = false;
  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(this.el.nativeElement, 'reveal-in');
      return;
    }

    // Set initial classes
    this.renderer.addClass(this.el.nativeElement, 'reveal-init');
    this.renderer.addClass(this.el.nativeElement, `variant-${this.revealVariant}`);

    if (this.revealDelay > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transitionDelay', `${this.revealDelay}ms`);
    }

    // Set up IntersectionObserver
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'reveal-in');
              if (this.observer) {
                this.observer.unobserve(this.el.nativeElement);
              }
            }
          });
        },
        { threshold: this.revealThreshold, rootMargin: '0px 0px -40px 0px' }
      );

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback if IntersectionObserver is not supported
      this.renderer.addClass(this.el.nativeElement, 'reveal-in');
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
