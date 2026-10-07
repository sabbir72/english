export interface SlotOption {
  value: string;
  bangla: string;
  thirdPersonValue?: string;
}

export interface TemplateSlot {
  role: string;
  roleBangla: string;
  color: string;
  options: SlotOption[];
}

export interface SentenceTemplate {
  id: string;
  name: string;
  nameBangla: string;
  category: string;
  categoryBangla: string;
  description: string;
  slots: TemplateSlot[];
  computeSentence: (selected: SlotOption[]) => {
    english: string;
    bangla: string;
  };
}

export const BUILDER_TOPIC_CATEGORIES = [
  { id: 'all', label: 'All Templates', labelBn: 'সকল টেমপ্লেট' },
  { id: 'routine', label: 'Daily Routine', labelBn: 'দৈনন্দিন অভ্যাস' },
  { id: 'workplace', label: 'Workplace & Office', labelBn: 'অফিস ও কর্মক্ষেত্র' },
  { id: 'travel', label: 'Travel & Transport', labelBn: 'ভ্রমণ ও যাতায়াত' },
  { id: 'dining', label: 'Food & Dining', labelBn: 'খাবার ও রেস্তোরাঁ' },
  { id: 'desires', label: 'Desires & Plans', labelBn: 'ইচ্ছা ও পরিকল্পনা' },
  { id: 'requests', label: 'Polite Requests', labelBn: 'বিনম্র অনুরোধ' },
  { id: 'opinions', label: 'Opinions & Beliefs', labelBn: 'মতামত ও অনুভূতি' },
  { id: 'past', label: 'Past Stories', labelBn: 'অতীতের ঘটনা' },
  { id: 'future', label: 'Future Aspirations', labelBn: 'ভবিষ্যতের আশা' },
];

export const ALL_SENTENCE_TEMPLATES: SentenceTemplate[] = [
  // 1. Daily Routine
  {
    id: 'subject-verb-object-place-time',
    name: 'Daily Routine: Subject + Verb + Object + Place + Time',
    nameBangla: 'দৈনন্দিন রুটিন: কর্তা + ক্রিয়া + কর্ম + স্থান + সময়',
    category: 'routine',
    categoryBangla: 'দৈনন্দিন অভ্যাস',
    description: '[Subject] + [Verb] + [Object] + [Place] + [Time]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কর্তা (কে?)',
        color: 'indigo',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'You', bangla: 'তুমি / আপনি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'He', bangla: 'সে (ছেলে)', thirdPersonValue: 'He' },
          { value: 'She', bangla: 'সে (মেয়ে)', thirdPersonValue: 'She' },
          { value: 'Rahim', bangla: 'রহিম', thirdPersonValue: 'Rahim' },
        ],
      },
      {
        role: 'Verb',
        roleBangla: 'ক্রিয়া (কি করে?)',
        color: 'sky',
        options: [
          { value: 'practice', bangla: 'চর্চা করি', thirdPersonValue: 'practices' },
          { value: 'learn', bangla: 'শিখি', thirdPersonValue: 'learns' },
          { value: 'read', bangla: 'পড়ি', thirdPersonValue: 'reads' },
          { value: 'drink', bangla: 'পান করি', thirdPersonValue: 'drinks' },
          { value: 'cook', bangla: 'রান্না করি', thirdPersonValue: 'cooks' },
          { value: 'watch', bangla: 'দেখি', thirdPersonValue: 'watches' },
          { value: 'enjoy', bangla: 'উপভোগ করি', thirdPersonValue: 'enjoys' },
        ],
      },
      {
        role: 'Object',
        roleBangla: 'কর্ম (কি জিনিস?)',
        color: 'emerald',
        options: [
          { value: 'spoken English', bangla: 'স্পোকেন ইংরেজি' },
          { value: 'new vocabulary words', bangla: 'নতুন শব্দ' },
          { value: 'inspirational books', bangla: 'অনুপ্রেরণামূলক বই' },
          { value: 'warm green tea', bangla: 'গরম গ্রিন টি' },
          { value: 'healthy meals', bangla: 'স্বাস্থ্যকর খাবার' },
          { value: 'international news', bangla: 'আন্তর্জাতিক খবর' },
          { value: 'grammar rules', bangla: 'ব্যাকরণের নিয়ম' },
        ],
      },
      {
        role: 'Place',
        roleBangla: 'স্থান (কোথায়?)',
        color: 'amber',
        options: [
          { value: 'at home', bangla: 'বাড়িতে' },
          { value: 'in my room', bangla: 'আমার ঘরে' },
          { value: 'in the quiet library', bangla: 'শান্ত লাইব্রেরিতে' },
          { value: 'at the neighborhood cafe', bangla: 'পাড়ার ক্যাফেতে' },
          { value: 'online', bangla: 'অনলাইনে' },
          { value: 'at university', bangla: 'বিশ্ববিদ্যালয়ে' },
        ],
      },
      {
        role: 'Time',
        roleBangla: 'সময় (কখন?)',
        color: 'purple',
        options: [
          { value: 'every single morning', bangla: 'প্রতিটি সকালে' },
          { value: 'before going to bed', bangla: 'ঘুমাতে যাওয়ার আগে' },
          { value: 'in the peaceful evening', bangla: 'শান্ত সন্ধ্যায়' },
          { value: 'during lunch break', bangla: 'দুপুরের বিরতিতে' },
          { value: 'on weekend afternoons', bangla: 'ছুটির দিনের বিকেলে' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sVerb, sObj, sPlace, sTime] = selected;
      const is3rd = ['He', 'She', 'Rahim'].includes(sSub.value);
      const engVerb = is3rd ? sVerb.thirdPersonValue || sVerb.value : sVerb.value;

      let bVerb = sVerb.bangla;
      if (is3rd) {
        if (bVerb === 'চর্চা করি') bVerb = 'চর্চা করে';
        else if (bVerb === 'শিখি') bVerb = 'শেখে';
        else if (bVerb === 'পড়ি') bVerb = 'পড়ে';
        else if (bVerb === 'পান করি') bVerb = 'পান করে';
        else if (bVerb === 'রান্না করি') bVerb = 'রান্না করে';
        else if (bVerb === 'দেখি') bVerb = 'দেখে';
        else if (bVerb === 'উপভোগ করি') bVerb = 'উপভোগ করে';
      } else if (sSub.value === 'You') {
        if (bVerb === 'চর্চা করি') bVerb = 'চর্চা করো';
        else if (bVerb === 'শিখি') bVerb = 'শেখ';
        else if (bVerb === 'পড়ি') bVerb = 'পড়';
        else if (bVerb === 'পান করি') bVerb = 'পান করো';
        else if (bVerb === 'রান্না করি') bVerb = 'রান্না করো';
        else if (bVerb === 'দেখি') bVerb = 'দেখো';
        else if (bVerb === 'উপভোগ করি') bVerb = 'উপভোগ করো';
      }

      const english = `${sSub.value} ${engVerb} ${sObj.value} ${sPlace.value} ${sTime.value}.`;
      const bangla = `${sSub.bangla} ${sTime.bangla} ${sPlace.bangla} ${sObj.bangla} ${bVerb}।`;

      return { english, bangla };
    },
  },

  // 2. Workplace & Office
  {
    id: 'workplace-meeting-task',
    name: 'Workplace & Meeting: Subject + Action + Project + Channel + Target Time',
    nameBangla: 'অফিস ও কর্মক্ষেত্র: কর্তা + কাজের ধরন + বিষয় + মাধ্যম + সময়সীমা',
    category: 'workplace',
    categoryBangla: 'অফিস ও কর্মক্ষেত্র',
    description: '[Subject] + [Will/Must] + [Work Action] + [Project Task] + [Channel] + [Deadline]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কর্মী/টিম',
        color: 'indigo',
        options: [
          { value: 'Our team', bangla: 'আমাদের টিম' },
          { value: 'I', bangla: 'আমি' },
          { value: 'The project manager', bangla: 'প্রজেক্ট ম্যানেজার' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'The developers', bangla: 'ডেভেলপাররা' },
        ],
      },
      {
        role: 'Commitment',
        roleBangla: 'প্রতিশ্রুতি/অক্সিলিয়ারি',
        color: 'sky',
        options: [
          { value: 'will deliver', bangla: 'ডেলিভারি দেবে' },
          { value: 'must finalize', bangla: 'চূড়ান্ত করবে' },
          { value: 'is going to present', bangla: 'উপস্থাপন করতে যাচ্ছে' },
          { value: 'will review', bangla: 'পর্যালোচনা করবে' },
          { value: 'aims to launch', bangla: 'লঞ্চ করার লক্ষ্য নিয়েছে' },
        ],
      },
      {
        role: 'Deliverable',
        roleBangla: 'অফিসের কাজ/টাস্ক',
        color: 'emerald',
        options: [
          { value: 'the quarterly financial report', bangla: 'ত্রৈমাসিক আর্থিক রিপোর্ট' },
          { value: 'the new software feature', bangla: 'নতুন সফটওয়্যার ফিচার' },
          { value: 'the client presentation slides', bangla: 'ক্লায়েন্ট প্রেজেন্টেশন স্লাইড' },
          { value: 'the marketing campaign strategy', bangla: 'মার্কেটিং ক্যাম্পেইন কৌশল' },
          { value: 'the revised contract draft', bangla: 'সংশোধিত চুক্তিপত্র' },
        ],
      },
      {
        role: 'Channel',
        roleBangla: 'মাধ্যম/মিটিং',
        color: 'amber',
        options: [
          { value: 'over the Google Meet call', bangla: 'গুগল মিট কলে' },
          { value: 'via official email', bangla: 'অফিসিয়াল ইমেলের মাধ্যমে' },
          { value: 'in the boardroom meeting', bangla: 'বোর্ডরুম মিটিংয়ে' },
          { value: 'on the Slack channel', bangla: 'স্ল্যাক চ্যানেলে' },
        ],
      },
      {
        role: 'Deadline',
        roleBangla: 'সময়সীমা',
        color: 'purple',
        options: [
          { value: 'by five PM today', bangla: 'আজ বিকাল ৫টার মধ্যে' },
          { value: 'before Friday afternoon', bangla: 'শুক্রবার বিকেলের আগেই' },
          { value: 'first thing tomorrow morning', bangla: 'কাল সকালে সর্বপ্রথম' },
          { value: 'by the end of this sprint', bangla: 'এই স্প্রিন্ট শেষের আগেই' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sComm, sDeliv, sChan, sDead] = selected;
      const english = `${sSub.value} ${sComm.value} ${sDeliv.value} ${sChan.value} ${sDead.value}.`;
      const bangla = `${sSub.bangla} ${sDead.bangla} ${sChan.bangla} ${sDeliv.bangla} ${sComm.bangla}।`;
      return { english, bangla };
    },
  },

  // 3. Travel & Transport
  {
    id: 'travel-exploration-booking',
    name: 'Travel & Transit: Traveler + Travel Action + Destination + Transport + Reason',
    nameBangla: 'ভ্রমণ ও পর্যটন: ভ্রমণকারী + যাত্রা ক্রিয়া + গন্তব্য + বাহন + কারণ',
    category: 'travel',
    categoryBangla: 'ভ্রমণ ও যাতায়াত',
    description: '[Traveler] + [Action] + [Destination] + [Mode] + [Purpose]',
    slots: [
      {
        role: 'Traveler',
        roleBangla: 'ভ্রমণকারী',
        color: 'indigo',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'My family', bangla: 'আমার পরিবার' },
          { value: 'The tourists', bangla: 'পর্যটকেরা' },
        ],
      },
      {
        role: 'Travel Verb',
        roleBangla: 'ভ্রমণ ক্রিয়া',
        color: 'sky',
        options: [
          { value: 'traveled to', bangla: 'ভ্রমণ করেছি' },
          { value: 'booked tickets to', bangla: 'টিকেট কেটেছি' },
          { value: 'plan to visit', bangla: 'ঘুরতে যাওয়ার পরিকল্পনা করছি' },
          { value: 'journeyed across', bangla: 'সফর করেছি' },
        ],
      },
      {
        role: 'Destination',
        roleBangla: 'গন্তব্য',
        color: 'emerald',
        options: [
          { value: 'historic Istanbul', bangla: 'ঐতিহাসিক ইস্তাম্বুল' },
          { value: 'the scenic tea gardens of Sreemangal', bangla: 'শ্রীমঙ্গলের মনোরম চা বাগান' },
          { value: 'central London', bangla: 'সেন্ট্রাল লন্ডন' },
          { value: 'the pristine beaches of Cox’s Bazar', bangla: 'কক্সবাজারের মনোরম সৈকত' },
          { value: 'ancient Cairo', bangla: 'প্রাচীন কায়রো' },
        ],
      },
      {
        role: 'Transport',
        roleBangla: 'যানবাহন',
        color: 'amber',
        options: [
          { value: 'by direct international flight', bangla: 'সরাসরি আন্তর্জাতিক ফ্লাইটে' },
          { value: 'on the express scenic train', bangla: 'এক্সপ্রেস ট্রেনে' },
          { value: 'via rental car', bangla: 'ভাড়ার গাড়িতে' },
          { value: 'by local cruise ship', bangla: 'স্থানীয় ক্রুজ জাহাজে' },
        ],
      },
      {
        role: 'Purpose',
        roleBangla: 'উদ্দেশ্য',
        color: 'purple',
        options: [
          { value: 'to experience local culture', bangla: 'স্থানীয় সংস্কৃতির অভিজ্ঞতা নিতে' },
          { value: 'for a peaceful vacation', bangla: 'শান্তিপূর্ণ ছুটির জন্য' },
          { value: 'to attend an academic conference', bangla: 'শিক্ষামূলক সম্মেলনে অংশ নিতে' },
          { value: 'for culinary exploration', bangla: 'ঐতিহ্যবাহী খাবারের স্বাদ নিতে' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sTrav, sVerb, sDest, sTrans, sPurp] = selected;
      const english = `${sTrav.value} ${sVerb.value} ${sDest.value} ${sTrans.value} ${sPurp.value}.`;
      const bangla = `${sTrav.bangla} ${sPurp.bangla} ${sTrans.bangla} ${sDest.bangla} ${sVerb.bangla}।`;
      return { english, bangla };
    },
  },

  // 4. Dining & Ordering
  {
    id: 'dining-ordering-dish',
    name: 'Food & Dining: Polite Opener + Dish + Customization + Seating Preference',
    nameBangla: 'রেস্তোরাঁয় খাবার অর্ডার: বিনম্র সূচনা + খাবার + বিশেষ অনুরোধ + আসন',
    category: 'dining',
    categoryBangla: 'খাবার ও রেস্তোরাঁ',
    description: '[Polite Opener] + [Food Choice] + [Special Instruction] + [Seating]',
    slots: [
      {
        role: 'Opener',
        roleBangla: 'বিনম্র অর্ডার সূচনা',
        color: 'indigo',
        options: [
          { value: 'Could I please order', bangla: 'আমি কি দয়া করে অর্ডার করতে পারি' },
          { value: 'We would like to have', bangla: 'আমরা নিতে আগ্রহী' },
          { value: 'I will take', bangla: 'আমাকে দিন' },
          { value: 'Could you recommend and bring us', bangla: 'সুপারিশ করে আমাদের জন্য আনুন' },
        ],
      },
      {
        role: 'Dish',
        roleBangla: 'খাবার নির্বাচন',
        color: 'sky',
        options: [
          { value: 'one creamy garlic fettuccine', bangla: 'একটি ক্রিমি গার্লিক ফেটুচিনি' },
          { value: 'the signature beef burger with fries', bangla: 'সিগনেচার বিফ বার্গার ও ফ্রাইস' },
          { value: 'a bowl of hot mushroom soup', bangla: 'এক বাটি গরম মাশরুম স্যুপ' },
          { value: 'a grilled chicken garden salad', bangla: 'গ্রিলড চিকেন গার্ডেন সালাদ' },
          { value: 'authentic mutton kacchi biryani', bangla: 'খাসির কাচ্চি বিরিয়ানি' },
        ],
      },
      {
        role: 'Customization',
        roleBangla: 'বিশেষ আবদার',
        color: 'emerald',
        options: [
          { value: 'with extra cheese and no onions', bangla: 'অতিরিক্ত চিজ এবং পেঁয়াজ ছাড়া' },
          { value: 'with mild spice and garlic bread', bangla: 'হালকা ঝাল ও গার্লিক ব্রেড সহ' },
          { value: 'with olive oil dressing on the side', bangla: 'অলিভ অয়েল ড্রেসিং পাশে আলাদা রেখে' },
          { value: 'well-done and served piping hot', bangla: 'ভালোভাবে ভাজা ও ধোঁয়া ওঠা গরম' },
        ],
      },
      {
        role: 'Table Seating',
        roleBangla: 'টেবিলের অবস্থান',
        color: 'amber',
        options: [
          { value: 'at the table by the window', bangla: 'জানালার পাশের টেবিলে' },
          { value: 'out on the breezy terrace', bangla: 'খোলা ছাদের বারান্দায়' },
          { value: 'in the quiet corner booth', bangla: 'শান্ত কর্নারের বুথে' },
          { value: 'to go in a takeaway bag', bangla: 'পার্সেল টেকঅ্যাওয়ে ব্যাগে' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sOpen, sDish, sCust, sSeat] = selected;
      const english = `${sOpen.value} ${sDish.value} ${sCust.value} ${sSeat.value}, please?`;
      const bangla = `দয়া করে ${sSeat.bangla} ${sCust.bangla} ${sDish.bangla} ${sOpen.bangla}?`;
      return { english, bangla };
    },
  },

  // 5. Desires & Goals
  {
    id: 'desires-plans',
    name: 'Desires & Plans: Subject + Intention + Target Action + Goal Horizon',
    nameBangla: 'ইচ্ছা ও লক্ষ্য: কর্তা + অভিপ্রায় + লক্ষ্যমূলক কাজ + সময়সীমা',
    category: 'desires',
    categoryBangla: 'ইচ্ছা ও পরিকল্পনা',
    description: '[Subject] + [Need/Want/Plan] + [Action] + [Target Goal]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কর্তা',
        color: 'indigo',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'You', bangla: 'তুমি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'He', bangla: 'সে', thirdPersonValue: 'He' },
        ],
      },
      {
        role: 'Intention',
        roleBangla: 'অভিপ্রায় ও ইচ্ছা',
        color: 'sky',
        options: [
          { value: 'want to', bangla: 'করতে চাই', thirdPersonValue: 'wants to' },
          { value: 'need to', bangla: 'করা প্রয়োজন', thirdPersonValue: 'needs to' },
          { value: 'plan to', bangla: 'পরিকল্পনা করছি', thirdPersonValue: 'plans to' },
          { value: 'am determined to', bangla: 'দৃঢ়প্রতিজ্ঞ', thirdPersonValue: 'is determined to' },
          { value: 'would love to', bangla: 'করতে ভীষণ আগ্রহী', thirdPersonValue: 'would love to' },
        ],
      },
      {
        role: 'Action',
        roleBangla: 'কোন কাজ?',
        color: 'emerald',
        options: [
          { value: 'speak English fluently', bangla: 'অনর্গল ইংরেজি বলা' },
          { value: 'master 3000 essential Oxford words', bangla: '৩০০০ প্রয়োজনীয় অক্সফোর্ড শব্দ আয়ত্ত করা' },
          { value: 'score band 8 in IELTS speaking', bangla: 'আইইএলটিএস স্পোকেনে ব্যান্ড ৮ স্কোর করা' },
          { value: 'deliver international tech presentations', bangla: 'আন্তর্জাতিক টেক প্রেজেন্টেশন দেওয়া' },
        ],
      },
      {
        role: 'Timeline',
        roleBangla: 'সময়সীমা',
        color: 'purple',
        options: [
          { value: 'without any fear or hesitation', bangla: 'কোনো দ্বিধা বা ভয় ছাড়া' },
          { value: 'within the next six months', bangla: 'আগামী ছয় মাসের মধ্যে' },
          { value: 'through 15 minutes of daily practice', bangla: 'দৈনিক ১৫ মিনিট অনুশীলনের মাধ্যমে' },
          { value: 'to advance my global career', bangla: 'আমার আন্তর্জাতিক ক্যারিয়ার গড়তে' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sAnchor, sAct, sTgt] = selected;
      const is3rd = sSub.value === 'He';
      const verbPart = is3rd ? sAnchor.thirdPersonValue || sAnchor.value : sAnchor.value;
      const english = `${sSub.value} ${verbPart} ${sAct.value} ${sTgt.value}.`;
      const bangla = `${sSub.bangla} ${sTgt.bangla} ${sAct.bangla} ${sAnchor.bangla}।`;
      return { english, bangla };
    },
  },

  // 6. Polite Requests
  {
    id: 'polite-requests-favors',
    name: 'Polite Requests: Modal + Subject + Polite Action + Contextual Reason',
    nameBangla: 'বিনম্র অনুরোধ: মোডাল + কর্তা + মার্জিত অনুরোধ + প্রসঙ্গ ও কারণ',
    category: 'requests',
    categoryBangla: 'বিনম্র অনুরোধ',
    description: '[Could/Would] + [You] + [Please + Action] + [Topic Context]',
    slots: [
      {
        role: 'Modal Opener',
        roleBangla: 'মার্জিত রূপ',
        color: 'indigo',
        options: [
          { value: 'Could you please', bangla: 'দয়া করে আপনি কি' },
          { value: 'Would you mind', bangla: 'আপনি কিছু মনে না করলে' },
          { value: 'May I politely ask you to', bangla: 'বিনয়ের সাথে আপনাকে বলতে পারি কি' },
          { value: 'Would you be able to', bangla: 'আপনার পক্ষে কি সম্ভব হবে' },
        ],
      },
      {
        role: 'Request Action',
        roleBangla: 'অনুরোধের কাজ',
        color: 'sky',
        options: [
          { value: 'explain this grammar rule again', bangla: 'এই ব্যাকরণের নিয়মটি আবার বুঝিয়ে দেওয়া' },
          { value: 'speak a little slower', bangla: 'একটু ধীরে কথা বলা' },
          { value: 'review my draft presentation', bangla: 'আমার খসড়া প্রেজেন্টেশনটি দেখে দেওয়া' },
          { value: 'send the meeting minutes', bangla: 'মিটিংয়ের কার্যবিবরণী পাঠানো' },
          { value: 'show me the nearest subway station', bangla: 'নিকটস্থ পাতাল রেল স্টেশন দেখিয়ে দেওয়া' },
        ],
      },
      {
        role: 'Reason Context',
        roleBangla: 'কারণ বা ব্যাখ্যা',
        color: 'emerald',
        options: [
          { value: 'so I can understand clearly', bangla: 'যাতে আমি পরিষ্কার বুঝতে পারি' },
          { value: 'before our deadline expires', bangla: 'ডেডলাইন শেষ হওয়ার আগেই' },
          { value: 'whenever you have a free moment', bangla: 'যখনই আপনি একটু অবসর পাবেন' },
          { value: 'as I am new to this city', bangla: 'যেহেতু আমি এই শহরে নতুন' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sMod, sAct, sReas] = selected;
      const isMind = sMod.value.includes('mind');
      let actEng = sAct.value;
      if (isMind) {
        if (actEng.startsWith('explain')) actEng = actEng.replace('explain', 'explaining');
        else if (actEng.startsWith('speak')) actEng = actEng.replace('speak', 'speaking');
        else if (actEng.startsWith('review')) actEng = actEng.replace('review', 'reviewing');
        else if (actEng.startsWith('send')) actEng = actEng.replace('send', 'sending');
        else if (actEng.startsWith('show')) actEng = actEng.replace('show', 'showing');
      }
      const english = `${sMod.value} ${actEng} ${sReas.value}?`;
      const bangla = `${sReas.bangla} ${sMod.bangla} ${sAct.bangla}?`;
      return { english, bangla };
    },
  },

  // 7. Opinions & Beliefs
  {
    id: 'opinions-beliefs-arguments',
    name: 'Opinions & Arguments: Perspective + Subject + Verdict + Supporting Evidence',
    nameBangla: 'মতামত প্রকাশ: দৃষ্টিভঙ্গি + বিষয় + মূল্যায়ন + স্বপক্ষে যুক্তি',
    category: 'opinions',
    categoryBangla: 'মতামত ও অনুভূতি',
    description: '[In my view] + [Subject] + [Is/Can be] + [Attribute] + [Because...]',
    slots: [
      {
        role: 'Perspective Hook',
        roleBangla: 'মতামতের সূচনা',
        color: 'indigo',
        options: [
          { value: 'In my personal view,', bangla: 'আমার ব্যক্তিগত দৃষ্টিতে,' },
          { value: 'From my perspective,', bangla: 'আমার দৃষ্টিকোণ থেকে,' },
          { value: 'I strongly believe that', bangla: 'আমি দৃঢ়ভাবে বিশ্বাস করি যে,' },
          { value: 'It is evident that', bangla: 'এটি অত্যন্ত স্পষ্ট যে,' },
        ],
      },
      {
        role: 'Subject Matter',
        roleBangla: 'মূল বিষয়',
        color: 'sky',
        options: [
          { value: 'daily speaking practice', bangla: 'প্রতিদিনের কথা বলার অভ্যাস' },
          { value: 'making mistakes while learning', bangla: 'শেখার সময় ভুল করা' },
          { value: 'reading authentic English stories', bangla: 'বাস্তব ইংরেজি গল্প পড়া' },
          { value: 'consistent morning study routines', bangla: 'সকালের নিয়মিত পড়াশোনার রুটিন' },
        ],
      },
      {
        role: 'Evaluation',
        roleBangla: 'মূল্যায়ন বা ফলাফল',
        color: 'emerald',
        options: [
          { value: 'is far more effective than rote memorization', bangla: 'মুখস্থ করার চেয়ে অনেক বেশি কার্যকর' },
          { value: 'builds natural fluency and confidence', bangla: 'স্বাভাবিক সাবলীলতা ও আত্মবিশ্বাস গড়ে তোলে' },
          { value: 'is an indispensable step toward mastery', bangla: 'দক্ষতা অর্জনের একটি অপরিহার্য ধাপ' },
          { value: 'accelerates brain language acquisition', bangla: 'মস্তিষ্কের ভাষা গ্রহণ ক্ষমতাকে দ্রুততর করে' },
        ],
      },
      {
        role: 'Rationale',
        roleBangla: 'যুক্তি ও কারণ',
        color: 'purple',
        options: [
          { value: 'because real conversation requires active reflexes.', bangla: 'কারণ বাস্তব কথপোকথনে সক্রিয় প্রতিক্রিয়ার প্রয়োজন হয়।' },
          { value: 'as consistency always beats sporadic intensity.', bangla: 'কারণ দীর্ঘমেয়াদী ধারাবাহিকতা সাময়িক চাপের চেয়ে সবসময় বিজয়ী হয়।' },
          { value: 'because context makes vocabulary memorable.', bangla: 'কারণ প্রাসঙ্গিকতা শব্দকে সহজে মনে রাখতে সাহায্য করে।' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sPersp, sSub, sEval, sRat] = selected;
      const english = `${sPersp.value} ${sSub.value} ${sEval.value} ${sRat.value}`;
      const bangla = `${sPersp.bangla} ${sSub.bangla} ${sEval.bangla}, ${sRat.bangla}`;
      return { english, bangla };
    },
  },

  // 8. Past Stories
  {
    id: 'past-stories-narratives',
    name: 'Past Storytelling: Time Frame + Subject + Action (V2) + Memorable Experience',
    nameBangla: 'অতীতের ঘটনা ও গল্প: সময়ের সূত্র + পাত্র/পাত্রী + অতীত ক্রিয়া (V2) + স্মরণীয় অভিজ্ঞতা',
    category: 'past',
    categoryBangla: 'অতীতের ঘটনা',
    description: '[Past Time] + [Subject] + [Past Action V2] + [Event/Experience]',
    slots: [
      {
        role: 'Time Frame',
        roleBangla: 'অতীতের সময়',
        color: 'indigo',
        options: [
          { value: 'A few years ago,', bangla: 'কয়েক বছর আগে,' },
          { value: 'During my college days,', bangla: 'আমার কলেজ জীবনের দিনগুলোতে,' },
          { value: 'On a rainy afternoon last summer,', bangla: 'গত গ্রীষ্মের এক বর্ষণমুখর বিকেলে,' },
          { value: 'When I first started learning English,', bangla: 'যখন আমি প্রথম ইংরেজি শেখা শুরু করেছিলাম,' },
        ],
      },
      {
        role: 'Subject',
        roleBangla: 'কে বা কারা?',
        color: 'sky',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'my close friend and I', bangla: 'আমি এবং আমার প্রিয় বন্ধু' },
          { value: 'our family', bangla: 'আমাদের পরিবার' },
          { value: 'we', bangla: 'আমরা' },
        ],
      },
      {
        role: 'Past Verb (V2)',
        roleBangla: 'অতীত ক্রিয়া',
        color: 'emerald',
        options: [
          { value: 'discovered', bangla: 'আবিষ্কার করেছিলাম' },
          { value: 'overcame', bangla: 'জয় করেছিলাম' },
          { value: 'embarked on', bangla: 'যাত্রা শুরু করেছিলাম' },
          { value: 'experienced', bangla: 'অভিজ্ঞতা লাভ করেছিলাম' },
        ],
      },
      {
        role: 'Climax & Memory',
        roleBangla: 'স্মরণীয় অভিজ্ঞতা',
        color: 'purple',
        options: [
          { value: 'the incredible magic of reading whole English novels.', bangla: 'পুরো ইংরেজি উপন্যাস পড়ার এক অবিশ্বাস্য জাদু।' },
          { value: 'the profound fear of speaking before a large crowd.', bangla: 'বিশাল জনতার সামনে কথা বলার গভীর ভীতি।' },
          { value: 'an unforgettable road trip across scenic hills.', bangla: 'মনোরম পাহাড়ের বুক চিরে এক অবিস্মরণীয় রোড ট্রিপ।' },
          { value: 'a pivotal moment that transformed my mindset forever.', bangla: 'একটি যুগান্তকারী মুহূর্ত যা আমার জীবনদর্শনকে চিরতরে বদলে দিয়েছিল।' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sTime, sSub, sVerb, sClim] = selected;
      const english = `${sTime.value} ${sSub.value} ${sVerb.value} ${sClim.value}`;
      const bangla = `${sTime.bangla} ${sSub.bangla} ${sClim.bangla} ${sVerb.bangla}।`;
      return { english, bangla };
    },
  },

  // 9. Future Aspirations
  {
    id: 'future-aspirations-milestones',
    name: 'Future Aspirations: Subject + Strong Resolve + Milestone + Visionary Impact',
    nameBangla: 'ভবিষ্যতের আশা ও সংকল্প: কর্তা + দৃঢ় সংকল্প + মাইলফলক + ভবিষ্যৎ প্রভাব',
    category: 'future',
    categoryBangla: 'ভবিষ্যতের আশা',
    description: '[Subject] + [Will/Shall] + [Achieve Milestone] + [Future Impact]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কে?',
        color: 'indigo',
        options: [
          { value: 'I will definitely', bangla: 'আমি নিশ্চিতভাবেই' },
          { value: 'We are confident we will', bangla: 'আমরা আত্মবিশ্বাসী যে আমরা' },
          { value: 'My goal is to', bangla: 'আমার লক্ষ্য হলো' },
          { value: 'By next year, I shall', bangla: 'আগামী বছরের মধ্যে আমি' },
        ],
      },
      {
        role: 'Milestone',
        roleBangla: 'মাইলফলক অর্জন',
        color: 'sky',
        options: [
          { value: 'master complete spoken English fluency', bangla: 'স্পোকেন ইংরেজিতে সম্পূর্ণ সাবলীলতা অর্জন করা' },
          { value: 'secure a high-paying remote global role', bangla: 'উচ্চ বেতনের আন্তর্জাতিক রিমোট চাকরি নিশ্চিত করা' },
          { value: 'write and publish my first bilingual book', bangla: 'আমার প্রথম দ্বিভাষিক বই লেখা ও প্রকাশ করা' },
          { value: 'travel independently across five countries', bangla: 'স্বাধীনভাবে পাঁচটি দেশ ভ্রমণ করা' },
        ],
      },
      {
        role: 'Future Vision',
        roleBangla: 'দূরদৃষ্টি ও প্রভাব',
        color: 'emerald',
        options: [
          { value: 'and inspire thousands of ambitious learners in Bangladesh.', bangla: 'এবং বাংলাদেশের হাজারো তরুণ শিক্ষার্থীকে অনুপ্রাণিত করা।' },
          { value: 'to provide a brighter future for my family.', bangla: 'আমার পরিবারের জন্য একটি উজ্জ্বল ভবিষ্যৎ নিশ্চিত করতে।' },
          { value: 'while breaking all language barriers effortlessly.', bangla: 'অনায়াসে ভাষার সকল বাধা জয় করে।' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sMile, sVis] = selected;
      const english = `${sSub.value} ${sMile.value} ${sVis.value}`;
      const bangla = `${sSub.bangla} ${sMile.bangla} ${sVis.bangla}`;
      return { english, bangla };
    },
  },
];
