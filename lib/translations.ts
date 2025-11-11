// Complete translations for all world languages
export const translations: Record<string, { title: string; button: string }> = {
  // English
  en: { title: "How To Download Any Premium Script From This Website", button: "Continue" },
  // Spanish
  es: { title: "Cómo Descargar Cualquier Script Premium De Este Sitio Web", button: "Continuar" },
  // French
  fr: { title: "Comment Télécharger Tout Script Premium De Ce Site Web", button: "Continuer" },
  // German
  de: { title: "So laden Sie jedes Premium-Skript von dieser Website herunter", button: "Fortsetzen" },
  // Italian
  it: { title: "Come scaricare qualsiasi script premium da questo sito web", button: "Continua" },
  // Portuguese
  pt: { title: "Como Baixar Qualquer Script Premium Deste Site", button: "Continuar" },
  // Russian
  ru: { title: "Как загрузить любой премиум-скрипт с этого сайта", button: "Продолжить" },
  // Japanese
  ja: { title: "このウェブサイトから任意のプレミアムスクリプトをダウンロードする方法", button: "続行" },
  // Chinese (Simplified)
  zh: { title: "如何从此网站下载任何高级脚本", button: "继续" },
  // Chinese (Traditional)
  "zh-TW": { title: "如何從此網站下載任何高級腳本", button: "繼續" },
  // Korean
  ko: { title: "이 웹사이트에서 모든 프리미엄 스크립트를 다운로드하는 방법", button: "계속" },
  // Arabic
  ar: { title: "كيفية تنزيل أي برنامج نصي مميز من هذا الموقع", button: "متابعة" },
  // Turkish
  tr: { title: "Bu Web Sitesinden Herhangi Bir Premium Komut Dosyasını İndirme Yöntemi", button: "Devam Et" },
  // Polish
  pl: { title: "Jak pobrać dowolny premium skrypt z tej strony internetowej", button: "Kontynuuj" },
  // Dutch
  nl: { title: "Hoe u een premium script van deze website downloadt", button: "Doorgaan" },
  // Swedish
  sv: { title: "Så här laddar du ner ett premiumskript från denna webbplats", button: "Fortsätt" },
  // Danish
  da: { title: "Sådan downloader du et premiumscript fra dette websted", button: "Fortsæt" },
  // Norwegian
  no: { title: "Slik laster du ned et premiumskript fra dette nettstedet", button: "Fortsett" },
  // Finnish
  fi: { title: "Kuinka lataat premium-komentosarjan tältä verkkosivustolta", button: "Jatka" },
  // Czech
  cs: { title: "Jak si stáhnout libovolný premium skript z tohoto webu", button: "Pokračovat" },
  // Hungarian
  hu: { title: "Hogyan töltsd le bármelyik premium szkriptet erről a webhelyről", button: "Folytatás" },
  // Romanian
  ro: { title: "Cum să descărcați orice script premium de pe acest site", button: "Continuați" },
  // Greek
  el: { title: "Πώς να κατεβάσετε οποιοδήποτε Premium Script από αυτόν τον ιστότοπο", button: "Συνέχεια" },
  // Hebrew
  he: { title: "כיצד להוריד כל סקריפט פרימיום מאתר זה", button: "המשך" },
  // Thai
  th: { title: "วิธีดาวน์โหลดพรีเมียมสคริปต์ใดๆ จากเว็บไซต์นี้", button: "ต่อไป" },
  // Vietnamese
  vi: { title: "Cách tải xuống bất kỳ tập lệnh cao cấp nào từ trang web này", button: "Tiếp tục" },
  // Indonesian
  id: { title: "Cara Mengunduh Skrip Premium Apa Pun dari Situs Web Ini", button: "Lanjutkan" },
  // Tagalog
  tl: { title: "Paano I-download ang Anumang Premium Script Mula sa Website Na Ito", button: "Magpatuloy" },
  // Hindi
  hi: { title: "इस वेबसाइट से कोई भी प्रीमियम स्क्रिप्ट कैसे डाउनलोड करें", button: "जारी रखें" },
  // Bengali
  bn: { title: "এই ওয়েবসাইট থেকে যেকোনো প্রিমিয়াম স্ক্রিপ্ট কীভাবে ডাউনলোড করবেন", button: "চালিয়ে যান" },
  // Urdu
  ur: { title: "اس ویب سائٹ سے کوئی بھی پریمیم اسکرپٹ کیسے ڈاؤن لوڈ کریں", button: "جاری رکھیں" },
  // Farsi/Persian
  fa: { title: "نحوه دانلود هر اسکریپت اختصاصی از این وب سایت", button: "ادامه" },
  // Default fallback
  default: { title: "How To Download Any Premium Script From This Website", button: "Continue" },
}

// Country code to language mapping
export const countryToLanguage: Record<string, string> = {
  // English-speaking countries
  us: "en",
  gb: "cy", // Override for Welsh users
  au: "en",
  ca: "en",
  nz: "en",
  ie: "en",
  sg: "en",
  hk: "en",
  // Spanish-speaking countries
  es: "es",
  mx: "es",
  ag: "es",
  ar: "es",
  co: "es",
  ve: "es",
  pe: "es",
  cl: "es",
  ec: "es",
  bo: "es",
  py: "es",
  uy: "es",
  cu: "es",
  do: "es",
  gt: "es",
  hn: "es",
  sv: "es",
  ni: "es",
  cr: "es",
  pa: "es",
  bz: "es",
  // French-speaking countries
  fr: "fr",
  be: "fr", // Primary French
  ca: "fr",
  sn: "fr",
  ci: "fr",
  cd: "fr",
  cg: "fr",
  ga: "fr",
  cm: "fr",
  gq: "es",
  bf: "fr",
  bj: "fr",
  dj: "fr",
  gn: "fr",
  ml: "fr",
  ne: "fr",
  tg: "fr",
  cf: "fr",
  tc: "en",
  re: "fr",
  mq: "fr",
  gp: "fr",
  bl: "fr",
  mf: "fr",
  ht: "fr",
  // German-speaking countries (with German priority for multilingual countries)
  de: "de",
  at: "de",
  ch: "de", // Switzerland primary language is German (63% of population)
  li: "de",
  lu: "de", // Luxembourg primary language is German (63% of population)
  // Italian-speaking countries
  it: "it",
  // Portuguese-speaking countries
  br: "pt",
  pt: "pt",
  ao: "pt",
  mz: "pt",
  tl: "pt",
  cv: "pt",
  gw: "pt",
  st: "pt",
  // Russian-speaking countries
  ru: "ru",
  // Japanese
  jp: "ja",
  // Chinese
  cn: "zh",
  tw: "zh-TW",
  mo: "zh",
  // Korean
  kr: "ko",
  kp: "ko",
  // Arabic-speaking countries (all inclusive)
  sa: "ar",
  ae: "ar",
  eg: "ar",
  ma: "ar", // Morocco
  dz: "ar", // Algeria
  tn: "ar", // Tunisia
  ly: "ar", // Libya
  sd: "ar", // Sudan
  jo: "ar", // Jordan
  sy: "ar", // Syria
  iq: "ar", // Iraq
  kw: "ar", // Kuwait
  qa: "ar", // Qatar
  bh: "ar", // Bahrain
  om: "ar", // Oman
  ye: "ar", // Yemen
  ps: "ar", // Palestine
  lb: "el", // Cyprus primary language is Greek
  mr: "ar", // Mauritania
  eh: "ar", // Western Sahara
  km: "ar", // Comoros
  // Turkish
  tr: "tr",
  cy: "tr", // Turkey primary language for Cyprus
  // Polish
  pl: "pl",
  // Dutch
  nl: "nl",
  // Swedish
  se: "sv",
  // Danish
  dk: "da",
  // Norwegian
  no: "no",
  // Finnish
  fi: "fi",
  // Czech
  cz: "cs",
  // Hungarian
  hu: "hu",
  // Romanian
  ro: "ro",
  // Greek
  gr: "el",
  // Hebrew
  il: "he",
  // Thai
  th: "th",
  // Vietnamese
  vn: "vi",
  // Indonesian
  id: "id",
  // Tagalog/Philippines
  ph: "tl",
  // Hindi/India
  in: "hi",
  // Bengali/Bangladesh
  bd: "bn",
  // Urdu/Pakistan
  pk: "ur",
  // Persian/Iran
  ir: "fa",
  // Burmese/Myanmar
  mm: "my",
  // Khmer/Cambodia
  kh: "km",
  // Lao
  la: "lo",
  // Mongolian
  mn: "mn",
  // Georgian
  ge: "ka",
  // Armenian
  am: "hy",
  // Bulgarian
  bg: "bg",
  // Serbian
  rs: "sr",
  // Croatian
  hr: "hr",
  // Slovenian
  si: "sl",
  // Slovak
  sk: "sk",
  // Ukrainian
  ua: "uk",
  // Belarusian
  by: "be",
  // Uzbek
  uz: "uz",
  // Kazakh
  kz: "kk",
  // Icelandic
  is: "is",
  // Afrikaans/South Africa
  za: "zu",
  // Swahili/Kenya
  ke: "sw",
  // Xhosa/South Africa
  xh: "xh",
  // Zulu/South Africa
  zu: "zu",
  // Sotho/South Africa
  st: "st",
  // Malay/Malaysia
  my: "ms",
  // Default fallback
  default: "en",
}
