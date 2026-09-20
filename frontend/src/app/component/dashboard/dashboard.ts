import { Component, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { TiltCardDirective } from '../../directives/tilt-card.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface SampleWord {
  german: string;
  bangla: string;
  phonetic: string;
  category: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavBar,
    TiltCardDirective,
    ScrollRevealDirective,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // 3D Moving German Flag Background columns
  protected readonly flagColumns = Array.from({ length: 14 }, (_, i) => i);

  // Interactive 3D Demo Flashcard State
  protected readonly sampleWords: SampleWord[] = [
    { german: 'Guten Tag', bangla: 'শুভ দিন / হ্যালো', phonetic: 'গুঠেন টাগ', category: 'Greetings', icon: '👋' },
    { german: 'Danke schön', bangla: 'অনেক ধন্যবাদ', phonetic: 'ডাঙ্কে শ্যোন', category: 'Courtesy', icon: '🙏' },
    { german: 'Wie geht\'s?', bangla: 'কেমন আছেন?', phonetic: 'ভি গেট্স?', category: 'Conversation', icon: '💬' },
    { german: 'Auf Wiedersehen', bangla: 'আবার দেখা হবে', phonetic: 'আউফ ভিডারজেহেন', category: 'Farewell', icon: '👋' },
    { german: 'Tschüss!', bangla: 'বিদায়!', phonetic: 'চুস!', category: 'Casual', icon: '✨' },
  ];

  protected readonly activeSampleIndex = signal<number>(0);
  protected readonly isCardFlipped = signal<boolean>(false);

  protected readonly currentSample = computed(() => this.sampleWords[this.activeSampleIndex()]);

  // Flip 3D Demo Card
  protected toggleFlip(): void {
    this.isCardFlipped.update(val => !val);
  }

  // Next Demo Card
  protected nextSample(event: Event): void {
    event.stopPropagation();
    this.isCardFlipped.set(false);
    setTimeout(() => {
      this.activeSampleIndex.update(idx => (idx + 1) % this.sampleWords.length);
    }, 220);
  }

  // Play Speech Audio
  protected playAudio(text: string, event?: Event): void {
    if (event) event.stopPropagation();
    if (this.isBrowser && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Quick Feature highlights
  protected readonly features = [
    {
      title: 'বাংলায় সঠিক উচ্চারণ',
      desc: 'প্রতিটি জার্মান শব্দের সঠিক বাংলা সমতুল্য উচ্চারণ ও আন্তর্জাতিক ধ্বনি নির্দেশিকা।',
      icon: '🎙️',
      color: 'from-violet-500 to-indigo-500'
    },
    {
      title: 'স্প্যাশিয়াল ফ্ল্যাশকার্ড ও কুইজ',
      desc: '৩ডি ফ্ল্যাশকার্ড ও গ্যামিফায়েড কুইজ দিয়ে খুব দ্রুত আত্মস্থ করুন।',
      icon: '🧠',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'বাস্তব কথোপকথন ও টিউটর',
      desc: 'দৈনন্দিন বাস্তব জীবনের সংলাপ ও এআই ভয়েস টিউটর চ্যালেঞ্জ।',
      icon: '💬',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'ব্যাকরণ ল্যাবরেটরি',
      desc: 'Der, Die, Das আর্টিকেলের নিয়ম ও কেসের তুলনামূলক চার্ট সহজে আয়ত্ত করুন।',
      icon: '📐',
      color: 'from-amber-500 to-orange-500'
    }
  ];
}
