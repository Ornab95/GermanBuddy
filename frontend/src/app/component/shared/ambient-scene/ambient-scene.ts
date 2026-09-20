import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ambient-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <!-- Deep neutral background base -->
      <div class="absolute inset-0 bg-[#080B10]"></div>

      <!-- Very subtle noise/grid texture -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.12]"></div>

      <!-- Extremely subtle, quiet dark neutral vignettes -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-slate-800/10 to-transparent rounded-full blur-3xl"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AmbientScene {}
