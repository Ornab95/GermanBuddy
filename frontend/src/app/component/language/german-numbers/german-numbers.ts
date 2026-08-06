import { Component, OnInit, signal, effect, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBar } from '../../nav-bar/nav-bar';

interface Item {
  german: string;
  pronunciation: string;
  primaryBangla: string;
  banglaMatches: string[];
}

@Component({
  selector: 'app-german-numbers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBar],
  templateUrl: './german-numbers.html',
  styleUrl: './german-numbers.css',
})
export class GermanNumbers implements OnInit {

  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>;

  protected readonly numbers: Item[] = [
    { german: '0', pronunciation: 'Null', primaryBangla: 'নুল', banglaMatches: ['নুল', 'নূল', 'Null', 'null'] },
    { german: '1', pronunciation: 'Eins', primaryBangla: 'আইন্স', banglaMatches: ['আইন্স', 'আইনস', 'Eins', 'eins'] },
    { german: '2', pronunciation: 'Zwei', primaryBangla: 'সোয়াই', banglaMatches: ['সোয়াই', 'সোয়ায়', 'সোয়াই', 'ৎসওয়াই', 'Zwei', 'zwei'] },
    { german: '3', pronunciation: 'Drei', primaryBangla: 'দ্রাই', banglaMatches: ['দ্রাই', 'ড্রাই', 'Drei', 'drei'] },
    { german: '4', pronunciation: 'Vier', primaryBangla: 'ফিয়ার', banglaMatches: ['ফিয়ার', 'ফিয়ার', 'Vier', 'vier'] },
    { german: '5', pronunciation: 'Fünf', primaryBangla: 'ফুন্ফ', banglaMatches: ['ফুন্ফ', 'ফুনফ', 'Fünf', 'fünf'] },
    { german: '6', pronunciation: 'Sechs', primaryBangla: 'জেক্স', banglaMatches: ['জেক্স', 'সেক্স', 'জেকস', 'Sechs', 'sechs'] },
    { german: '7', pronunciation: 'Sieben', primaryBangla: 'জিবেন', banglaMatches: ['জিবেন', 'siben', 'Sieben', 'sieben'] },
    { german: '8', pronunciation: 'Acht', primaryBangla: 'আখৎ', banglaMatches: ['আখৎ', 'আখত', 'Acht', 'acht'] },
    { german: '9', pronunciation: 'Neun', primaryBangla: 'নইন', banglaMatches: ['নইন', 'নয়ন', 'নয়েন', 'Neun', 'neun'] },
    { german: '10', pronunciation: 'Zehn', primaryBangla: 'সেন', banglaMatches: ['সেন', 'জেন', 'চেন', 'ছেন', 'ত্সেন', 'সেইন', 'Zehn', 'zehn'] },
    // 11-20
    { german: '11', pronunciation: 'Elf', primaryBangla: 'এলফ', banglaMatches: ['এলফ', 'এল্ফ', 'Elf', 'elf'] },
    { german: '12', pronunciation: 'Zwölf', primaryBangla: 'সোয়েলফ', banglaMatches: ['সোয়েলফ', 'সোয়েল্ফ', 'ৎসয়েলফ', 'Zwölf', 'zwölf'] },
    { german: '13', pronunciation: 'Dreizehn', primaryBangla: 'দ্রাইসেন', banglaMatches: ['দ্রাইসেন', 'ড্রাইসেন', 'দ্রাইজেন', 'ড্রাইজেন', 'Dreizehn', 'dreizehn'] },
    { german: '14', pronunciation: 'Vierzehn', primaryBangla: 'ফিয়ারসেন', banglaMatches: ['ফিয়ারসেন', 'ফিয়ারজেন', 'Vierzehn', 'vierzehn'] },
    { german: '15', pronunciation: 'Fünfzehn', primaryBangla: 'ফুন্ফসেন', banglaMatches: ['ফুন্ফসেন', 'ফুনফসেন', 'ফুন্ফজেন', 'Fünfzehn', 'fünfzehn'] },
    { german: '16', pronunciation: 'Sechzehn', primaryBangla: 'জেকসেন', banglaMatches: ['জেকসেন', 'জেকজেন', 'Sechzehn', 'sechzehn'] },
    { german: '17', pronunciation: 'Siebzehn', primaryBangla: 'জিবসেন', banglaMatches: ['জিবসেন', 'জিবজেন', 'Siebzehn', 'siebzehn'] },
    { german: '18', pronunciation: 'Achtzehn', primaryBangla: 'আখৎসেন', banglaMatches: ['আখৎসেন', 'আখতসেন', 'আখৎজেন', 'Achtzehn', 'achtzehn'] },
    { german: '19', pronunciation: 'Neunzehn', primaryBangla: 'নইনসেন', banglaMatches: ['নইনসেন', 'নয়েনসেন', 'নইনজেন', 'Neunzehn', 'neunzehn'] },
    { german: '20', pronunciation: 'Zwanzig', primaryBangla: 'সোয়ান্সিখ', banglaMatches: ['সোয়ান্সিখ', 'সোয়ান্সিহ', 'ৎসওয়ান্সিখ', 'Zwanzig', 'zwanzig'] },
    // 21-30
    { german: '21', pronunciation: 'Einundzwanzig', primaryBangla: 'আইনউন্দসোয়ান্সিখ', banglaMatches: ['আইনউন্দসোয়ান্সিখ', 'আইন-উন্দ-সোয়ান্সিখ', 'আইন উন্দ সোয়ান্সিখ', 'Einundzwanzig', 'einundzwanzig'] },
    { german: '22', pronunciation: 'Zweiundzwanzig', primaryBangla: 'সোয়াইউন্দসোয়ান্সিখ', banglaMatches: ['সোয়াইউন্দসোয়ান্সিখ', 'সোয়াই-উন্দ-সোয়ান্সিখ', 'সোয়াই উন্দ সোয়ান্সিখ', 'Zweiundzwanzig', 'zweiundzwanzig'] },
    { german: '23', pronunciation: 'Dreiundzwanzig', primaryBangla: 'দ্রাইউন্দসোয়ান্সিখ', banglaMatches: ['দ্রাইউন্দসোয়ান্সিখ', 'দ্রাই-উন্দ-সোয়ান্সিখ', 'ড্রাই উন্দ সোয়ান্সিখ', 'Dreiundzwanzig', 'dreiundzwanzig'] },
    { german: '24', pronunciation: 'Vierundzwanzig', primaryBangla: 'ফিয়ারউন্দসোয়ান্সিখ', banglaMatches: ['ফিয়ারউন্দসোয়ান্সিখ', 'ফিয়ার-উন্দ-সোয়ান্সিখ', 'ফিয়ার উন্দ সোয়ান্সিখ', 'Vierundzwanzig', 'vierundzwanzig'] },
    { german: '25', pronunciation: 'Fünfundzwanzig', primaryBangla: 'ফুন্ফউন্দসোয়ান্সিখ', banglaMatches: ['ফুন্ফউন্দসোয়ান্সিখ', 'ফুন্ফ-উন্দ-সোয়ান্সিখ', 'ফুনফ উন্দ সোয়ান্সিখ', 'Fünfundzwanzig', 'fünfundzwanzig'] },
    { german: '26', pronunciation: 'Sechsundzwanzig', primaryBangla: 'জেক্সউন্দসোয়ান্সিখ', banglaMatches: ['জেক্সউন্দসোয়ান্সিখ', 'জেক্স-উন্দ-সোয়ান্সিখ', 'জেক্স উন্দ সোয়ান্সিখ', 'Sechsundzwanzig', 'sechsundzwanzig'] },
    { german: '27', pronunciation: 'Siebenundzwanzig', primaryBangla: 'জিবেনউন্দসোয়ান্সিখ', banglaMatches: ['জিবেনউন্দসোয়ান্সিখ', 'জিবেন-উন্দ-সোয়ান্সিখ', 'জিবেন উন্দ সোয়ান্সিখ', 'Siebenundzwanzig', 'siebenundzwanzig'] },
    { german: '28', pronunciation: 'Achtundzwanzig', primaryBangla: 'আখৎউন্দসোয়ান্সিখ', banglaMatches: ['আখৎউন্দসোয়ান্সিখ', 'আখৎ-উন্দ-সোয়ান্সিখ', 'আখত উন্দ সোয়ান্সিখ', 'Achtundzwanzig', 'achtundzwanzig'] },
    { german: '29', pronunciation: 'Neunundzwanzig', primaryBangla: 'নইনউন্দসোয়ান্সিখ', banglaMatches: ['নইনউন্দসোয়ান্সিখ', 'নইন-উন্দ-সোয়ান্সিখ', 'নয়ন উন্দ সোয়ান্সিখ'] },
    { german: '30', pronunciation: 'Dreißig', primaryBangla: 'দ্রাইসিখ', banglaMatches: ['দ্রাইসিখ', 'দ্রাইসিহ', 'ড্রাইসিখ', 'Dreißig', 'dreißig'] },
    // 31-40
    { german: '31', pronunciation: 'Einunddreißig', primaryBangla: 'আইনউন্দদ্রাইসিখ', banglaMatches: ['আইনউন্দদ্রাইসিখ', 'আইন-উন্দ-দ্রাইসিখ', 'আইন উন্দ দ্রাইসিখ', 'Einunddreißig', 'einunddreißig'] },
    { german: '32', pronunciation: 'Zweiunddreißig', primaryBangla: 'সোয়াইউন্দদ্রাইসিখ', banglaMatches: ['সোয়াইউন্দদ্রাইসিখ', 'সোয়াই-উন্দ-দ্রাইসিখ', 'সোয়াই উন্দ দ্রাইসিখ', 'Zweiunddreißig', 'zweiunddreißig'] },
    { german: '33', pronunciation: 'Dreiunddreißig', primaryBangla: 'দ্রাইউন্দদ্রাইসিখ', banglaMatches: ['দ্রাইউন্দদ্রাইসিখ', 'দ্রাই-উন্দ-দ্রাইসিখ', 'ড্রাই উন্দ দ্রাইসিখ', 'Dreiunddreißig', 'dreiunddreißig'] },
    { german: '34', pronunciation: 'Vierunddreißig', primaryBangla: 'ফিয়ারউন্দদ্রাইসিখ', banglaMatches: ['ফিয়ারউন্দদ্রাইসিখ', 'ফিয়ার-উন্দ-দ্রাইসিখ', 'ফিয়ার উন্দ দ্রাইসিখ', 'Vierunddreißig', 'vierunddreißig'] },
    { german: '35', pronunciation: 'Fünfunddreißig', primaryBangla: 'ফুন্ফউন্দদ্রাইসিখ', banglaMatches: ['ফুন্ফউন্দদ্রাইসিখ', 'ফুন্ফ-উন্দ-দ্রাইসিখ', 'Fünfunddreißig', 'fünfunddreißig'] },
    { german: '36', pronunciation: 'Sechsunddreißig', primaryBangla: 'জেক্সউন্দদ্রাইসিখ', banglaMatches: ['জেক্সউন্দদ্রাইসিখ', 'জেক্স-উন্দ-দ্রাইসিখ', 'Sechsunddreißig', 'sechsunddreißig'] },
    { german: '37', pronunciation: 'Siebenunddreißig', primaryBangla: 'জিবেনউন্দদ্রাইসিখ', banglaMatches: ['জিবেনউন্দদ্রাইসিখ', 'জিবেন-উন্দ-দ্রাইসিখ', 'Siebenunddreißig', 'siebenunddreißig'] },
    { german: '38', pronunciation: 'Achtunddreißig', primaryBangla: 'আখৎউন্দদ্রাইসিখ', banglaMatches: ['আখৎউন্দদ্রাইসিখ', 'আখৎ-উন্দ-দ্রাইসিখ', 'Achtunddreißig', 'achtunddreißig'] },
    { german: '39', pronunciation: 'Neununddreißig', primaryBangla: 'নইনউন্দদ্রাইসিখ', banglaMatches: ['নইনউন্দদ্রাইসিখ', 'নইন-উন্দ-দ্রাইসিখ', 'Neununddreißig', 'neununddreißig'] },
    { german: '40', pronunciation: 'Vierzig', primaryBangla: 'ফিয়ারসিখ', banglaMatches: ['ফিয়ারসিখ', 'ফিয়ারসিহ', 'Vierzig', 'vierzig'] },
    // 41-50
    { german: '41', pronunciation: 'Einundvierzig', primaryBangla: 'আইনউন্দফিয়ারসিখ', banglaMatches: ['আইনউন্দফিয়ারসিখ', 'আইন-উন্দ-ফিয়ারসিখ', 'Einundvierzig', 'einundvierzig'] },
    { german: '42', pronunciation: 'Zweiundvierzig', primaryBangla: 'সোয়াইউন্দফিয়ারসিখ', banglaMatches: ['সোয়াইউন্দফিয়ারসিখ', 'সোয়াই-উন্দ-ফিয়ারসিখ', 'Zweiundvierzig', 'zweiundvierzig'] },
    { german: '43', pronunciation: 'Dreiundvierzig', primaryBangla: 'দ্রাইউন্দফিয়ারসিখ', banglaMatches: ['দ্রাইউন্দফিয়ারসিখ', 'দ্রাই-উন্দ-ফিয়ারসিখ', 'Dreiundvierzig', 'dreiundvierzig'] },
    { german: '44', pronunciation: 'Vierundvierzig', primaryBangla: 'ফিয়ারউন্দফিয়ারসিখ', banglaMatches: ['ফিয়ারউন্দফিয়ারসিখ', 'ফিয়ার-উন্দ-ফিয়ারসিখ', 'Vierundvierzig', 'vierundvierzig'] },
    { german: '45', pronunciation: 'Fünfundvierzig', primaryBangla: 'ফুন্ফউন্দফিয়ারসিখ', banglaMatches: ['ফুন্ফউন্দফিয়ারসিখ', 'ফুন্ফ-উন্দ-ফিয়ারসিখ', 'Fünfundvierzig', 'fünfundvierzig'] },
    { german: '46', pronunciation: 'Sechsundvierzig', primaryBangla: 'জেক্সউন্দফিয়ারসিখ', banglaMatches: ['জেক্সউন্দফিয়ারসিখ', 'জেক্স-উন্দ-ফিয়ারসিখ', 'Sechsundvierzig', 'sechsundvierzig'] },
    { german: '47', pronunciation: 'Siebenundvierzig', primaryBangla: 'জিবেনউন্দফিয়ারসিখ', banglaMatches: ['জিবেনউন্দফিয়ারসিখ', 'জিবেন-উন্দ-ফিয়ারসিখ', 'Siebenundvierzig', 'siebenundvierzig'] },
    { german: '48', pronunciation: 'Achtundvierzig', primaryBangla: 'আখৎউন্দফিয়ারসিখ', banglaMatches: ['আখৎউন্দফিয়ারসিখ', 'আখৎ-উন্দ-ফিয়ারসিখ', 'Achtundvierzig', 'achtundvierzig'] },
    { german: '49', pronunciation: 'Neunundvierzig', primaryBangla: 'নইনউন্দফিয়ারসিখ', banglaMatches: ['নইনউন্দফিয়ারসিখ', 'নইন-উন্দ-ফিয়ারসিখ', 'Neunundvierzig', 'neunundvierzig'] },
    { german: '50', pronunciation: 'Fünfzig', primaryBangla: 'ফুন্ফসিখ', banglaMatches: ['ফুন্ফসিখ', 'ফুনফসিখ', 'ফুন্ফসিহ', 'Fünfzig', 'fünfzig'] },
    // 51-60
    { german: '51', pronunciation: 'Einundfünfzig', primaryBangla: 'আইনউন্দফুন্ফসিখ', banglaMatches: ['আইনউন্দফুন্ফসিখ', 'Einundfünfzig', 'einundfünfzig'] },
    { german: '52', pronunciation: 'Zweiundfünfzig', primaryBangla: 'সোয়াইউন্দফুন্ফসিখ', banglaMatches: ['সোয়াইউন্দফুন্ফসিখ', 'Zweiundfünfzig', 'zweiundfünfzig'] },
    { german: '53', pronunciation: 'Dreiundfünfzig', primaryBangla: 'দ্রাইউন্দফুন্ফসিখ', banglaMatches: ['দ্রাইউন্দফুন্ফসিখ', 'Dreiundfünfzig', 'dreiundfünfzig'] },
    { german: '54', pronunciation: 'Vierundfünfzig', primaryBangla: 'ফিয়ারউন্দফুন্ফসিখ', banglaMatches: ['ফিয়ারউন্দফুন্ফসিখ', 'Vierundfünfzig', 'vierundfünfzig'] },
    { german: '55', pronunciation: 'Fünfundfünfzig', primaryBangla: 'ফুন্ফউন্দফুন্ফসিখ', banglaMatches: ['ফুন্ফউন্দফুন্ফসিখ', 'Fünfundfünfzig', 'fünfundfünfzig'] },
    { german: '56', pronunciation: 'Sechsundfünfzig', primaryBangla: 'জেক্সউন্দফুন্ফসিখ', banglaMatches: ['জেক্সউন্দফুন্ফসিখ', 'Sechsundfünfzig', 'sechsundfünfzig'] },
    { german: '57', pronunciation: 'Siebenundfünfzig', primaryBangla: 'জিবেনউন্দফুন্ফসিখ', banglaMatches: ['জিবেনউন্দফুন্ফসিখ', 'Siebenundfünfzig', 'siebenundfünfzig'] },
    { german: '58', pronunciation: 'Achtundfünfzig', primaryBangla: 'আখৎউন্দফুন্ফসিখ', banglaMatches: ['আখৎউন্দফুন্ফসিখ', 'Achtundfünfzig', 'achtundfünfzig'] },
    { german: '59', pronunciation: 'Neunundfünfzig', primaryBangla: 'নইনউন্দফুন্ফসিখ', banglaMatches: ['নইনউন্দফুন্ফসিখ', 'Neunundfünfzig', 'neunundfünfzig'] },
    { german: '60', pronunciation: 'Sechzig', primaryBangla: 'জেখসিখ', banglaMatches: ['জেখসিখ', 'জেখসিহ', 'সেখসিখ', 'Sechzig', 'sechzig'] },
    // 61-70
    { german: '61', pronunciation: 'Einundsechzig', primaryBangla: 'আইনউন্দজেখসিখ', banglaMatches: ['আইনউন্দজেখসিখ', 'Einundsechzig', 'einundsechzig'] },
    { german: '62', pronunciation: 'Zweiundsechzig', primaryBangla: 'সোয়াইউন্দজেখসিখ', banglaMatches: ['সোয়াইউন্দজেখসিখ', 'Zweiundsechzig', 'zweiundsechzig'] },
    { german: '63', pronunciation: 'Dreiundsechzig', primaryBangla: 'দ্রাইউন্দজেখসিখ', banglaMatches: ['দ্রাইউন্দজেখসিখ', 'Dreiundsechzig', 'dreiundsechzig'] },
    { german: '64', pronunciation: 'Vierundsechzig', primaryBangla: 'ফিয়ারউন্দজেখসিখ', banglaMatches: ['ফিয়ারউন্দজেখসিখ', 'Vierundsechzig', 'vierundsechzig'] },
    { german: '65', pronunciation: 'Fünfundsechzig', primaryBangla: 'ফুন্ফউন্দজেখসিখ', banglaMatches: ['ফুন্ফউন্দজেখসিখ', 'Fünfundsechzig', 'fünfundsechzig'] },
    { german: '66', pronunciation: 'Sechsundsechzig', primaryBangla: 'জেক্সউন্দজেখসিখ', banglaMatches: ['জেক্সউন্দজেখসিখ', 'Sechsundsechzig', 'sechsundsechzig'] },
    { german: '67', pronunciation: 'Siebenundsechzig', primaryBangla: 'জিবেনউন্দজেখসিখ', banglaMatches: ['জিবেনউন্দজেখসিখ', 'Siebenundsechzig', 'siebenundsechzig'] },
    { german: '68', pronunciation: 'Achtundsechzig', primaryBangla: 'আখৎউন্দজেখসিখ', banglaMatches: ['আখৎউন্দজেখসিখ', 'Achtundsechzig', 'achtundsechzig'] },
    { german: '69', pronunciation: 'Neunundsechzig', primaryBangla: 'নইনউন্দজেখসিখ', banglaMatches: ['নইনউন্দজেখসিখ', 'Neunundsechzig', 'neunundsechzig'] },
    { german: '70', pronunciation: 'Siebzig', primaryBangla: 'জিবসিখ', banglaMatches: ['জিবসিখ', 'জিবসিহ', 'সিবসিখ', 'Siebzig', 'siebzig'] },
    // 71-80
    { german: '71', pronunciation: 'Einundsiebzig', primaryBangla: 'আইনউন্দজিবসিখ', banglaMatches: ['আইনউন্দজিবসিখ', 'Einundsiebzig', 'einundsiebzig'] },
    { german: '72', pronunciation: 'Zweiundsiebzig', primaryBangla: 'সোয়াইউন্দজিবসিখ', banglaMatches: ['সোয়াইউন্দজিবসিখ', 'Zweiundsiebzig', 'zweiundsiebzig'] },
    { german: '73', pronunciation: 'Dreiundsiebzig', primaryBangla: 'দ্রাইউন্দজিবসিখ', banglaMatches: ['দ্রাইউন্দজিবসিখ', 'Dreiundsiebzig', 'dreiundsiebzig'] },
    { german: '74', pronunciation: 'Vierundsiebzig', primaryBangla: 'ফিয়ারউন্দজিবসিখ', banglaMatches: ['ফিয়ারউন্দজিবসিখ', 'Vierundsiebzig', 'vierundsiebzig'] },
    { german: '75', pronunciation: 'Fünfundsiebzig', primaryBangla: 'ফুন্ফউন্দজিবসিখ', banglaMatches: ['ফুন্ফউন্দজিবসিখ', 'Fünfundsiebzig', 'fünfundsiebzig'] },
    { german: '76', pronunciation: 'Sechsundsiebzig', primaryBangla: 'জেক্সউন্দজিবসিখ', banglaMatches: ['জেক্সউন্দজিবসিখ', 'Sechsundsiebzig', 'sechsundsiebzig'] },
    { german: '77', pronunciation: 'Siebenundsiebzig', primaryBangla: 'জিবেনউন্দজিবসিখ', banglaMatches: ['জিবেনউন্দজিবসিখ', 'Siebenundsiebzig', 'siebenundsiebzig'] },
    { german: '78', pronunciation: 'Achtundsiebzig', primaryBangla: 'আখৎউন্দজিবসিখ', banglaMatches: ['আখৎউন্দজিবসিখ', 'Achtundsiebzig', 'achtundsiebzig'] },
    { german: '79', pronunciation: 'Neunundsiebzig', primaryBangla: 'নইনউন্দজিবসিখ', banglaMatches: ['নইনউন্দজিবসিখ', 'Neunundsiebzig', 'neunundsiebzig'] },
    { german: '80', pronunciation: 'Achtzig', primaryBangla: 'আখৎসিখ', banglaMatches: ['আখৎসিখ', 'আখতসিখ', 'আখৎসিহ'] },
    // 81-90
    { german: '81', pronunciation: 'Einundachtzig', primaryBangla: 'আইনউন্দআখৎসিখ', banglaMatches: ['আইনউন্দআখৎসিখ', 'Einundachtzig', 'einundachtzig'] },
    { german: '82', pronunciation: 'Zweiundachtzig', primaryBangla: 'সোয়াইউন্দআখৎসিখ', banglaMatches: ['সোয়াইউন্দআখৎসিখ', 'Zweiundachtzig', 'zweiundachtzig'] },
    { german: '83', pronunciation: 'Dreiundachtzig', primaryBangla: 'দ্রাইউন্দআখৎসিখ', banglaMatches: ['দ্রাইউন্দআখৎসিখ', 'Dreiundachtzig', 'dreiundachtzig'] },
    { german: '84', pronunciation: 'Vierundachtzig', primaryBangla: 'ফিয়ারউন্দআখৎসিখ', banglaMatches: ['ফিয়ারউন্দআখৎসিখ', 'Vierundachtzig', 'vierundachtzig'] },
    { german: '85', pronunciation: 'Fünfundachtzig', primaryBangla: 'ফুন্ফউন্দআখৎসিখ', banglaMatches: ['ফুন্ফউন্দআখৎসিখ', 'Fünfundachtzig', 'fünfundachtzig'] },
    { german: '86', pronunciation: 'Sechsundachtzig', primaryBangla: 'জেক্সউন্দআখৎসিখ', banglaMatches: ['জেক্সউন্দআখৎসিখ', 'Sechsundachtzig', 'sechsundachtzig'] },
    { german: '87', pronunciation: 'Siebenundachtzig', primaryBangla: 'জিবেনউন্দআখৎসিখ', banglaMatches: ['জিবেনউন্দআখৎসিখ', 'Siebenundachtzig', 'siebenundachtzig'] },
    { german: '88', pronunciation: 'Achtundachtzig', primaryBangla: 'আখৎউন্দআখৎসিখ', banglaMatches: ['আখৎউন্দআখৎসিখ', 'Achtundachtzig', 'achtundachtzig'] },
    { german: '89', pronunciation: 'Neunundachtzig', primaryBangla: 'নইনউন্দআখৎসিখ', banglaMatches: ['নইনউন্দআখৎসিখ', 'Neunundachtzig', 'neunundachtzig'] },
    { german: '90', pronunciation: 'Neunzig', primaryBangla: 'নইনসিখ', banglaMatches: ['নইনসিখ', 'নয়নসিখ', 'নইনসিহ', 'Neunzig', 'neunzig'] },
    // 91-100
    { german: '91', pronunciation: 'Einundneunzig', primaryBangla: 'আইনউন্দনইনসিখ', banglaMatches: ['আইনউন্দনইনসিখ', 'Einundneunzig', 'einundneunzig'] },
    { german: '92', pronunciation: 'Zweiundneunzig', primaryBangla: 'সোয়াইউন্দনইনসিখ', banglaMatches: ['সোয়াইউন্দনইনসিখ', 'Zweiundneunzig', 'zweiundneunzig'] },
    { german: '93', pronunciation: 'Dreiundneunzig', primaryBangla: 'দ্রাইউন্দনইনসিখ', banglaMatches: ['দ্রাইউন্দনইনসিখ', 'Dreiundneunzig', 'dreiundneunzig'] },
    { german: '94', pronunciation: 'Vierundneunzig', primaryBangla: 'ফিয়ারউন্দনইনসিখ', banglaMatches: ['ফিয়ারউন্দনইনসিখ', 'Vierundneunzig', 'vierundneunzig'] },
    { german: '95', pronunciation: 'Fünfundneunzig', primaryBangla: 'ফুন্ফউন্দনইনসিখ', banglaMatches: ['ফুন্ফউন্দনইনসিখ', 'Fünfundneunzig', 'fünfundneunzig'] },
    { german: '96', pronunciation: 'Sechsundneunzig', primaryBangla: 'জেক্সউন্দনইনসিখ', banglaMatches: ['জেক্সউন্দনইনসিখ', 'Sechsundneunzig', 'sechsundneunzig'] },
    { german: '97', pronunciation: 'Siebenundneunzig', primaryBangla: 'জিবেনউন্দনইনসিখ', banglaMatches: ['জিবেনউন্দনইনসিখ', 'Siebenundneunzig', 'siebenundneunzig'] },
    { german: '98', pronunciation: 'Achtundneunzig', primaryBangla: 'আখৎউন্দনইনসিখ', banglaMatches: ['আখৎউন্দনইনসিখ', 'Achtundneunzig', 'achtundneunzig'] },
    { german: '99', pronunciation: 'Neunundneunzig', primaryBangla: 'নইনউন্দনইনসিখ', banglaMatches: ['nEinundneunzig', 'নইনউন্দনইনসিখ', 'Neunundneunzig', 'neunundneunzig'] },
    { german: '100', pronunciation: 'Hundert', primaryBangla: 'হুন্দার্ত', banglaMatches: ['হুন্দার্ত', 'হুন্দারত', 'আইনহুন্দার্ত', 'Hundert', 'hundert'] }
  ];

  // Tab states
  protected readonly activeTab = signal<'learn' | 'practise'>('learn');

  // Pagination states for learning view
  protected readonly numbersVisibleCount = signal<number>(10);
  protected readonly visibleNumbers = computed(() => {
    return this.numbers.slice(0, this.numbersVisibleCount());
  });

  protected showMoreNumbers(): void {
    this.numbersVisibleCount.update(c => Math.min(c + 10, this.numbers.length));
  }

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

  // Bangla virtual keyboard helpers
  protected readonly banglaHelpers = ['ন', 'ই', 'উ', 'ও', 'ট', 'ড', 'ফ', 'ব', 'স', 'ল', 'ম', 'র', 'য়', 'ৎ', 'া', '্', 'ে', 'ি', 'ু', 'ূ'];

  constructor() {
    // Effect to focus input and auto-play pronunciation when current item changes
    effect(() => {
      const item = this.currentItem();
      if (item && this.activeTab() === 'practise') {
        this.playAudio(item.german);
      }
      if (this.activeTab() === 'practise') {
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

  protected selectTab(tab: 'learn' | 'practise'): void {
    this.activeTab.set(tab);
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
  }

  // Load a new random item, avoiding immediate repetition
  protected loadNext(): void {
    if (this.numbers.length === 0) return;

    let nextItem = this.currentItem();
    if (this.numbers.length > 1) {
      while (true) {
        const randomIndex = Math.floor(Math.random() * this.numbers.length);
        const chosen = this.numbers[randomIndex];
        if (!nextItem || chosen.german !== nextItem.german) {
          nextItem = chosen;
          break;
        }
      }
    } else {
      nextItem = this.numbers[0];
    }

    this.currentItem.set(nextItem);
    this.userInput.set('');
    this.hasChecked.set(false);
    this.isCorrect.set(false);
    this.showEmptyWarning.set(false);
    this.focusInput();
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

    const normalizedUser = this.normalize(this.userInput());
    const isMatch = item.banglaMatches.some(
      match => this.normalize(match) === normalizedUser
    );

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

  // Virtual keyboard helper to insert char
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

  // String normalizer
  private normalize(str: string): string {
    if (!str) return '';
    return str
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width spaces/chars
      .trim();
  }
}

