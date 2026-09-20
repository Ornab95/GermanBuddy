import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
}

@Directive({
  selector: '[appTiltCard]',
  standalone: true,
})
export class TiltCardDirective implements OnInit, OnDestroy {
  @Input() maxTilt = 4; // Max degrees of rotation
  @Input() scale = 1.02; // Scale multiplier on hover
  @Input() perspective = 1000; // Perspective in px
  @Input() disabled = false;

  @Input() set appTiltCard(options: TiltOptions | '' | undefined) {
    if (options && typeof options === 'object') {
      if (options.maxTilt !== undefined) this.maxTilt = options.maxTilt;
      if (options.scale !== undefined) this.scale = options.scale;
      if (options.perspective !== undefined) this.perspective = options.perspective;
      if (options.disabled !== undefined) this.disabled = options.disabled;
    }
  }

  private isBrowser = false;
  private isMotionReduced = false;
  private isTouchDevice = false;
  private rafId: number | null = null;
  private isHovered = false;

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
    this.isTouchDevice = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)').matches
      : false;

    // Apply baseline perspective and transform-style
    if (!this.isMotionReduced && !this.isTouchDevice) {
      this.renderer.setStyle(this.el.nativeElement, 'transformStyle', 'preserve-3d');
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
      );
    }
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isBrowser || this.disabled || this.isMotionReduced || this.isTouchDevice) return;
    this.isHovered = true;
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.1s ease-out, box-shadow 0.3s ease'
    );
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser || this.disabled || this.isMotionReduced || this.isTouchDevice || !this.isHovered) {
      return;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse coords relative to card center (-1 to 1)
      const mouseX = (event.clientX - rect.left - width / 2) / (width / 2);
      const mouseY = (event.clientY - rect.top - height / 2) / (height / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, mouseX));
      const clampedY = Math.max(-1, Math.min(1, mouseY));

      // Calculate tilt: cursor moving up tilts card backward (rotateX positive)
      const rotateX = -clampedY * this.maxTilt;
      const rotateY = clampedX * this.maxTilt;

      const transform = `perspective(${this.perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${this.scale}, ${this.scale}, 1)`;

      this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isBrowser || this.disabled || this.isMotionReduced || this.isTouchDevice) return;
    this.isHovered = false;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    // Smooth return to neutral spring
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
  }
}
