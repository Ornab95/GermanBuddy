import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBar } from '../../nav-bar/nav-bar';
import { TiltCardDirective } from '../../../directives/tilt-card.directive';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';

export interface GrammarRule {
  article: string;
  gender: string;
  banglaGender: string;
  colorClass: string;
  bgGradient: string;
  endings: string[];
  examples: { german: string; bangla: string; phonetic: string }[];
}

export interface CaseExample {
  germanCase: string;
  role: string;
  banglaRole: string;
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
  sampleSentence: {
    german: string;
    bangla: string;
    explanation: string;
  };
}

@Component({
  selector: 'app-german-grammar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBar, TiltCardDirective, ScrollRevealDirective],
  templateUrl: './german-grammar.html',
  styleUrl: './german-grammar.css',
})
export class GermanGrammar {
  private isBrowser = false;

  // Active Tab: 'articles' | 'cases' | 'verbs'
  protected readonly activeTab = signal<'articles' | 'cases' | 'verbs'>('articles');

  // Article Rules Data
  protected readonly articleRules: GrammarRule[] = [
    {
      article: 'der',
      gender: 'Maskulin (পুংলিঙ্গ)',
      banglaGender: 'পুরুষবাচক বিশেষ্য',
      colorClass: 'text-blue-400',
      bgGradient: 'from-blue-600/20 to-indigo-600/20',
      endings: ['-er', '-ismus', '-ist', '-or', '-ling'],
      examples: [
        { german: 'der Mann', bangla: 'পুরুষ / লোকটি', phonetic: 'ডের মান' },
        { german: 'der Lehrer', bangla: 'শিক্ষক', phonetic: 'ডের লেরার' },
        { german: 'der Computer', bangla: 'কম্পিউটার', phonetic: 'ডের কম্প্যুটার' },
        { german: 'der Optimismus', bangla: 'আশাবাদ', phonetic: 'ডের অপটিমিজমুস' }
      ]
    },
    {
      article: 'die',
      gender: 'Feminin (স্ত্রীলিঙ্গ)',
      banglaGender: 'স্ত্রীবাচক বিশেষ্য',
      colorClass: 'text-pink-400',
      bgGradient: 'from-pink-600/20 to-rose-600/20',
      endings: ['-ung', '-heit', '-keit', '-schaft', '-tät', '-ion'],
      examples: [
        { german: 'die Frau', bangla: 'মহিলা / নারী', phonetic: 'ডি ফ্রাউ' },
        { german: 'die Zeitung', bangla: 'সংবাদপত্র', phonetic: 'ডি সাইটুং' },
        { german: 'die Freiheit', bangla: 'স্বাধীনতা', phonetic: 'ডি ফ্রাইহাইট' },
        { german: 'die Nation', bangla: 'জাতি', phonetic: 'ডি নাতসিওন' }
      ]
    },
    {
      article: 'das',
      gender: 'Neutral (ক্লীবলিঙ্গ)',
      banglaGender: 'নিরপেক্ষ বিশেষ্য',
      colorClass: 'text-emerald-400',
      bgGradient: 'from-emerald-600/20 to-teal-600/20',
      endings: ['-chen', '-lein', '-ment', '-um', '-ma'],
      examples: [
        { german: 'das Kind', bangla: 'শিশু / সন্তান', phonetic: 'ডাস কিন্ড' },
        { german: 'das Mädchen', bangla: 'বালিকা / মেয়ে', phonetic: 'ডাস মেডশেন' },
        { german: 'das Auto', bangla: 'গাড়ি', phonetic: 'ডাস আউটো' },
        { german: 'das Zentrum', bangla: 'কেন্দ্র', phonetic: 'ডাস সেনট্রুম' }
      ]
    },
    {
      article: 'die (Plural)',
      gender: 'Plural (বহুবচন)',
      banglaGender: 'যেকোনো বহুবচনের নির্দিষ্ট আর্টিকেল',
      colorClass: 'text-violet-400',
      bgGradient: 'from-violet-600/20 to-purple-600/20',
      endings: ['-e', '-er', '-n', '-en', '-s'],
      examples: [
        { german: 'die Kinder', bangla: 'শিশুরা', phonetic: 'ডি কিন্ডার' },
        { german: 'die Bücher', bangla: 'বইগুলো', phonetic: 'ডি ব্যুশার' },
        { german: 'die Autos', bangla: 'গাড়িগুলো', phonetic: 'ডি আউটোস' }
      ]
    }
  ];

  // Cases Comparison Data
  protected readonly cases: CaseExample[] = [
    {
      germanCase: 'Nominativ',
      role: 'Subject (কর্তা)',
      banglaRole: 'বাক্যে যে কাজটি করে বা যাকে নিয়ে মূল কথা বলা হয়',
      masculine: 'der (ein)',
      feminine: 'die (eine)',
      neuter: 'das (ein)',
      plural: 'die (-)',
      sampleSentence: {
        german: 'Der Mann liest ein Buch.',
        bangla: 'লোকটি একটি বই পড়ছে।',
        explanation: '"Der Mann" এখানে বাক্যের কর্তা (Subject), তাই এটি Nominativ।'
      }
    },
    {
      germanCase: 'Akkusativ',
      role: 'Direct Object (কর্ম)',
      banglaRole: 'কাজের প্রত্যক্ষ লক্ষ্য বা কর্ম (কাকে / কী দিয়ে প্রশ্ন করলে পাওয়া যায়)',
      masculine: 'den (einen)',
      feminine: 'die (eine)',
      neuter: 'das (ein)',
      plural: 'die (-)',
      sampleSentence: {
        german: 'Ich sehe den Hund.',
        bangla: 'আমি কুকুরটিকে দেখছি।',
        explanation: 'পুরুষবাচক "der Hund" কর্ম হওয়ায় Akkusativ-এ পরিবর্তিত হয়ে "den Hund" হয়েছে।'
      }
    },
    {
      germanCase: 'Dativ',
      role: 'Indirect Object (সম্প্ৰদান / গৌণ কর্ম)',
      banglaRole: 'কাকে দেওয়া হচ্ছে বা কার জন্য করা হচ্ছে (to/for whom)',
      masculine: 'dem (einem)',
      feminine: 'der (einer)',
      neuter: 'dem (einem)',
      plural: 'den (+n)',
      sampleSentence: {
        german: 'Ich gebe dem Kind den Apfel.',
        bangla: 'আমি শিশুটিকে আপেলটি দিচ্ছি।',
        explanation: '"dem Kind" যাকে দেওয়া হচ্ছে (Dativ), আর "den Apfel" যা দেওয়া হচ্ছে (Akkusativ)।'
      }
    }
  ];

  // Verb Conjugation Table
  protected readonly verbConjugations = [
    { pronoun: 'ich (আমি)', regular: '-e', sein: 'bin', haben: 'habe', lernen: 'lerne' },
    { pronoun: 'du (তুমি)', regular: '-st', sein: 'bist', haben: 'hast', lernen: 'lernst' },
    { pronoun: 'er/sie/es (সে/তিনি)', regular: '-t', sein: 'ist', haben: 'hat', lernen: 'lernt' },
    { pronoun: 'wir (আমরা)', regular: '-en', sein: 'sind', haben: 'haben', lernen: 'lernen' },
    { pronoun: 'ihr (তোমরা)', regular: '-t', sein: 'seid', haben: 'habt', lernen: 'lernt' },
    { pronoun: 'sie/Sie (তারা/আপনি)', regular: '-en', sein: 'sind', haben: 'haben', lernen: 'lernen' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  protected setTab(tab: 'articles' | 'cases' | 'verbs'): void {
    this.activeTab.set(tab);
  }

  protected playAudio(text: string): void {
    if (this.isBrowser && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }
}
