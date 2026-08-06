import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
    }, 200);
  }

  // Play Speech Audio
  protected playAudio(text: string, event?: Event): void {
    if (event) event.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
      title: 'বাংলায় সহজ সঠিক উচ্চারণ',
      desc: 'প্রতিটি জার্মান শব্দের সঠিক বাংলা উচ্চারণ ও আন্তর্জাতিক ধ্বনি নির্দেশিকা।',
      icon: '🎙️',
      color: 'from-violet-500 to-indigo-500'
    },
    {
      title: 'শব্দভাণ্ডার ও কুইজ',
      desc: 'ইন্টারেক্টিভ কুইজ ও ফ্ল্যাশকার্ড দিয়ে খুব দ্রুত আত্মস্থ করুন।',
      icon: '🧠',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'বাস্তবসম্মত কথোপকথন',
      desc: 'দৈনন্দিন জীবনের প্রয়োজনীয় বাক্য ও ইন্টারেক্টিভ টিউটর রোলের সুবিধা।',
      icon: '💬',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'অফলাইন ও দ্রুতগতি',
      desc: 'কোনো ঝুটঝামেলা ছাড়াই যেকোনো ডিভাইস থেকে অফলাইনে শেখার অভিজ্ঞতা।',
      icon: '⚡',
      color: 'from-amber-500 to-orange-500'
    }
  ];
}


