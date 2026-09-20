import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TiltCardDirective } from '../../directives/tilt-card.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-landing-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TiltCardDirective,
    ScrollRevealDirective,
  ],
  templateUrl: './landing-preview.html',
  styleUrl: './landing-preview.css',
})
export class LandingPreview {
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Interactive Theme Mode: Dark (default) vs Light
  protected readonly isDarkMode = signal<boolean>(true);

  // 3D Moving German Flag Background columns
  protected readonly flagColumns = Array.from({ length: 14 }, (_, i) => i);

  // Toggle Theme
  protected toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }

  // Set Explicit Theme
  protected setTheme(dark: boolean): void {
    this.isDarkMode.set(dark);
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

  // Frequently Asked Questions State
  protected readonly faqs = signal<FAQItem[]>([
    {
      question: 'DeutschBuddy ব্যবহার করতে কি কোনো ফি বা সাবস্ক্রিপশন লাগবে?',
      answer: 'না, DeutschBuddy সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়। কোনো রেজিস্ট্রেশন ফি বা লুকানো চার্জ নেই। বাংলাভাষী যে কেউ সরাসরি ব্রাউজারে ঢুকে যেকোনো মডিউল শিখতে পারবেন।',
      isOpen: false,
    },
    {
      question: 'প্রতিটি শব্দের কি সঠিক জার্মান উচ্চারণ শোনা যাবে?',
      answer: 'হ্যাঁ! প্রতিটি বর্ণ, শব্দ ও সংলাপের সাথে নেটিভ জার্মান অডিও উচ্চারণ সংযুক্ত রয়েছে। আপনি ক্লিক করলেই প্রমিত জার্মান (Hochdeutsch) উচ্চারণ শুনতে পারবেন।',
      isOpen: false,
    },
    {
      question: 'A1 লেভেলের প্রস্তুতির জন্য DeutschBuddy কতটা সহায়ক?',
      answer: 'DeutschBuddy বিশেষভাবে তৈরি করা হয়েছে প্রারম্ভিক A1 ও A2 লেভেলের শিক্ষার্থীদের ভিত্তি মজবুত করার জন্য। বর্ণমালা, সংখ্যা, দৈনন্দিন ২৫০+ শব্দভাণ্ডার, কথোপকথন এবং Der, Die, Das ও ৩টি কেসের সহজ নিয়ম এতে অন্তর্ভুক্ত।',
      isOpen: false,
    },
    {
      question: 'মোবাইল বা ট্যাবলেটে কি এটি স্বাচ্ছন্দ্যে ব্যবহার করা যাবে?',
      answer: 'অবশ্যই! পুরো প্ল্যাটফর্মটি সম্পূর্ণ রেসপনসিভ। মোবাইল ডিভাইসে ইনস্টাগ্রাম-স্টাইলের নিচের নেভিগেশন বার এবং বড় টাচ-ফ্রেন্ডলি কার্ড থাকায় যেকোনো ডিভাইসেই স্বাচ্ছন্দ্যে শেখা যায়।',
      isOpen: false,
    },
    {
      question: 'ইংরেজি না জেনেও কি শুধু বাংলায় জার্মান শেখা সম্ভব?',
      answer: 'হ্যাঁ! DeutschBuddy-র মূল উদ্দেশ্যই হলো ইংরেজি অনুবাদের জটিলতা এড়িয়ে সরাসরি বাংলা অর্থ ও সহজ বাংলা উচ্চারণের মাধ্যমে জার্মান ভাষা শেখানো।',
      isOpen: false,
    },
  ]);

  // Toggle FAQ item
  protected toggleFaq(index: number): void {
    this.faqs.update(items =>
      items.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item))
    );
  }
}
