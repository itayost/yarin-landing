/* ═══════════════════════ SITE CONTENT ═══════════════════════
 * Single source for owner-supplied copy ("דוגמאות ותכנים מילוליים.pdf",
 * 2026-10) and owner-confirmed figures. Do not add claims that are not here.
 */

import {
  CalendarClock,
  GraduationCap,
  Presentation,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════ IMAGES ═══════════════════════ */

export const IMAGES = {
  heroTrades: "/images/hero-trades.webp",
  portrait: "/images/yarin-portrait.webp",
  logoMark: "/images/logo-mark.png",
  logoFull: "/images/logo-full.png",
} as const;

/* ═══════════════════════ TRUST BADGES (hero) ═══════════════════════ */

export type TrustBadge = { icon: LucideIcon; value: string; label: string };

export const TRUST_BADGES: TrustBadge[] = [
  { icon: CalendarClock, value: "7+", label: "שנים של ניסיון" },
  {
    icon: GraduationCap,
    value: "B.Sc",
    label: "בהנדסת תוכנה + התמחות לרישיון ניהול תיקים",
  },
  {
    icon: Presentation,
    value: "מרצה",
    label: "ללימוד השקעות במניות, קריפטו וחוזים עתידיים",
  },
];

/* ═══════════════════════ DISCLAIMERS ═══════════════════════ */

export const DISCLAIMERS = {
  /* Next to any trade example, screenshot or result */
  examples:
    "הדוגמאות מוצגות לצורכי לימוד והמחשה בלבד. אין לראות בהן ייעוץ השקעות, המלצה לפעולה או הבטחה לתוצאה.",
  /* Site-wide, in the footer */
  site: "אין לראות במידע באתר ייעוץ פיננסי, ייעוץ השקעות או הבטחה לתשואה. מסחר בשוק ההון ובחוזים עתידיים כרוך בסיכון ועלול לגרום להפסדים. הנתונים מוצגים לצורכי המחשה בלבד. ביצועי עבר אינם מבטיחים תוצאות עתידיות.",
} as const;

/* ═══════════════════════ ABOUT ═══════════════════════ */

export const ABOUT = {
  title: "מי אני?",
  name: "ירין",
  role: "מנטור למסחר והשקעות",
  /* Hook built from his three roles in the paragraphs below; the pen marks
   * HOOK_PEN_WORD. */
  hook: ["מהנדס,", "סוחר", "ומרצה."],
};

export const HOOK_PEN_WORD = "סוחר";

/* Owner paragraphs, verbatim, split into segments so key phrases can be
 * emphasised. Joining a beat's segments reproduces the PDF sentence. */
export type AboutBeat = {
  /* Big word beside the paragraph, with one or more lines under it */
  figure: { value: string; lines: string[]; isCountUp?: boolean };
  title: string;
  segments: { text: string; isStrong?: boolean }[];
};

export const ABOUT_BEATS: AboutBeat[] = [
  {
    figure: { value: "7+", lines: ["שנות ניסיון"] },
    title: "ההכשרה והניסיון",
    segments: [
      { text: "בעל תואר בהנדסת תוכנה (B.Sc), " },
      { text: "סוחר יומי בחוזים עתידיים (נוסטרו)", isStrong: true },
      { text: ", משקיע במניות וקריפטו עם מעל 7 שנות ניסיון." },
    ],
  },
  {
    figure: { value: "היום", lines: [] },
    title: "התפקידים שלי",
    segments: [
      { text: "עובד בבית ההשקעות של " },
      { text: "הפניקס", isStrong: true },
      {
        text: ", בתהליכי התמחות לקבלת רישיון ניהול תיקי השקעות ומרצה להשקעות באחת המכללות המובילות בארץ.",
      },
    ],
  },
  {
    figure: { value: "200+", lines: ["תלמידים"], isCountUp: true },
    title: "התלמידים",
    segments: [
      { text: "ליוויתי " },
      { text: "מעל 200 תלמידים", isStrong: true },
      {
        text: " לדריסת רגל בעולם ההשקעות, פתיחת תיקים ומעבר למסחר שיטתי ורווחי.",
      },
    ],
  },
];

/* ═══════════════════════ APPROACH ═══════════════════════ */

export const APPROACH = {
  belief:
    "אני מאמין בעבודה מדויקת, הכנה מוקדמת, משמעת וניהול סיכונים, בלי קיצורי דרך והבטחות שווא.",
  noCourses: "ללא קורסים מוקלטים; הלמידה היא בליווי אישי בלבד (1 על 1) מול המסכים.",
  noMass: "בלי מכללות המוניות ובלי מסחור.",
  promise:
    "אני מלווה אותך אישית ומעניק לך גב מקצועי מלא, צעד אחר צעד, עד שאתה שולט בשוק, פועל בביטחון ויודע לייצר ולהגדיל רווחים בעצמך.",
};

/* Display split of APPROACH for the "two paths" ledger: each belief stands
 * opposite the habit it rules out. Every phrase is the owner's own copy;
 * only the two column labels are new wording. */
export const APPROACH_DISPLAY = {
  lead: "אני מאמין",
  mineLabel: "ככה אני עובד",
  notLabel: "ככה לא",
  pairs: [
    { mine: "ליווי אישי בלבד (1 על 1) מול המסכים", not: "קורסים מוקלטים" },
    { mine: "הכנה מוקדמת", not: "קיצורי דרך" },
    { mine: "ניהול סיכונים", not: "הבטחות שווא" },
    { mine: "עבודה מדויקת ומשמעת", not: "מכללות המוניות ומסחור" },
  ],
};

/* ═══════════════════════ FIT ═══════════════════════ */

export const FIT = {
  title: "זה בשבילך אם יש לך",
  items: [
    "מוטיבציה גבוהה ומחויבות לדרך",
    "נכונות ליישם בפועל מול הגרפים",
    "רצון לעבוד חכם, שיטתי ומדויק",
    "שאיפה ברורה לייצר הון ולהצמיח אותו",
  ],
};

/* ═══════════════════════ FAQ ═══════════════════════ */

export const FAQ_ITEMS = [
  {
    q: "למי הליווי מתאים?",
    a: "לכל מי שרוצה דריסת רגל מקצועית בהשקעות ומסחר, ממתחילים מאפס ועד סוחרים שרוצים סדר, שיטה ומשמעת.",
  },
  {
    q: "האם יש הבטחה לרווחים?",
    a: "חד-משמעית לא; שוק ההון הוא מקצוע שנשען על ניהול סיכונים ומשמעת, ולא על \"שיטות קסם\" והתעשרות מהירה.",
  },
  {
    q: "איך הליווי מתבצע בפועל?",
    a: "במפגשים אישיים של 1 על 1 מול המסכים והגרפים בזמן אמת, בקצב מותאם אישית וללא קורסים מוקלטים מראש.",
  },
  {
    q: "האם השיעורים מוקלטים?",
    a: "כן, כל מפגש אישי מוקלט במלואו ונשלח אליכם כדי שתוכלו לחזור על החומר בכל שלב.",
  },
  {
    q: "מהי רמת הזמינות שלך מעבר למפגשים?",
    a: "יש לכם זמינות מלאה וישירה שלי בוואטסאפ לניתוח גרפים, שאלות ודיוק עסקאות לאורך כל תקופת הליווי.",
  },
  {
    q: "האם נדרש הון ראשוני גבוה כדי להתחיל?",
    a: "לא, מתחילים בלמידה ותרגול מבוקר ללא סיכון כספי, ורק לאחר בניית הידע והמשמעת פותחים תיק בהתאם ליכולתכם.",
  },
];

/* ═══════════════════════ CONTACT ═══════════════════════ */

export const CONTACT_SECTION = {
  title: "מוכנים לעשות את הצעד הראשון לשוק ההון?",
  paragraphs: [
    "מכיוון שהליווי הוא אישי לחלוטין ודורש מחויבות מלאה, חשוב לוודא שיש בינינו התאמה מקצועית וחיבור למטרות שלכם.",
    "השאירו פרטים ונקיים שיחת אפיון קצרה. נבחן את נקודת הפתיחה שלכם, נציג את מסגרת העבודה, ובגובה העיניים, ללא כל לחץ שיווקי.",
  ],
  goalQuestion: "מה הדבר העיקרי שהיית רוצה לקבל ממני במהלך הליווי?",
  goalPlaceholder: "בחרו את התשובה המתאימה",
};

/* Owner-specified answers; the API accepts only these values. */
export const GOAL_OPTIONS = [
  "ללמוד להשקיע",
  "ללמוד מסחר יומי",
  "לתת לכסף לעבוד בשבילי",
] as const;

/* ═══════════════════════ TESTIMONIALS ═══════════════════════
 * Owner-supplied screenshots only. Public 5-star reviews keep the reviewer's
 * name; student WhatsApp messages are anonymous (no names, emoji removed,
 * greetings trimmed, wording otherwise kept). Never invent testimonials.
 */

export type Testimonial = {
  source: "review" | "whatsapp";
  name?: string;
  context: string;
  quote: string;
  stars?: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    source: "review",
    name: "חנן אביאל",
    context: "סטודנט, לומד אצל ירין באופן פרונטלי",
    quote:
      "אני לומד במכללת Wise עם המרצה התותח ירין באופן פרונטלי. אני מאד מרוצה מירין, הוא מעביר את החומר בצורה מאד מעניינת.",
    stars: 5,
  },
  {
    source: "whatsapp",
    context: "תלמיד · הודעה בוואטסאפ",
    quote:
      "רציתי לשתף אותך שאחרי הרבה זמן הצלחתי לעבור מבחן!! התיק הראשון איתך עבדתי עליו חודשיים ושרפתי אותו ביום אחד. והתיק הזה, עם ניהול סיכונים טוב מאוד, הצלחתי לעבור אחרי חודשיים וקצת.",
  },
  {
    source: "review",
    name: "Asher Malja",
    context: "ביקורת 5 כוכבים",
    quote:
      "מכללה מעולה, יחס אישי מצוין. מי שרוצה ללמוד ולדעת שיש תמיד יחס אישי מאחוריו, שילמד אצלם. וממליץ בחום על ירין התותח!",
    stars: 5,
  },
  {
    source: "whatsapp",
    context: "תלמיד · הודעה בוואטסאפ",
    quote:
      "איזה חידודים הבאת לי היום. זה דברים קטנים עם משמעות מאוד גדולה, במיוחד עם ה-PSP עם הנכס החזק חלש ומה שמצופה. כל שיעור ב״ה יש התקדמות ואני מבסוט אח. תודה על הזמן שלך.",
  },
  {
    source: "whatsapp",
    context: "תלמיד · הודעה בוואטסאפ",
    quote:
      "היה ממש כיף בשיעור אח, ממש תענוג ומוסבר ברמה מאוד גבוהה. התקנתי את האינדיקטור, עובד פיקס ועכשיו אני מטפל בלייב.",
  },
  {
    source: "whatsapp",
    context: "תלמיד · הודעה בוואטסאפ",
    quote: "שעור אליפות ירין.",
  },
];

/* ═══════════════════════ LINKS ═══════════════════════ */

export const AFFILIATE_LINKS = [
  { label: "Interactive Brokers", href: "https://lp3.inter-il.com/ab/742" },
  { label: "TradingView", href: "https://www.tradingview.com/?aff_id=169916" },
];
