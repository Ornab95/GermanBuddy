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

@Directive({
  selector: '[appParallaxDepth]',
  standalone: true,
})
export class ParallaxDepthDirective implements OnInit, OnDestroy {
  @Input() speed = 0.08; // Multiplier: positive moves slower than scroll, negative moves faster
  @Input() maxShift = 50; // Max px shift in either direction

  private isBrowser = false;
  private isMotionReduced = false;
  private rafId: number | null = null;
  private scrollListener: (() => void) | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.isMotionReduced = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    if (this.isMotionReduced) return;

    this.scrollListener = () => {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const rect = this.el.nativeElement.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        const rawShift = -distanceFromCenter * this.speed;
        const clampedShift = Math.max(-this.maxShift, Math.min(this.maxShift, rawShift));

        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          `translate3d(0, ${clampedShift.toFixed(1)}px, 0)`
        );
      });
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
    // Trigger initial calculation
    this.scrollListener();
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
