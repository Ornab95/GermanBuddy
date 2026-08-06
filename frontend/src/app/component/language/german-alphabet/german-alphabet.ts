import { Component, OnInit, signal, effect, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NavBar } from '../../nav-bar/nav-bar';

interface Item {
  german: string;
  pronunciation: string;
  primaryBangla: string;
  banglaMatches: string[];
}

@Component({
  selector: 'app-german-alphabet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBar],
  templateUrl: './german-alphabet.html',
  styleUrl: './german-alphabet.css',
})
export class GermanAlphabet implements OnInit {

  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>;

  protected readonly alphabets: Item[] = [
    { german: 'A', pronunciation: 'Ah', primaryBangla: 'আ', banglaMatches: ['আ', 'আহ'] },
    { german: 'B', pronunciation: 'Beh', primaryBangla: 'বে', banglaMatches: ['বে', 'বেহ'] },
    { german: 'C', pronunciation: 'Tseh', primaryBangla: 'ছে', banglaMatches: ['ছে', 'ত্সে', 'ত্সেহ', 'তছে', 'সে'] },
    { german: 'D', pronunciation: 'Deh', primaryBangla: 'ডে', banglaMatches: ['ডে', 'ডেহ'] },
    { german: 'E', pronunciation: 'Eh', primaryBangla: 'এ', banglaMatches: ['এ', 'এহ', 'ই'] },
    { german: 'F', pronunciation: 'Ef', primaryBangla: 'এফ', banglaMatches: ['এফ'] },
    { german: 'G', pronunciation: 'Geh', primaryBangla: 'গে', banglaMatches: ['গে', 'গেহ'] },
    { german: 'H', pronunciation: 'Hah', primaryBangla: 'হা', banglaMatches: ['হা', 'হাহ'] },
    { german: 'I', pronunciation: 'Ee', primaryBangla: 'ই', banglaMatches: ['ই', 'ঈ'] },
    { german: 'J', pronunciation: 'Yot', primaryBangla: 'ইয়ট', banglaMatches: ['ইয়ট', 'ইওত', 'ইওৎ', 'ইউত'] },
    { german: 'K', pronunciation: 'Kah', primaryBangla: 'খা', banglaMatches: ['খা', 'খাহ', 'কা'] },
    { german: 'L', pronunciation: 'El', primaryBangla: 'এল', banglaMatches: ['এল'] },
    { german: 'M', pronunciation: 'Em', primaryBangla: 'এম', banglaMatches: ['এম'] },
    { german: 'N', pronunciation: 'En', primaryBangla: 'এন', banglaMatches: ['এন'] },
    { german: 'O', pronunciation: 'Oh', primaryBangla: 'ও', banglaMatches: ['ও', 'ওহ'] },
    { german: 'P', pronunciation: 'পেহ্', primaryBangla: 'পেহ্', banglaMatches: ['পেহ্', 'পে', 'পেহ'] },
    { german: 'Q', pronunciation: 'Koo', primaryBangla: 'খু', banglaMatches: ['খু', 'খুহ', 'কু'] },
    { german: 'R', pronunciation: 'Er', primaryBangla: 'এয়া', banglaMatches: ['এয়া', 'এর', 'এয়ার'] },
    { german: 'S', pronunciation: 'Es', primaryBangla: 'এস', banglaMatches: ['এস'] },
    { german: 'T', pronunciation: 'Teh', primaryBangla: 'টে', banglaMatches: ['টে', 'টেহ'] },
    { german: 'U', pronunciation: 'Oo', primaryBangla: 'উ', banglaMatches: ['উ', 'ঊ'] },
    { german: 'V', pronunciation: 'Fow', primaryBangla: 'ফাও', banglaMatches: ['ফাও', 'ফাউ'] },
    { german: 'W', pronunciation: 'Veh', primaryBangla: 'ভে', banglaMatches: ['ভে', 'ভেহ'] },
    { german: 'X', pronunciation: 'Iks', primaryBangla: 'ইক্স', banglaMatches: ['ইক্স'] },
    { german: 'Y', pronunciation: 'Ypsilon', primaryBangla: 'উপসিলন', banglaMatches: ['উপসিলন', 'উস্পসিলন', 'ওপসিলন', 'উপ্সিলন'] },
    { german: 'Z', pronunciation: 'Tset', primaryBangla: 'সেট', banglaMatches: ['সেট', 'সেত', 'ত্সেত', 'ৎসেত'] },
    { german: 'Ä', pronunciation: 'A-umlaut', primaryBangla: 'অ্যা', banglaMatches: ['অ্যা', 'এ্যা', 'এ'] },
    { german: 'Ö', pronunciation: 'O-umlaut', primaryBangla: 'ওও', banglaMatches: ['ওও', 'ওই', 'ওয়ে', 'ও'] },
    { german: 'Ü', pronunciation: 'U-umlaut', primaryBangla: 'উই', banglaMatches: ['উই', 'উ', "ঊ"] },
    { german: 'ß', pronunciation: 'Eszett', primaryBangla: 'এস-সেট', banglaMatches: ['এস-সেট', 'এশৎসেত', 'এসজেট', 'এস সেট'] }
  ];

  // Tab states
  protected readonly activeTab = signal<'learn' | 'practise'>('learn');

  // Quiz states
  protected readonly currentItem = signal<Item | null>(null);
  protected readonly userInput = signal<string>('');
  protected readonly hasChecked = signal<boolean>(false);
  protected readonly isCorrect = signal<boolean>(false);
  protected readonly showEmptyWarning = signal<boolean>(false);

  // Statistics
  protected readonly scoreCorrect = signal<number>(0);
  protected readonly scoreIncorrect = signal<number>(0);
  protected readonly streak = signal<number>(0);

  // Computed accuracy
  protected readonly accuracy = computed(() => {
    const total = this.scoreCorrect() + this.scoreIncorrect();
    return total > 0 ? Math.round((this.scoreCorrect() / total) * 100) : 0;
  });

  // German Special Character Helpers for quick selection
  protected readonly germanHelpers = ['Ä', 'Ö', 'Ü', 'ß'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    // Effect to focus input and auto-play pronunciation when current item changes in practice mode
    effect(() => {
      const item = this.currentItem();
      if (item && this.activeTab() === 'practise') {
        this.playAudio(item.german);
        this.focusInput();
      }
    });
  }

  protected playAudio(text: string): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  protected selectTab(tab: 'learn' | 'practise', updateUrl: boolean = true): void {
    this.activeTab.set(tab);
    if (updateUrl) {
      this.router.navigate(['/alphabet', tab]);
    }
    if (tab === 'practise') {
      this.focusInput();
      const item = this.currentItem();
      if (item) {
        this.playAudio(item.german);
      }
    }
  }

  ngOnInit(): void {
    this.loadNext();
    this.route.paramMap.subscribe(params => {
      const tabParam = params.get('tab');
      if (tabParam === 'practise' || tabParam === 'practice') {
        this.selectTab('practise', false);
      } else if (tabParam === 'learn') {
        this.selectTab('learn', false);
      }
    });
  }

  // Load a new random item, avoiding immediate repetition
  protected loadNext(): void {
    if (this.alphabets.length === 0) return;

    let nextItem = this.currentItem();
    if (this.alphabets.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * this.alphabets.length);
        const chosen = this.alphabets[randomIndex];
        if (!nextItem || chosen.german !== nextItem.german) {
          nextItem = chosen;
          break;
        }
      }
    } else {
      nextItem = this.alphabets[0];
    }

    this.currentItem.set(nextItem);
    this.userInput.set('');
    this.hasChecked.set(false);
    this.isCorrect.set(false);
    this.showEmptyWarning.set(false);

    if (this.activeTab() === 'practise' && nextItem) {
      this.playAudio(nextItem.german);
      this.focusInput();
    }
  }

  // Handle value change and warning reset
  protected onInputChange(value: string): void {
    this.userInput.set(value);
    if (value.trim()) {
      this.showEmptyWarning.set(false);
    }
  }

  // Verify answer: checks if user input matches German letter (case-insensitive) or Bangla match
  protected checkAnswer(): void {
    const item = this.currentItem();
    if (!item || this.hasChecked()) return;

    const rawInput = this.userInput().trim();
    if (!rawInput) {
      this.showEmptyWarning.set(true);
      return;
    }
    this.showEmptyWarning.set(false);

    // Normalize letter comparison (case insensitive)
    const targetLetter = item.german.toUpperCase();
    const userLetter = rawInput.toUpperCase();

    // Check letter match OR Bangla match fallback
    const isMatch = (userLetter === targetLetter) || 
      item.banglaMatches.some(m => m.trim() === rawInput);

    this.isCorrect.set(isMatch);
    this.hasChecked.set(true);

    if (isMatch) {
      this.scoreCorrect.update(s => s + 1);
      this.streak.update(s => s + 1);
    } else {
      this.scoreIncorrect.update(s => s + 1);
      this.streak.set(0);
    }
  }

  // Keyboard controls
  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (!this.hasChecked()) {
        this.checkAnswer();
      } else {
        this.loadNext();
      }
    }
  }

  // Virtual helper to insert char
  protected appendChar(char: string): void {
    this.userInput.update(val => val + char);
    this.focusInput();
  }

  // Reset scores and quiz
  protected restartQuiz(): void {
    this.scoreCorrect.set(0);
    this.scoreIncorrect.set(0);
    this.streak.set(0);
    this.loadNext();
  }

  // Helper method for input element focus
  protected focusInput(): void {
    setTimeout(() => {
      const el = this.answerInput?.nativeElement;
      if (el) {
        el.focus();
      }
    }, 50);
  }
}
