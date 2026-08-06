import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBar } from '../../nav-bar/nav-bar';
import { VOCABULARY_DATA, VocabItem } from '../../../data/vocabulary.data';

export interface QuizQuestion {
  targetWord: VocabItem;
  options: string[];
  correctAnswer: string;
}

export interface MatchTile {
  id: string;
  text: string;
  type: 'german' | 'bangla';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-word-game',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBar],
  templateUrl: './word-game.html',
  styleUrl: './word-game.css',
})
export class WordGame implements OnInit {
  protected readonly gameMode = signal<'quiz' | 'match'>('quiz');

  // Stats
  protected readonly score = signal<number>(0);
  protected readonly streak = signal<number>(0);
  protected readonly maxStreak = signal<number>(0);
  protected readonly lives = signal<number>(3);
  protected readonly isGameOver = signal<boolean>(false);
  protected readonly isVictory = signal<boolean>(false);

  // Speed Quiz State
  protected readonly currentQuestion = signal<QuizQuestion | null>(null);
  protected readonly selectedOption = signal<string | null>(null);
  protected readonly isOptionChecked = signal<boolean>(false);
  protected readonly questionsAnswered = signal<number>(0);
  protected readonly totalQuestions = 10;

  // Matching Game State
  protected readonly tiles = signal<MatchTile[]>([]);
  protected readonly selectedTile = signal<MatchTile | null>(null);
  protected readonly isCheckingMatch = signal<boolean>(false);
  protected readonly matchedPairsCount = signal<number>(0);

  ngOnInit(): void {
    this.startQuizGame();
  }

  protected switchMode(mode: 'quiz' | 'match'): void {
    this.gameMode.set(mode);
    if (mode === 'quiz') {
      this.startQuizGame();
    } else {
      this.startMatchGame();
    }
  }

  // -------------------------------------------------------------
  // Speed Quiz Logic
  // -------------------------------------------------------------
  protected startQuizGame(): void {
    this.score.set(0);
    this.streak.set(0);
    this.lives.set(3);
    this.questionsAnswered.set(0);
    this.isGameOver.set(false);
    this.isVictory.set(false);
    this.generateNextQuestion();
  }

  protected generateNextQuestion(): void {
    if (this.questionsAnswered() >= this.totalQuestions) {
      this.isVictory.set(true);
      this.playSynthSound('victory');
      return;
    }

    this.selectedOption.set(null);
    this.isOptionChecked.set(false);

    // Pick random target item
    const randomIndex = Math.floor(Math.random() * VOCABULARY_DATA.length);
    const target = VOCABULARY_DATA[randomIndex];

    // Pick 3 wrong options
    const otherItems = VOCABULARY_DATA.filter((item) => item.id !== target.id);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const wrongOptions = shuffledOthers.slice(0, 3).map((item) => item.meaning);

    const options = [target.meaning, ...wrongOptions].sort(() => 0.5 - Math.random());

    this.currentQuestion.set({
      targetWord: target,
      options,
      correctAnswer: target.meaning,
    });

    // Speak German word automatically
    this.playSpeech(target.word);
  }

  protected selectQuizOption(option: string): void {
    if (this.isOptionChecked() || this.isGameOver()) return;

    this.selectedOption.set(option);
    this.isOptionChecked.set(true);

    const q = this.currentQuestion();
    if (!q) return;

    if (option === q.correctAnswer) {
      // Correct!
      const bonus = (this.streak() + 1) * 10;
      this.score.update((s) => s + 50 + bonus);
      this.streak.update((st) => {
        const next = st + 1;
        if (next > this.maxStreak()) this.maxStreak.set(next);
        return next;
      });
      this.playSynthSound('correct');
    } else {
      // Wrong!
      this.streak.set(0);
      this.lives.update((l) => l - 1);
      this.playSynthSound('wrong');

      if (this.lives() <= 0) {
        this.isGameOver.set(true);
        this.playSynthSound('gameover');
      }
    }
  }

  protected nextQuizQuestion(): void {
    if (this.isGameOver()) return;
    this.questionsAnswered.update((q) => q + 1);
    this.generateNextQuestion();
  }

  // -------------------------------------------------------------
  // Card Matching Game Logic
  // -------------------------------------------------------------
  protected startMatchGame(): void {
    this.score.set(0);
    this.matchedPairsCount.set(0);
    this.selectedTile.set(null);
    this.isCheckingMatch.set(false);
    this.isVictory.set(false);
    this.isGameOver.set(false);

    // Pick 6 random items
    const shuffled = [...VOCABULARY_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);

    const tiles: MatchTile[] = [];
    shuffled.forEach((item, idx) => {
      tiles.push({
        id: `g-${idx}`,
        text: item.word,
        type: 'german',
        pairId: item.id,
        isFlipped: false,
        isMatched: false,
      });
      tiles.push({
        id: `b-${idx}`,
        text: item.meaning,
        type: 'bangla',
        pairId: item.id,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle tiles grid
    tiles.sort(() => 0.5 - Math.random());
    this.tiles.set(tiles);
  }

  protected handleTileClick(tile: MatchTile): void {
    if (tile.isFlipped || tile.isMatched || this.isCheckingMatch() || this.isGameOver()) return;

    // Flip tile
    this.updateTileState(tile.id, { isFlipped: true });
    if (tile.type === 'german') {
      this.playSpeech(tile.text);
    }

    const first = this.selectedTile();
    if (!first) {
      this.selectedTile.set(tile);
    } else {
      // Check match between first and tile
      this.isCheckingMatch.set(true);

      if (first.pairId === tile.pairId && first.type !== tile.type) {
        // MATCH!
        this.playSynthSound('correct');
        this.score.update((s) => s + 100);
        setTimeout(() => {
          this.updateTileState(first.id, { isMatched: true });
          this.updateTileState(tile.id, { isMatched: true });
          this.selectedTile.set(null);
          this.isCheckingMatch.set(false);
          this.matchedPairsCount.update((m) => m + 1);

          if (this.matchedPairsCount() >= 6) {
            this.isVictory.set(true);
            this.playSynthSound('victory');
          }
        }, 500);
      } else {
        // MISMATCH!
        this.playSynthSound('wrong');
        setTimeout(() => {
          this.updateTileState(first.id, { isFlipped: false });
          this.updateTileState(tile.id, { isFlipped: false });
          this.selectedTile.set(null);
          this.isCheckingMatch.set(false);
        }, 900);
      }
    }
  }

  private updateTileState(id: string, update: Partial<MatchTile>): void {
    this.tiles.update((list) =>
      list.map((t) => (t.id === id ? { ...t, ...update } : t))
    );
  }

  // Speech Helper
  protected playSpeech(text: string): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Web Audio Synthesizer Sounds
  protected playSynthSound(type: 'correct' | 'wrong' | 'victory' | 'gameover'): void {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start();
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(164.81, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start();
        osc.stop(now + 0.3);
      } else if (type === 'victory') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start();
        osc.stop(now + 0.6);
      } else if (type === 'gameover') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start();
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn('Synth sound failed:', e);
    }
  }
}

