import { Component, OnInit, signal, effect, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CONVERSATION_DATA, Conversation, Dialogue } from '../../../data/conversation.data';
import { NavBar } from '../../nav-bar/nav-bar';

@Component({
  selector: 'app-german-conversation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBar],
  templateUrl: './german-conversation.html',
  styleUrl: './german-conversation.css',
})
export class GermanConversation implements OnInit, OnDestroy {

  // Raw conversations list
  protected readonly conversations = signal<Conversation[]>(CONVERSATION_DATA);

  // Active state signals
  protected readonly selectedConversationId = signal<string | null>(null);
  protected readonly currentDialogueIndex = signal<number>(-1);
  protected readonly isPlayingAll = signal<boolean>(false);
  protected readonly playbackSpeed = signal<number>(0.75);
  protected readonly isSpeaking = signal<boolean>(false);
  protected readonly activeSpeaker = signal<string | null>(null);
  protected readonly bookmarkedIds = signal<Set<string>>(new Set());
  protected readonly isCompleted = signal<boolean>(false);
  protected readonly isAutoPlayMode = signal<boolean>(true);

  // Repeat-after-me (AI Tutor) practice signals
  protected readonly showRepeatPanel = signal<boolean>(false);
  protected readonly isRecording = signal<boolean>(false);
  protected readonly recognitionResult = signal<string>('');
  protected readonly recognitionScore = signal<number | null>(null);
  protected readonly recognitionSuccess = signal<boolean>(false);

  // Completion modal control
  protected readonly showCompletedModal = signal<boolean>(false);

  // Web Speech API references
  private speechUtterance: SpeechSynthesisUtterance | null = null;
  private autoPlayTimeoutId: any = null;
  private speechRecognition: any = null;

  // Computed: Active Conversation Details
  protected readonly activeConversation = computed(() => {
    const id = this.selectedConversationId();
    return id ? this.conversations().find((c) => c.id === id) || null : null;
  });

  // Computed: Progress percentage of the active dialogue
  protected readonly progressPercentage = computed(() => {
    const conv = this.activeConversation();
    if (!conv) return 0;
    const idx = this.currentDialogueIndex();
    if (idx === -1) return 0;
    return Math.round(((idx + 1) / conv.dialogues.length) * 100);
  });

  // Computed: Get active dialogue item
  protected readonly currentDialogue = computed(() => {
    const conv = this.activeConversation();
    const idx = this.currentDialogueIndex();
    if (conv && idx >= 0 && idx < conv.dialogues.length) {
      return conv.dialogues[idx];
    }
    return null;
  });

  constructor() {
    // Initializing SpeechRecognition if available in the browser
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.lang = 'de-DE';
        this.speechRecognition.interimResults = false;
        this.speechRecognition.maxAlternatives = 1;

        this.speechRecognition.onstart = () => {
          this.isRecording.set(true);
          this.recognitionResult.set('আওয়াজ শুনছি... বলুন...');
          this.recognitionScore.set(null);
        };

        this.speechRecognition.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          this.recognitionResult.set(resultText);
          this.evaluatePronunciation(resultText);
        };

        this.speechRecognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isRecording.set(false);
          if (event.error === 'no-speech') {
            this.recognitionResult.set('কোনো আওয়াজ পাওয়া যায়নি। আবার চেষ্টা করুন।');
          } else {
            this.recognitionResult.set('মাইক্রোফোন অ্যাক্সেস করা যায়নি।');
          }
        };

        this.speechRecognition.onend = () => {
          this.isRecording.set(false);
        };
      }
    }

    // Effect to auto-scroll speaking dialog into view
    effect(() => {
      const idx = this.currentDialogueIndex();
      if (idx !== -1 && typeof document !== 'undefined') {
        setTimeout(() => {
          const activeEl = document.getElementById(`dialogue-${idx}`);
          if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    });
  }

  ngOnInit(): void {
    // Load bookmarks from local storage
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('german_conversation_bookmarks');
      if (stored) {
        try {
          this.bookmarkedIds.set(new Set(JSON.parse(stored)));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.pauseSpeech();
  }

  // Set the selected conversation category
  protected selectConversation(id: string): void {
    this.playAudioFeedback('click');
    this.selectedConversationId.set(id);
    this.currentDialogueIndex.set(0);
    this.isPlayingAll.set(false);
    this.isCompleted.set(false);
    this.showCompletedModal.set(false);
    this.showRepeatPanel.set(false);
    this.recognitionResult.set('');
    this.recognitionScore.set(null);

    // Auto-play the first sentence
    setTimeout(() => {
      this.playSentence(0);
    }, 400);
  }

  // Close conversation view and return to grid
  protected exitConversation(): void {
    this.playAudioFeedback('click');
    this.pauseSpeech();
    this.selectedConversationId.set(null);
    this.currentDialogueIndex.set(-1);
    this.isPlayingAll.set(false);
    this.isCompleted.set(false);
    this.showCompletedModal.set(false);
    this.showRepeatPanel.set(false);
  }

  // Play a single sentence at the specified index
  protected playSentence(index: number): void {
    const conv = this.activeConversation();
    if (!conv || index < 0 || index >= conv.dialogues.length) return;

    this.cancelSpeechSynth();

    this.currentDialogueIndex.set(index);
    const dialogue = conv.dialogues[index];
    this.activeSpeaker.set(dialogue.speaker);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSpeaking.set(true);

      // Extract raw German sentence, remove any punctuation helpers for pronunciation
      const cleanGerman = dialogue.german.replace(/[¿¡!?.,]/g, '');

      this.speechUtterance = new SpeechSynthesisUtterance(cleanGerman);
      this.speechUtterance.lang = 'de-DE';
      this.speechUtterance.rate = this.playbackSpeed();

      this.speechUtterance.onend = () => {
        this.isSpeaking.set(false);
        this.activeSpeaker.set(null);

        // If playing all, queue the next one
        if (this.isPlayingAll()) {
          const nextIndex = index + 1;
          if (nextIndex < conv.dialogues.length) {
            this.autoPlayTimeoutId = setTimeout(() => {
              this.playSentence(nextIndex);
            }, 1000);
          } else {
            // Reached the end
            this.isPlayingAll.set(false);
            this.isCompleted.set(true);
            this.playAudioFeedback('success');
            this.showCompletedModal.set(true);
          }
        }
      };

      this.speechUtterance.onerror = (e) => {
        console.error('Speech error:', e);
        this.isSpeaking.set(false);
        this.activeSpeaker.set(null);
      };

      window.speechSynthesis.speak(this.speechUtterance);
    }
  }

  // Play dialogue item vocabulary chip audio
  protected playVocabWord(word: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent speech bubble hover trigger
    this.playAudioFeedback('click');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Play/Resume entire conversation sequentially
  protected togglePlayAll(): void {
    this.playAudioFeedback('click');
    if (this.isPlayingAll()) {
      this.pauseSpeech();
    } else {
      this.isPlayingAll.set(true);
      // Start from current dialogue, or from 0 if completed
      const idx = this.currentDialogueIndex();
      const conv = this.activeConversation();
      if (conv) {
        const startIndex = idx >= 0 && idx < conv.dialogues.length && !this.isCompleted() ? idx : 0;
        this.isCompleted.set(false);
        this.playSentence(startIndex);
      }
    }
  }

  // Pause speech audio playback
  protected pauseSpeech(): void {
    this.isPlayingAll.set(false);
    this.cancelSpeechSynth();
    this.isSpeaking.set(false);
    this.activeSpeaker.set(null);
  }

  // Replay active speech dialogue bubble
  protected replayCurrent(): void {
    this.playAudioFeedback('click');
    const idx = this.currentDialogueIndex();
    if (idx >= 0) {
      this.playSentence(idx);
    }
  }

  // Navigate manually to the next dialogue bubble
  protected nextSentence(): void {
    this.playAudioFeedback('click');
    const idx = this.currentDialogueIndex();
    const conv = this.activeConversation();
    if (conv && idx < conv.dialogues.length - 1) {
      this.playSentence(idx + 1);
    }
  }

  // Navigate manually to the previous dialogue bubble
  protected prevSentence(): void {
    this.playAudioFeedback('click');
    const idx = this.currentDialogueIndex();
    if (idx > 0) {
      this.playSentence(idx - 1);
    }
  }

  // Change pronunciation speed
  protected setSpeed(speed: number): void {
    this.playAudioFeedback('click');
    this.playbackSpeed.set(speed);
    // If playing, re-speak current sentence to apply speed
    if (this.isSpeaking()) {
      this.replayCurrent();
    }
  }

  // Toggle bookmark conversation
  protected toggleBookmark(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.playAudioFeedback('click');
    this.bookmarkedIds.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      // Persist in local storage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('german_conversation_bookmarks', JSON.stringify(Array.from(newSet)));
      }
      return newSet;
    });
  }

  // Trigger microphone capture for repeating sentence
  protected startListening(): void {
    if (!this.speechRecognition) {
      this.recognitionResult.set('দুঃখিত, এই ব্রাউজারে স্পিচ রিকগনিশন সাপোর্ট করে না। (Chrome ব্যবহার করুন)');
      return;
    }
    this.playAudioFeedback('click');
    this.recognitionResult.set('শুনছি...');
    this.recognitionScore.set(null);
    try {
      this.speechRecognition.start();
    } catch (e) {
      console.error(e);
      this.speechRecognition.stop();
    }
  }

  // Evaluate the user's spoken input vs the active dialogue sentence
  private evaluatePronunciation(spokenText: string): void {
    const active = this.currentDialogue();
    if (!active) return;

    // Clean strings (remove spaces, lowercase, remove punctuation)
    const cleanSpoken = spokenText
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const cleanTarget = active.german
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Simple word match scoring
    const spokenWords = cleanSpoken.split(' ');
    const targetWords = cleanTarget.split(' ');

    let matches = 0;
    targetWords.forEach((word) => {
      if (spokenWords.includes(word)) {
        matches++;
      }
    });

    const score = Math.round((matches / targetWords.length) * 100);
    this.recognitionScore.set(score);
    this.recognitionSuccess.set(score >= 70);

    if (score >= 70) {
      this.playAudioFeedback('success');
    } else {
      this.playAudioFeedback('click');
    }
  }

  // Synthesize lightweight browser AudioContext sounds for UI micro-interactions
  protected playAudioFeedback(type: 'hover' | 'click' | 'success'): void {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'success') {
        // Play short two-tone arpeggio
        osc.type = 'sine';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start();
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn('Web Audio Feedback failed:', e);
    }
  }

  // Clear running timers and synthesis
  private cancelSpeechSynth(): void {
    if (this.autoPlayTimeoutId) {
      clearTimeout(this.autoPlayTimeoutId);
      this.autoPlayTimeoutId = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
