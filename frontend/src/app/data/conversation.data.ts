export interface VocabChip {
  german: string;
  bangla: string;
}

export interface Dialogue {
  id: number;
  speaker: string;
  german: string;
  english: string;
  bangla: string;
  pronunciation: string;
  vocab: VocabChip[];
  grammarTip?: string;
}

export interface Conversation {
  id: string;
  category: string;
  title: string;
  banglaTitle: string;
  level: 'A1' | 'A2';
  estimatedTime: string;
  speakerA: { name: string; role: string; avatar: string };
  speakerB: { name: string; role: string; avatar: string };
  dialogues: Dialogue[];
}

export const CONVERSATION_DATA: Conversation[] = [
  {
    id: 'doctor-visit',
    category: 'Gesundheit (স্বাস্থ্য)',
    title: 'Talking to a Doctor',
    banglaTitle: 'ডাক্তারের সাথে কথোপকথন',
    level: 'A1',
    estimatedTime: '2 Min',
    speakerA: { name: 'Dr. Schmidt', role: 'Doctor', avatar: '👨‍⚕️' },
    speakerB: { name: 'Ornab', role: 'Patient', avatar: '🤕' },
    dialogues: [
      {
        id: 1,
        speaker: 'Dr. Schmidt',
        german: 'Guten Tag! Was fehlt Ihnen?',
        english: 'Good day! What is wrong with you?',
        bangla: 'শুভ দিন! আপনার কী সমস্যা বা কষ্ট হচ্ছে?',
        pronunciation: 'গুটেন তাগ! ভাস ফেহল্ট ইহনেন?',
        vocab: [
          { german: 'Guten Tag', bangla: 'শুভ দিন / হ্যালো' },
          { german: 'was', bangla: 'কী' },
          { german: 'fehlen', bangla: 'অনুপস্থিত থাকা / কষ্ট দেওয়া' }
        ],
        grammarTip: 'জার্মান ভাষায় চিকিৎসকেরা রোগীকে জিজ্ঞেস করার জন্য সাধারণত "Was fehlt Ihnen?" (Formal) বা "Was fehlt dir?" (Informal) ব্যবহার করেন।'
      },
      {
        id: 2,
        speaker: 'Ornab',
        german: 'Guten Tag, Herr Doktor. Ich habe Fieber und Kopfschmerzen.',
        english: 'Good day, doctor. I have a fever and a headache.',
        bangla: 'শুভ দিন, ডাক্তার সাহেব। আমার জ্বর এবং মাথা ব্যথা হয়েছে।',
        pronunciation: 'গুটেন তাগ, হের ডক্টর। ইশ হাবে ফিবার উন্দ কফ-শমার্সেন।',
        vocab: [
          { german: 'haben', bangla: 'আছে / হওয়া' },
          { german: 'das Fieber', bangla: 'জ্বর' },
          { german: 'die Kopfschmerzen', bangla: 'মাথা ব্যথা' }
        ],
        grammarTip: 'শারীরিক কোনো সমস্যা বোঝাতে "Ich habe + রোগ/কষ্ট" গঠন ব্যবহার করা হয়। যেমন: Kopfschmerzen (মাথাব্যথা), Bauchschmerzen (পেটব্যথা)।'
      },
      {
        id: 3,
        speaker: 'Dr. Schmidt',
        german: 'Haben Sie auch Husten oder Schnupfen?',
        english: 'Do you also have a cough or a cold?',
        bangla: 'আপনার কি কাশি বা সর্দিও আছে?',
        pronunciation: 'হাবের জি আউখ হুস্তেন ওডার শ্নুপফেন?',
        vocab: [
          { german: 'auch', bangla: 'ও / এছাড়াও' },
          { german: 'der Husten', bangla: 'কাশি' },
          { german: 'der Schnupfen', bangla: 'সর্দি' }
        ],
        grammarTip: 'প্রশ্ন করার জন্য verb (Haben) সবার প্রথমে আসে, এরপর subject (Sie) বসে।'
      },
      {
        id: 4,
        speaker: 'Ornab',
        german: 'Ja, ich habe ein bisschen Husten.',
        english: 'Yes, I have a little cough.',
        bangla: 'হ্যাঁ, আমার সামান্য কাশি আছে।',
        pronunciation: 'ইয়া, ইশ হাবে আইন বিসশেন হুস্তেন।',
        vocab: [
          { german: 'ja', bangla: 'হ্যাঁ' },
          { german: 'ein bisschen', bangla: 'সামান্য / একটু' }
        ]
      },
      {
        id: 5,
        speaker: 'Dr. Schmidt',
        german: 'Nehmen Sie diese Tabletten dreimal täglich nach dem Essen.',
        english: 'Take these tablets three times a day after meals.',
        bangla: 'খাওয়ার পর এই ট্যাবলেটগুলো দিনে তিনবার করে খাবেন।',
        pronunciation: 'নেমেন জি ডিজা ত্যাবলেতেন দ্রাইমাল টেগ্লিশ নাখ ডেম এসসেন।',
        vocab: [
          { german: 'nehmen', bangla: 'নেওয়া / খাওয়া' },
          { german: 'dreimal täglich', bangla: 'দিনে তিনবার' },
          { german: 'nach dem Essen', bangla: 'খাওয়ার পর' }
        ],
        grammarTip: '"nach dem Essen" এ "nach" একটি dative preposition, তাই neutral noun "das Essen" পরিবর্তিত হয়ে "dem Essen" হয়েছে।'
      },
      {
        id: 6,
        speaker: 'Ornab',
        german: 'Alles klar. Vielen Dank, Herr Doktor!',
        english: 'Alright. Thank you very much, doctor!',
        bangla: 'ঠিক আছে। অনেক ধন্যবাদ, ডাক্তার সাহেব!',
        pronunciation: 'আল্লেস ক্লার। ভিলেন ডাঙ্ক, হের ডক্টর!',
        vocab: [
          { german: 'alles klar', bangla: 'সব ঠিক আছে / বুঝলাম' },
          { german: 'Vielen Dank', bangla: 'অনেক ধন্যবাদ' }
        ]
      },
      {
        id: 7,
        speaker: 'Dr. Schmidt',
        german: 'Gute Besserung! Auf Wiedersehen.',
        english: 'Get well soon! Goodbye.',
        bangla: 'দ্রুত সুস্থ হয়ে উঠুন! বিদায়।',
        pronunciation: 'গুটে বেসসারুং! আউফ ভিডারজেহেন।',
        vocab: [
          { german: 'Gute Besserung', bangla: 'দ্রুত আরোগ্য লাভ করুন' },
          { german: 'Auf Wiedersehen', bangla: 'বিদায় / আবার দেখা হবে' }
        ],
        grammarTip: '"Gute Besserung" হলো কাউকে অসুস্থতা থেকে আরোগ্য কামনা করার ঐতিহ্যবাহী জার্মান অভিব্যক্তি।'
      }
    ]
  },
  {
    id: 'restaurant',
    category: 'Essen & Trinken (খাবার ও পানীয়)',
    title: 'Ordering Food',
    banglaTitle: 'রেস্টুরেন্টে খাবার অর্ডার করা',
    level: 'A1',
    estimatedTime: '2.5 Min',
    speakerA: { name: 'Kellner', role: 'Waiter', avatar: '🤵' },
    speakerB: { name: 'Ornab', role: 'Customer', avatar: '🧑' },
    dialogues: [
      {
        id: 1,
        speaker: 'Kellner',
        german: 'Bitte schön? Was möchten Sie bestellen?',
        english: 'Yes, please? What would you like to order?',
        bangla: 'বলুন প্লিজ? আপনি কী অর্ডার করতে চান?',
        pronunciation: 'বিত্তে শোন? ভাস মোশতেন জি বেশতেল্লেন?',
        vocab: [
          { german: 'bitte schön', bangla: 'বলুন / এই যে নিন' },
          { german: 'möchten', bangla: 'চাওয়া (would like)' },
          { german: 'bestellen', bangla: 'অর্ডার করা' }
        ],
        grammarTip: '"möchten" একটি modal-like verb যা ইচ্ছা প্রকাশ করে। এর সাথে বাক্যের মূল verb (bestellen) বাক্যের একদম শেষে অপরিবর্তিত বা infinitive অবস্থায় বসে।'
      },
      {
        id: 2,
        speaker: 'Ornab',
        german: 'Ich hätte gern eine Suppe als Vorspeise.',
        english: 'I would like to have a soup as an appetizer.',
        bangla: 'আমি স্টার্টার বা ক্ষিধে উদ্রেককারী হিসেবে একটি স্যুপ নিতে পছন্দ করব।',
        pronunciation: 'ইশ হেত্তে গার্ন আইনা জুপ্পে আল্স ফোরশ্পাইজে।',
        vocab: [
          { german: 'ich hätte gern', bangla: 'আমি পছন্দ করব (I would like to have)' },
          { german: 'die Suppe', bangla: 'স্যুপ' },
          { german: 'die Vorspeise', bangla: 'স্টার্টার / মূল খাবারের আগের পদ' }
        ],
        grammarTip: '"Ich hätte gern" রেস্টুরেন্টে কোনো কিছু ভদ্রভাবে চাওয়ার সবচেয়ে প্রচলিত ও মার্জিত রূপ।'
      },
      {
        id: 3,
        speaker: 'Kellner',
        german: 'Und als Hauptgericht?',
        english: 'And as a main course?',
        bangla: 'এবং প্রধান খাবার হিসেবে কী নেবেন?',
        pronunciation: 'উন্দ আল্স হাউপ্টগেরিশট?',
        vocab: [
          { german: 'und', bangla: 'এবং' },
          { german: 'das Hauptgericht', bangla: 'প্রধান খাবার (main course)' }
        ]
      },
      {
        id: 4,
        speaker: 'Ornab',
        german: 'Ich nehme ein Hähnchen mit Reis und einen Salat.',
        english: 'I will take chicken with rice and a salad.',
        bangla: 'আমি ভাত সহ মুরগির মাংস এবং একটি সালাদ নেব।',
        pronunciation: 'ইশ নেমে আইন হেনশেন মিট রাইস উন্দ আইনেন সালাত।',
        vocab: [
          { german: 'nehmen', bangla: 'নেওয়া / খাওয়া' },
          { german: 'das Hähnchen', bangla: 'মুরগির মাংস' },
          { german: 'der Reis', bangla: 'ভাত' },
          { german: 'der Salat', bangla: 'সালাদ' }
        ],
        grammarTip: '"nehmen" verb টি accusative (direct object) দাবি করে। Masculine noun "der Salat" accusative এ পরিবর্তিত হয়ে "einen Salat" হয়েছে, কিন্তু neutral "das Hähnchen" পরিবর্তিত হয়নি ("ein Hähnchen")।'
      },
      {
        id: 5,
        speaker: 'Kellner',
        german: 'Möchten Sie auch etwas trinken?',
        english: 'Would you also like something to drink?',
        bangla: 'আপনি কি পান করার জন্যও কিছু চান?',
        pronunciation: 'মোশতেন জি আউখ এতভাস ত্রিঙ্কেন?',
        vocab: [
          { german: 'etwas', bangla: 'কিছু' },
          { german: 'trinken', bangla: 'পান করা' }
        ]
      },
      {
        id: 6,
        speaker: 'Ornab',
        german: 'Ja, ein Mineralwasser, bitte.',
        english: 'Yes, a mineral water, please.',
        bangla: 'হ্যাঁ, একটি মিনারেল ওয়াটার, প্লিজ।',
        pronunciation: 'ইয়া, আইন মিনেরালভাসসার, বিত্তে।',
        vocab: [
          { german: 'das Mineralwasser', bangla: 'খনিজ পানি / মিনারেল ওয়াটার' },
          { german: 'bitte', bangla: 'দয়া করে / প্লিজ' }
        ]
      },
      {
        id: 7,
        speaker: 'Kellner',
        german: 'Sehr gern. Kommt sofort.',
        english: 'With pleasure. Coming right up.',
        bangla: 'অবশ্যই। এখনই নিয়ে আসছি।',
        pronunciation: 'জের গার্ন। কম্মত জোফোর্ট।',
        vocab: [
          { german: 'sehr gern', bangla: 'খুব আনন্দের সাথে / অবশ্যই' },
          { german: 'sofort', bangla: 'এখনই / অবিলম্বে' }
        ]
      }
    ]
  },
  {
    id: 'greetings',
    category: 'Kontakte (যোগাযোগ)',
    title: 'Greetings & Small Talk',
    banglaTitle: 'কুশল বিনিময় ও পরিচয়',
    level: 'A1',
    estimatedTime: '1.5 Min',
    speakerA: { name: 'Anna', role: 'Student', avatar: '👩‍🎓' },
    speakerB: { name: 'Ornab', role: 'Student', avatar: '🧑🏽' },
    dialogues: [
      {
        id: 1,
        speaker: 'Anna',
        german: 'Hallo! Ich heiße Anna. Wie heißt du?',
        english: 'Hello! My name is Anna. What is your name?',
        bangla: 'হ্যালো! আমার নাম আনা। তোমার নাম কী?',
        pronunciation: 'হাল্লো! ইশ হাইসে আনা। ভি হাইস্ত দু?',
        vocab: [
          { german: 'heißen', bangla: 'নামে ডাকা হওয়া' },
          { german: 'wie', bangla: 'কেমন / কীভাবে' },
          { german: 'du', bangla: 'তুমি' }
        ],
        grammarTip: '"heißen" শব্দের অর্থ "কোনো নামে পরিচিত হওয়া"। "Wie heißt du?" অনানুষ্ঠানিকভাবে বা সমবয়সীদের ক্ষেত্রে ব্যবহৃত হয়।'
      },
      {
        id: 2,
        speaker: 'Ornab',
        german: 'Hallo Anna! Ich bin Ben. Freut mich, dich kennenzulernen.',
        english: 'Hello Anna! I am Ben. Nice to meet you.',
        bangla: 'হ্যালো আনা! আমি বেন। তোমার সাথে পরিচিত হয়ে খুব ভালো লাগল।',
        pronunciation: 'হাল্লো আনা! ইশ বিন বেন। ফ্রয়েত মিশ, ডিশ কেননেন-সু-লেরনেন।',
        vocab: [
          { german: 'sein', bangla: 'হওয়া (am/is/are)' },
          { german: 'freuen', bangla: 'আনন্দিত করা' },
          { german: 'kennenlernen', bangla: 'পরিচিত হওয়া' }
        ],
        grammarTip: '"Freut mich, dich kennenzulernen" বা শুধু "Freut mich" জার্মান ভাষায় কারো সাথে প্রথম পরিচয়ে আনন্দ প্রকাশে ব্যবহৃত হয়।'
      },
      {
        id: 3,
        speaker: 'Anna',
        german: 'Woher kommst du, Ben?',
        english: 'Where do you come from, Ben?',
        bangla: 'তুমি কোথা থেকে এসেছ, বেন?',
        pronunciation: 'ভোহের কম্মস্ত দু, বেন?',
        vocab: [
          { german: 'woher', bangla: 'কোথা থেকে (where from)' },
          { german: 'kommen', bangla: 'আসা' }
        ],
        grammarTip: '"Woher kommst du?" দিয়ে কারো দেশের বাড়ি বা আদি নিবাস জানতে চাওয়া হয়। এর উত্তরে সাধারণত "aus" (থেকে) ব্যবহার করা হয়।'
      },
      {
        id: 4,
        speaker: 'Ornab',
        german: 'Ich komme aus Deutschland, und du?',
        english: 'I come from Germany, and you?',
        bangla: 'আমি জার্মানি থেকে এসেছি, আর তুমি?',
        pronunciation: 'ইশ কম্মে আউস ডয়চলান্দ, উন্দ দু?',
        vocab: [
          { german: 'Deutschland', bangla: 'জার্মানি' },
          { german: 'aus', bangla: 'থেকে' }
        ]
      },
      {
        id: 5,
        speaker: 'Anna',
        german: 'Ich komme aus Bangladesch. Ich wohne jetzt in Berlin.',
        english: 'I come from Bangladesh. I live in Berlin now.',
        bangla: 'আমি বাংলাদেশ থেকে এসেছি। আমি এখন বার্লিনে থাকি।',
        pronunciation: 'ইশ কম্মে আউস বাংলাদেশ। ইশ ভোহনে ইয়েৎসত ইন বার্লিন।',
        vocab: [
          { german: 'wohnen', bangla: 'বাস করা' },
          { german: 'jetzt', bangla: 'এখন' },
          { german: 'in', bangla: 'মধ্যে / ভিতরে' }
        ],
        grammarTip: '"kommen aus" অর্থ কোনো দেশ থেকে আসা, আর "wohnen in" অর্থ কোনো নির্দিষ্ট শহরে বর্তমানে বসবাস করা।'
      },
      {
        id: 6,
        speaker: 'Ornab',
        german: 'Oh, Berlin ist wunderschön! Viel Spaß dort!',
        english: 'Oh, Berlin is beautiful! Have fun there!',
        bangla: 'ওহ, বার্লিন দারুণ সুন্দর! সেখানে তোমার সময় ভালো কাটুক!',
        pronunciation: 'ওহ, বার্লিন ইস্ত ভুন্ডারশোন! ফিল শ্পাস ডোর্ট!',
        vocab: [
          { german: 'wunderschön', bangla: 'চমৎকার সুন্দর' },
          { german: 'Viel Spaß', bangla: 'উপভোগ করো / অনেক মজা হোক' },
          { german: 'dort', bangla: 'সেখানে' }
        ]
      },
      {
        id: 7,
        speaker: 'Anna',
        german: 'Danke, Ben! Tschüss!',
        english: 'Thank you, Ben! Bye!',
        bangla: 'ধন্যবাদ, বেন! বিদায়!',
        pronunciation: 'ডাঙ্কে, বেন! চ্যুস!',
        vocab: [
          { german: 'danke', bangla: 'ধন্যবাদ' },
          { german: 'tschüss', bangla: 'বিদায়' }
        ],
        grammarTip: '"Tschüss" হলো জার্মান ভাষায় সবচেয়ে অনানুষ্ঠানিক ও বহুল ব্যবহৃত বিদায়সূচক শব্দ।'
      }
    ]
  }
];
