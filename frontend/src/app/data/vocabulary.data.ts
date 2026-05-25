export interface VocabItem {
  id: number;
  word: string;
  english: string;
  meaning: string;       // Bangla meaning
  pronunciation: string; // Phonetic Bangla pronunciation
  banglaMatches: string[]; // For user input validation
  category: string;      // Topic tag (e.g., 'food-drink', 'family', 'greetings')
}

export const VOCABULARY_DATA: VocabItem[] = [
  // Greetings & General

  {
    id: 1,
    word: 'Hallo',
    english: 'Hello',
    meaning: 'হ্যালো / ওহে',
    pronunciation: 'হালো',
    banglaMatches: ['হ্যালো', 'ওহে', 'হালো'],
    category: 'greetings'
  },
  {
    id: 2,
    word: 'Danke',
    english: 'Thank you',
    meaning: 'ধন্যবাদ',
    pronunciation: 'ডাঙ্কে',
    banglaMatches: ['ধন্যবাদ', 'ডাঙ্কে'],
    category: 'greetings'
  },
  {
    id: 3,
    word: 'Bitte',
    english: 'Please / You are welcome',
    meaning: 'দয়া করে / আপনাকে স্বাগতম',
    pronunciation: 'বিটে',
    banglaMatches: ['দয়া করে', 'দয়া করে', 'আপনাকে স্বাগতম', 'বিটে'],
    category: 'greetings'
  },
  {
    id: 4,
    word: 'Guten Morgen',
    english: 'Good morning',
    meaning: 'শুভ সকাল',
    pronunciation: 'গুটেন মর্গেন',
    banglaMatches: ['শুভ সকাল', 'গুটেন মর্গেন'],
    category: 'greetings'
  },
  {
    id: 5,
    word: 'Tschüss',
    english: 'Goodbye',
    meaning: 'বিদায়',
    pronunciation: 'চ্যুশ',
    banglaMatches: ['বিদায়', 'বিদায়', 'চ্যুশ', 'চুশ'],
    category: 'greetings'
  },

  // Family & Relationships
  {
    id: 6,
    word: 'die Mutter',
    english: 'Mother',
    meaning: 'মা',
    pronunciation: 'ডি মুটার',
    banglaMatches: ['মা', 'ডি মুটার', 'মুটার'],
    category: 'family'
  },
  {
    id: 7,
    word: 'der Vater',
    english: 'Father',
    meaning: 'বাবা',
    pronunciation: 'ডের ফাট্যার',
    banglaMatches: ['বাবা', 'ডের ফাট্যার', 'ফাট্যার', 'ডের ফাটার', 'ফাটার'],
    category: 'family'
  },
  {
    id: 8,
    word: 'der Bruder',
    english: 'Brother',
    meaning: 'ভাই',
    pronunciation: 'ডের ব্রুডার',
    banglaMatches: ['ভাই', 'ডের ব্রুডার', 'ব্রুডার'],
    category: 'family'
  },
  {
    id: 9,
    word: 'die Schwester',
    english: 'Sister',
    meaning: 'বোন',
    pronunciation: 'ডি শ্বেস্টার',
    banglaMatches: ['বোন', 'ডি শ্বেস্টার', 'শ্বেস্টার', 'ডি সেস্টার', 'সেস্টার'],
    category: 'family'
  },
  {
    id: 10,
    word: 'die Familie',
    english: 'Family',
    meaning: 'পরিবার',
    pronunciation: 'ডি ফামিলিঅ্যা',
    banglaMatches: ['পরিবার', 'ডি ফামিলিঅ্যা', 'ফামিলি', 'ফামিলিঅ্যা'],
    category: 'family'
  },

  // Food & Drink
  {
    id: 11,
    word: 'das Brot',
    english: 'Bread',
    meaning: 'রুটি',
    pronunciation: 'ডাস ব্রোট',
    banglaMatches: ['রুটি', 'ডাস ব্রোট', 'ব্রোট'],
    category: 'food-drink'
  },
  {
    id: 12,
    word: 'das Wasser',
    english: 'Water',
    meaning: 'পানি / জল',
    pronunciation: 'ডাস ভাসার',
    banglaMatches: ['পানি', 'জল', 'ডাস ভাসার', 'ভাসার'],
    category: 'food-drink'
  },
  {
    id: 13,
    word: 'der Apfel',
    english: 'Apple',
    meaning: 'আপেল',
    pronunciation: 'ডের আপফেল',
    banglaMatches: ['আপেল', 'ডের আপফেল', 'আপফেল'],
    category: 'food-drink'
  },
  {
    id: 14,
    word: 'der Tee',
    english: 'Tea',
    meaning: 'চা',
    pronunciation: 'ডের টে',
    banglaMatches: ['চা', 'ডের টে', 'টে'],
    category: 'food-drink'
  },
  {
    id: 15,
    word: 'das Obst',
    english: 'Fruits',
    meaning: 'ফলমূল',
    pronunciation: 'ডাস ওপ্স্ট',
    banglaMatches: ['ফলমূল', 'ফল', 'ডাস ওপ্স্ট', 'ওপ্স্ট', 'ওপ্সট'],
    category: 'food-drink'
  },
  {
    id: 16,
    word: 'der Apfel',
    english: 'Apple',
    meaning: 'আপেল',
    pronunciation: 'ডের আপফেল',
    banglaMatches: ['আপেল', 'ডের আপফেল', 'আপফেল'],
    category: 'food-drink'
  },
  {
    id: 17,
    word: 'Ja',
    english: 'Yes',
    meaning: 'হ্যাঁ',
    pronunciation: 'ইয়া',
    banglaMatches: ['হ্যাঁ', 'হ্যা', 'ইয়া'],
    category: 'greetings'
  },
  {
    id: 18,
    word: 'Nein',
    english: 'No',
    meaning: 'না',
    pronunciation: 'নাইন',
    banglaMatches: ['না', 'নাইন'],
    category: 'greetings'
  },
  {
    id: 19,
    word: 'die Mutter',
    english: 'Mother',
    meaning: 'মা',
    pronunciation: 'ডি মুটার',
    banglaMatches: ['মা', 'আম্মা', 'মাতা', 'মুটার'],
    category: 'family'
  },
  {
    id: 20,
    word: 'der Vater',
    english: 'Father',
    meaning: 'বাবা',
    pronunciation: 'ডের ফাটার',
    banglaMatches: ['বাবা', 'আব্বু', 'পিতা', 'ফাটার'],
    category: 'family'
  },
  {
    id: 21,
    word: 'der Bruder',
    english: 'Brother',
    meaning: 'ভাই',
    pronunciation: 'ডের ব্রুডার',
    banglaMatches: ['ভাই', 'ব্রাদার', 'ব্রুডার'],
    category: 'family'
  },
  {
    id: 22,
    word: 'die Schwester',
    english: 'Sister',
    meaning: 'বোন',
    pronunciation: 'ডি শ্বেস্টার',
    banglaMatches: ['বোন', 'আপু', 'দিদি', 'শ্বেস্টার'],
    category: 'family'
  },
  {
    id: 23,
    word: 'das Brot',
    english: 'Bread',
    meaning: 'রুটি',
    pronunciation: 'দাস ব্রোট',
    banglaMatches: ['রুটি', 'পাউরুটি', 'ব্রোট'],
    category: 'food-drink'
  },
  {
    id: 24,
    word: 'das Wasser',
    english: 'Water',
    meaning: 'পানি',
    pronunciation: 'দাস ভাসার',
    banglaMatches: ['পানি', 'জল', 'ভাসার', 'ওয়াসের'],
    category: 'food-drink'
  },
  {
    id: 25,
    word: 'der Apfel',
    english: 'Apple',
    meaning: 'আপেল',
    pronunciation: 'ডের আপফেল',
    banglaMatches: ['আপেল', 'আপফেল'],
    category: 'food-drink'
  },
  {
    id: 26,
    word: 'die Milch',
    english: 'Milk',
    meaning: 'দুধ',
    pronunciation: 'ডি মিলশ',
    banglaMatches: ['দুধ', 'দুগ্ধ', 'মিলশ'],
    category: 'food-drink'
  },
  {
    id: 27,
    word: 'das Auto',
    english: 'Car',
    meaning: 'গাড়ি',
    pronunciation: 'দাস আউটো',
    banglaMatches: ['গাড়ি', 'গারি', 'কার', 'আউটো'],
    category: 'travel-weather'
  },
  {
    id: 28,
    word: 'das Wetter',
    english: 'Weather',
    meaning: 'আবহাওয়া',
    pronunciation: 'দাস ভেটার',
    banglaMatches: ['আবহাওয়া', 'আবহাওয়া', 'ভেটার'],
    category: 'travel-weather'
  },
  {
    id: 29,
    word: 'die Schule',
    english: 'School',
    meaning: 'স্কুল',
    pronunciation: 'ডি শূলে',
    banglaMatches: ['স্কুল', 'বিদ্যালয়', 'শূলে'],
    category: 'education-work'
  },
  {
    id: 30,
    word: 'das Buch',
    english: 'Book',
    meaning: 'বই',
    pronunciation: 'দাস বুখ',
    banglaMatches: ['বই', 'পুস্তক', 'বুখ'],
    category: 'education-work'
  },
  {
    id: 31,
    word: 'Guten Morgen',
    english: 'Good morning',
    meaning: 'শুভ সকাল',
    pronunciation: 'গুটেন মরগেন',
    banglaMatches: ['শুভ সকাল', 'গুটেন মরগেন', 'গুেটন মর্গেন'],
    category: 'greetings'
  },
  {
    id: 32,
    word: 'Guten Tag',
    english: 'Good day',
    meaning: 'শুভ দিন',
    pronunciation: 'গুটেন টাহগ',
    banglaMatches: ['শুভ দিন', 'শুভ অপরাহ্ন', 'গুটেন টাহগ', 'গুটেন ট্যাগ'],
    category: 'greetings'
  },
  {
    id: 33,
    word: 'Auf Wiedersehen',
    english: 'See you again / Goodbye',
    meaning: 'আবার দেখা হবে',
    pronunciation: 'আউফ ভিডারজেহেন',
    banglaMatches: ['আবার দেখা হবে', 'বিদায়', 'বিদায়', 'আউফ ভিডারজেহেন'],
    category: 'greetings'
  },
  {
    id: 34,
    word: 'Wie geht es dir?',
    english: 'How are you?',
    meaning: 'তুমি কেমন আছো?',
    pronunciation: 'ভি গেট এস ডিয়ার',
    banglaMatches: ['তুমি কেমন আছো?', 'কেমন আছো', 'কেমন আছো?', 'ভি গেট এস ডিয়ার'],
    category: 'greetings'
  },
  {
    id: 35,
    word: 'gut',
    english: 'Good',
    meaning: 'ভালো',
    pronunciation: 'গুট',
    banglaMatches: ['ভালো', 'ভাল', 'গুট'],
    category: 'greetings'
  },
  {
    id: 36,
    word: 'schlecht',
    english: 'Bad',
    meaning: 'খারাপ',
    pronunciation: 'শ্লেখট',
    banglaMatches: ['খারাপ', 'মন্দ', 'শ্লেখট'],
    category: 'greetings'
  },
  {
    id: 37,
    word: 'der Großvater',
    english: 'Grandfather',
    meaning: 'দাদা / নানা',
    pronunciation: 'ডের গ্রোসফাটার',
    banglaMatches: ['দাদা', 'নানা', 'দাদু', 'গ্রোসফাটার', 'দাদামশাই'],
    category: 'family'
  },
  {
    id: 38,
    word: 'die Großmutter',
    english: 'Grandmother',
    meaning: 'দাদী / নানী',
    pronunciation: 'ডি গ্রোসমুটার',
    banglaMatches: ['দাদী', 'নানী', 'দিদা', 'গ্রোসমুটার', 'দিদিমা'],
    category: 'family'
  },
  {
    id: 39,
    word: 'der Sohn',
    english: 'Son',
    meaning: 'পুত্র / ছেলে',
    pronunciation: 'ডের জোন',
    banglaMatches: ['ছেলে', 'পুত্র', 'জোন'],
    category: 'family'
  },
  {
    id: 40,
    word: 'die Tochter',
    english: 'Daughter',
    meaning: 'কন্যা / মেয়ে',
    pronunciation: 'ডি টখটার',
    banglaMatches: ['মেয়ে', 'কন্যা', 'মেয়ে', 'টখটার'],
    category: 'family'
  },
  {
    id: 41,
    word: 'das Kind',
    english: 'Child',
    meaning: 'শিশু / বাচ্চা',
    pronunciation: 'দাস কিন্ড',
    banglaMatches: ['শিশু', 'বাচ্চা', 'কিন্ড'],
    category: 'family'
  },
  {
    id: 42,
    word: 'die Eltern',
    english: 'Parents',
    meaning: 'বাবা-মা',
    pronunciation: 'ডি এলটার্ন',
    banglaMatches: ['বাবা-মা', 'পিতামাতা', 'পিতা-মাতা', 'এলটার্ন'],
    category: 'family'
  },
  {
    id: 43,
    word: 'der Kaffee',
    english: 'Coffee',
    meaning: 'কফি',
    pronunciation: 'ডের কাফে',
    banglaMatches: ['কফি', 'কাফে'],
    category: 'food-drink'
  },
  {
    id: 44,
    word: 'das Fleisch',
    english: 'Meat',
    meaning: 'মাংস',
    pronunciation: 'দাস ফ্লাইশ',
    banglaMatches: ['মাংস', 'গোশত', 'ফ্লাইশ', 'গোস্ত'],
    category: 'food-drink'
  },
  {
    id: 45,
    word: 'der Fisch',
    english: 'Fish',
    meaning: 'মাছ',
    pronunciation: 'ডের ফিশ',
    banglaMatches: ['মাছ', 'ফিশ'],
    category: 'food-drink'
  },
  {
    id: 46,
    word: 'das Gemüse',
    english: 'Vegetables',
    meaning: 'সবজি',
    pronunciation: 'দাস গেমুজে',
    banglaMatches: ['শাকসবজি', 'সবজি', 'সবজী', 'গেমুজে'],
    category: 'food-drink'
  },
  {
    id: 47,
    word: 'das Obst',
    english: 'Fruits',
    meaning: 'ফলমূল',
    pronunciation: 'দাস ওপস্ট',
    banglaMatches: ['ফল', 'ফলমূল', 'ওপস্ট'],
    category: 'food-drink'
  },
  {
    id: 48,
    word: 'das Ei',
    english: 'Egg',
    meaning: 'ডিম',
    pronunciation: 'দাস 아이',
    banglaMatches: ['ডিম', 'আই'],
    category: 'food-drink'
  },
  {
    id: 49,
    word: 'der Bus',
    english: 'Bus',
    meaning: 'বাস',
    pronunciation: 'ডের বুস',
    banglaMatches: ['বাস', 'বুস'],
    category: 'travel-weather'
  },
  {
    id: 50,
    word: 'das Fahrrad',
    english: 'Bicycle',
    meaning: 'সাইকেল',
    pronunciation: 'দাস ফাহরাট',
    banglaMatches: ['সাইকেল', 'বাইসাইকেল', 'ফাহরাট'],
    category: 'travel-weather'
  },
  {
    id: 51,
    word: 'der Bahnhof',
    english: 'Train station',
    meaning: 'রেল স্টেশন',
    pronunciation: 'ডের বানহোফ',
    banglaMatches: ['রেল স্টেশন', 'স্টেশন', 'বানহোফ', 'রেলস্টেশন'],
    category: 'travel-weather'
  },
  {
    id: 52,
    word: 'kalt',
    english: 'Cold',
    meaning: 'ঠান্ডা',
    pronunciation: 'কাল্ট',
    banglaMatches: ['ঠান্ডা', 'ঠাণ্ডা', 'কাল্ট'],
    category: 'travel-weather'
  },
  {
    id: 53,
    word: 'warm',
    english: 'Warm / Hot',
    meaning: 'গরম / উষ্ণ',
    pronunciation: 'ভার্ম',
    banglaMatches: ['গরম', 'উষ্ণ', 'ভার্ম'],
    category: 'travel-weather'
  },
  {
    id: 54,
    word: 'der Wind',
    english: 'Wind',
    meaning: 'বাতাস',
    pronunciation: 'ডের ভিন্ড',
    banglaMatches: ['বাতাস', 'বায়ু', 'ভিন্ড'],
    category: 'travel-weather'
  },
  {
    id: 55,
    word: 'die Hausaufgabe',
    english: 'Homework',
    meaning: 'বাড়ির কাজ',
    pronunciation: 'ডি হাউসআউফগাবে',
    banglaMatches: ['বাড়ির কাজ', 'বাড়ির কাজ', 'হোমওয়ার্ক', 'হাউসআউফগাবে'],
    category: 'education-work'
  },
  {
    id: 56,
    word: 'der Student',
    english: 'Student',
    meaning: 'ছাত্র / শিক্ষার্থী',
    pronunciation: 'ডের স্টুডেন্ট',
    banglaMatches: ['ছাত্র', 'শিক্ষার্থী', 'স্টুডেন্ট', 'ছাত্রী'],
    category: 'education-work'
  },
  {
    id: 57,
    word: 'die Universität',
    english: 'University',
    meaning: 'বিশ্ববিদ্যালয়',
    pronunciation: 'ডি উনিভার্সিটেট',
    banglaMatches: ['বিশ্ববিদ্যালয়', 'বিশ্ববিদ্যালয়', 'ভার্সিটি', 'উনিভার্সিটেট'],
    category: 'education-work'
  },
  {
    id: 58,
    word: 'der Beruf',
    english: 'Profession / Job',
    meaning: 'পেশা / চাকরি',
    pronunciation: 'ডের বেরুফ',
    banglaMatches: ['পেশা', 'চাকরি', 'বেরুফ', 'জীবিকা'],
    category: 'education-work'
  },
  {
    id: 59,
    word: 'der Arzt',
    english: 'Doctor',
    meaning: 'ডাক্তার',
    pronunciation: 'ডের আর্টসট',
    banglaMatches: ['ডাক্তার', 'চিকিৎসক', 'আর্টসট'],
    category: 'education-work'
  },
  {
    id: 60,
    word: 'schreiben',
    english: 'Write / Writing',
    meaning: 'লেখা',
    pronunciation: 'শ্রাইবেন',
    banglaMatches: ['লেখা', 'লিখা', 'শ্রাইবেন'],
    category: 'education-work'
  }
]
