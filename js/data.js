/* emergency-helplines-bd — dataset
 * Numbers verified from Bangladeshi press reports, October 2026.
 * Re-verify before relying on any number in an emergency.
 * No live data: this file is static and bundled with the app.
 */
"use strict";

window.HELPLINES = [
  {
    id: "999",
    number: "999",
    cat: "emergency",
    nameEn: "National Emergency Service",
    nameBn: "জাতীয় জরুরি সেবা",
    descEn: "One number for Police, Fire Service & Ambulance. Works even at zero balance — press 2 for English.",
    descBn: "পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্সের জন্য একটি নম্বর। শূন্য ব্যালেন্সেও কাজ করে — ইংরেজির জন্য ২ চাপুন।",
    tollFree: true,
    h24: true,
    sources: ["Daily Star", "Dhaka Tribune"]
  },
  {
    id: "109",
    number: "109",
    cat: "women-children",
    nameEn: "Violence Against Women & Children Helpline",
    nameBn: "নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন",
    descEn: "Toll-free helpline for women and children facing violence, open 24/7.",
    descBn: "সহিংসতার শিকার নারী ও শিশুদের জন্য টোল-ফ্রি হেল্পলাইন, ২৪/৭ খোলা।",
    tollFree: true,
    h24: true,
    sources: ["Daily Star"]
  },
  {
    id: "333",
    number: "333",
    cat: "govt",
    nameEn: "National Helpline 333",
    nameBn: "জাতীয় হেল্পলাইন ৩৩৩",
    descEn: "Toll-free government information & social services helpline.",
    descBn: "সরকারি তথ্য ও সামাজিক সেবার টোল-ফ্রি হেল্পলাইন।",
    tollFree: true,
    h24: false,
    sources: ["Daily Star"]
  },
  {
    id: "13219",
    number: "13219",
    cat: "women-children",
    nameEn: "Missing Children (MUN Alert) Helpline",
    nameBn: "নিখোঁজ শিশু (MUN Alert) হেল্পলাইন",
    descEn: "Toll-free helpline for missing children, launched 13 January 2026 by CID + Amber Alert for Bangladesh.",
    descBn: "নিখোঁজ শিশুদের জন্য টোল-ফ্রি হেল্পলাইন, ২০২৬ সালের ১৩ জানুয়ারি চালু।",
    tollFree: true,
    h24: true,
    sources: ["BSS", "Dhaka Tribune", "Daily Star", "TBS"]
  },
  {
    id: "01320017060",
    number: "01320017060",
    cat: "women-children",
    nameEn: "Missing Children Cell, CID",
    nameBn: "নিখোঁজ শিশু সেল, সিআইডি",
    descEn: "CID Missing Children Cell — regular mobile call rates apply.",
    descBn: "সিআইডি নিখোঁজ শিশু সেল — স্বাভাবিক কল চার্জ প্রযোজ্য।",
    tollFree: false,
    h24: false,
    sources: ["BSS"]
  },
  {
    id: "16263",
    number: "16263",
    cat: "health",
    nameEn: "Shastho Batayon (DGHS Telehealth)",
    nameBn: "স্বাস্থ্য বাতায়ন (DGHS টেলিহেলথ)",
    descEn: "Free doctor advice 24/7 from the Directorate General of Health Services.",
    descBn: "স্বাস্থ্য অধিদপ্তরের ২৪/৭ বিনামূল্যে চিকিৎসা পরামর্শ।",
    tollFree: true,
    h24: true,
    warnEn: "Caution: 2026 news reports flagged funding-related disruptions — service may be intermittent.",
    warnBn: "সতর্কতা: ২০২৬ সালের সংবাদে তহবিল-সংক্রান্ত বিঘ্নের খবর এসেছে — সেবা মাঝে মাঝে বন্ধ থাকতে পারে।",
    sources: ["Daily Sun", "Daily Star"]
  },
  {
    id: "106",
    number: "106",
    cat: "govt",
    nameEn: "Anti-Corruption Commission Hotline",
    nameBn: "দুর্নীতি দমন কমিশন হটলাইন",
    descEn: "ACC hotline — free from any mobile operator.",
    descBn: "দুদক হটলাইন — যেকোনো মোবাইল অপারেটর থেকে ফ্রি।",
    tollFree: true,
    h24: false,
    sources: ["Daily Star"]
  },
  {
    id: "105",
    number: "105",
    cat: "govt",
    nameEn: "Election Commission NID Hotline",
    nameBn: "নির্বাচন কমিশন NID হটলাইন",
    descEn: "Toll-free NID helpline during official working hours.",
    descBn: "অফিস চলাকালীন সময়ে টোল-ফ্রি NID হেল্পলাইন।",
    tollFree: true,
    h24: false,
    sources: ["TBS News", "Daily Star"]
  },
  {
    id: "01320001300",
    number: "01320001300",
    cat: "police",
    nameEn: "Police Headquarters Control Room",
    nameBn: "পুলিশ হেডকোয়ার্টার্স কন্ট্রোল রুম",
    descEn: "Bangladesh Police headquarters control room.",
    descBn: "বাংলাদেশ পুলিশ সদর দপ্তরের কন্ট্রোল রুম।",
    tollFree: false,
    h24: false,
    sources: ["Dhaka Tribune"]
  },
  {
    id: "01320182598",
    number: "01320182598",
    cat: "police",
    nameEn: "Highway Police Headquarters",
    nameBn: "হাইওয়ে পুলিশ হেডকোয়ার্টার্স",
    descEn: "For emergencies on national highways.",
    descBn: "জাতীয় মহাসড়কে জরুরি প্রয়োজনে।",
    tollFree: false,
    h24: false,
    sources: ["Dhaka Tribune"]
  },
  {
    id: "01777720029",
    number: "01777720029",
    cat: "police",
    nameEn: "Rapid Action Battalion (RAB)",
    nameBn: "র‍্যাপিড অ্যাকশন ব্যাটালিয়ন (র‍্যাব)",
    descEn: "RAB helpline for serious crimes and emergencies.",
    descBn: "গুরুতর অপরাধ ও জরুরি পরিস্থিতিতে র‍্যাব হেল্পলাইন।",
    tollFree: false,
    h24: false,
    sources: ["Dhaka Tribune"]
  },
  {
    id: "01320177598",
    number: "01320177598",
    cat: "police",
    nameEn: "Railway Police Headquarters",
    nameBn: "রেলওয়ে পুলিশ হেডকোয়ার্টার্স",
    descEn: "For incidents on trains and at railway stations.",
    descBn: "ট্রেন ও রেলস্টেশনে ঘটনার জন্য।",
    tollFree: false,
    h24: false,
    sources: ["Dhaka Tribune"]
  }
];
