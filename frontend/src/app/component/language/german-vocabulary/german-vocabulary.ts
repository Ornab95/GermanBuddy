import { Component, OnInit, signal, effect, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { VocabItem, VOCABULARY_DATA } from '../../../data/vocabulary.data';
import { NavBar } from '../../nav-bar/nav-bar';
import { TiltCardDirective } from '../../../directives/tilt-card.directive';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-german-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBar, TiltCardDirective, ScrollRevealDirective],
  templateUrl: './german-vocabulary.html',
  styleUrl: './german-vocabulary.css',
})
export class GermanVocabulary implements OnInit {

  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>;

  // Entire vocab items
  protected readonly vocabItems: VocabItem[] = VOCABULARY_DATA;

  // Track the selected category
  protected readonly selectedCategory = signal<string | null>(null);

  // Track the current mode ('learn' | 'practice')
  protected readonly currentMode = signal<'learn' | 'practice'>('learn');

  // Track flipped state for 3D flashcards in learn mode
  protected readonly flippedCards = signal<Set<number>>(new Set());

  // Computed signal to filter dataset by category
  protected readonly filteredVocab = computed(() => {
    const cat = this.selectedCategory();
    return cat ? this.vocabItems.filter(item => item.category === cat) : [];
  });

  // Quiz states
  protected readonly currentIndex = signal<number>(0);
  protected readonly userInput = signal<string>('');
  protected readonly hasChecked = signal<boolean>(false);
  protected readonly isCorrect = signal<boolean>(false);
  protected readonly isCompleted = signal<boolean>(false);
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

  // Computed current active vocabulary item
  protected readonly currentItem = computed(() => {
    const items = this.filteredVocab();
    const idx = this.currentIndex();
    return items.length > 0 && idx < items.length ? items[idx] : null;
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    // Effect to focus input and auto-play pronunciation when active item changes (only in practice mode)
    effect(() => {
      const item = this.currentItem();
      if (item && this.currentMode() === 'practice' && !this.isCompleted()) {
        this.playAudio(item.word);
        this.focusInput();
      }
    });
  }

  ngOnInit(): void {
    // Listen to route params for category changes
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory.set(category);
        this.currentMode.set('learn'); // Default to learn mode on category switch
        this.currentIndex.set(0);
        this.userInput.set('');
        this.hasChecked.set(false);
        this.isCorrect.set(false);
        this.isCompleted.set(false);
        this.showEmptyWarning.set(false);
        this.scoreCorrect.set(0);
        this.scoreIncorrect.set(0);
        this.streak.set(0);
        this.flippedCards.set(new Set());
      } else {
        this.selectedCategory.set(null);
        this.isCompleted.set(false);
      }
    });
  }

  // Toggle single flashcard 3D flip
  protected toggleCardFlip(id: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.flippedCards.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  protected isCardFlipped(id: number): boolean {
    return this.flippedCards().has(id);
  }

  // Play audio using native speech synthesis
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

  // Toggle modes
  protected setMode(mode: 'learn' | 'practice'): void {
    this.currentMode.set(mode);
    if (mode === 'practice') {
      this.currentIndex.set(0);
      this.userInput.set('');
      this.hasChecked.set(false);
      this.isCorrect.set(false);
      this.isCompleted.set(false);
      this.showEmptyWarning.set(false);
      this.scoreCorrect.set(0);
      this.scoreIncorrect.set(0);
      this.streak.set(0);
      const item = this.currentItem();
      if (item) {
        this.playAudio(item.word);
        this.focusInput();
      }
    }
  }

  // Category Selection trigger
  protected selectCategory(category: string): void {
    this.router.navigate(['/vocabulary', category]);
  }

  // Reset to Category Selector Grid
  protected clearCategory(): void {
    this.router.navigate(['/vocabulary']);
  }

  // Handle value change and warning reset
  protected onInputChange(value: string): void {
    this.userInput.set(value);
    if (value.trim()) {
      this.showEmptyWarning.set(false);
    }
  }

  // Verify answer
  protected checkAnswer(): void {
    const item = this.currentItem();
    if (!item || this.hasChecked()) return;

    if (!this.userInput().trim()) {
      this.showEmptyWarning.set(true);
      return;
    }
    this.showEmptyWarning.set(false);

    const normalizedUser = this.normalize(this.userInput()).toLowerCase();

    // Check Bangla matches
    let isMatch = item.banglaMatches.some(
      match => this.normalize(match).toLowerCase() === normalizedUser
    );

    // Dynamically check English matches if available
    const anyItem = item as any;
    if (!isMatch && anyItem.englishMatches && Array.isArray(anyItem.englishMatches)) {
      isMatch = anyItem.englishMatches.some(
        (match: string) => this.normalize(match).toLowerCase() === normalizedUser
      );
    }
    if (!isMatch && anyItem.english && typeof anyItem.english === 'string') {
      isMatch = this.normalize(anyItem.english).toLowerCase() === normalizedUser;
    }

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

  // Go to next card
  protected loadNext(): void {
    const items = this.filteredVocab();
    const nextIdx = this.currentIndex() + 1;

    if (nextIdx < items.length) {
      this.currentIndex.set(nextIdx);
      this.userInput.set('');
      this.hasChecked.set(false);
      this.isCorrect.set(false);
      this.showEmptyWarning.set(false);
      this.focusInput();
    } else {
      this.isCompleted.set(true);
    }
  }

  // Keyboard shortcut hooks (Enter key)
  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (!this.hasChecked()) {
        this.checkAnswer();
      } else {
        this.loadNext();
      }
    }
  }

  // Restart category quiz
  protected restartCategory(): void {
    if (this.selectedCategory()) {
      this.selectCategory(this.selectedCategory()!);
    }
  }

  // Autofocus helper
  protected focusInput(): void {
    setTimeout(() => {
      const el = this.answerInput?.nativeElement;
      if (el) {
        el.focus();
      }
    }, 50);
  }

  // Normalizer to strip whitespaces and zero-width characters
  private normalize(str: string): string {
    if (!str) return '';
    return str
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim();
  }
}
